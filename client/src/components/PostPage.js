import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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
      <div className="image">
        <img src={`http://localhost:4000/${post.coverImage}`} alt="" />
      </div>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
};

export default PostPage;
