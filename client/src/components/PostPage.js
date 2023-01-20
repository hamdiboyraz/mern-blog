import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { formatISO9075 } from 'date-fns';

const PostPage = () => {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data));
  }, []);

  if (!post) return null;

  return (
    <div className="post-page">
      <h1>{post.title}</h1>
      <time>{formatISO9075(new Date(post.createdAt))}</time>
      <div className="author">by {post.author.username}</div>
      <div className="image">
        <img src={`http://localhost:4000/${post.coverImage}`} alt="" />
      </div>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
};

export default PostPage;
