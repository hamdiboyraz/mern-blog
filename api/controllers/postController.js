const fs = require('fs');
const jwt = require('jsonwebtoken');

const Post = require('../models/postModel');

exports.getPosts = async (req, res) => {
  const posts = await Post.find()
    .populate('author', ['username'])
    .sort('-createdAt')
    .limit(20);
  res.json(posts);
};

exports.getPostById = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id).populate('author', ['username']);
  res.json(post);
};

exports.createPost = async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split('.'); // ['image', 'png']
  const extension = parts[parts.length - 1]; // 'png'
  const newPath = 'uploads/' + parts[0] + '.' + extension;
  fs.renameSync(path, newPath);

  const token = req.cookies.token; // const { token } = req.cookies;
  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, decodedToken) => {
    if (err) throw err;
    const { title, summary, content } = req.body;
    const post = await Post.create({
      title,
      summary,
      content,
      coverImage: newPath,
      author: decodedToken.id,
    });
    res.json(post);
  });
};

exports.updatePost = async (req, res) => {
  let newPath = '';
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split('.'); // ['image', 'png']
    const extension = parts[parts.length - 1]; // 'png'
    newPath = 'uploads/' + parts[0] + '.' + extension;
    fs.renameSync(path, newPath);
  }

  const { token } = req.cookies;
  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, decodedToken) => {
    if (err) throw err;
    const { id, title, summary, content } = req.body;
    const post = await Post.findById(req.body.id);
    const isAuthor =
      JSON.stringify(post.author) === JSON.stringify(decodedToken.id);
    if (!isAuthor) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    await Post.update({
      title,
      summary,
      content,
      coverImage: newPath ? newPath : post.coverImage,
      // author: decodedToken.id,
    });
    res.json(post);
  });
};
