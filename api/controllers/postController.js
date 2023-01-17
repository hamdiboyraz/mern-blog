const fs = require('fs');

const Post = require('../models/postModel');

exports.createPost = async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split('.'); // ['image', 'png']
  const extension = parts[parts.length - 1]; // 'png'
  const newPath = 'uploads/' + parts[0] + '.' + extension;
  fs.renameSync(path, newPath);
  const { title, summary, content } = req.body;
  const post = await Post.create({
    title,
    summary,
    content,
    coverImage: newPath,
  });
  res.json(post);
};
