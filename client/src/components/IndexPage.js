import React from 'react';
import Post from './Post';
import { useEffect } from 'react';

const IndexPage = () => {
  const [posts, setPosts] = React.useState([]);
  useEffect(() => {
    fetch('http://localhost:4000/post')
      .then((res) => res.json())
      .then((data) => setPosts(data));
    // useEffect(() => {
    //   const fetchData = async () => {
    //     const res = await fetch('http://localhost:4000/post');
    //     const data = await res.json();
    //     setPosts(data);
    //   };

    //   fetchData();
  }, []);

  return <>{posts.length > 0 && posts.map((post) => <Post {...post} />)}</>;
};

export default IndexPage;
