import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Header = () => {
  const [username, setUsername] = useState('');
  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then((res) => {
      res.json().then((data) => {
        setUsername(data.username);
      });
    });
  }, []);

  const logout = () => {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
    }).then((res) => {
      setUsername('');
    });
  };

  return (
    <header>
      <Link to="/" className="logo">
        My Blog
      </Link>
      <nav>
        {username && (
          <>
            <Link to="/create">New Post</Link>
            <a onClick={logout}>Logout</a>
          </>
        )}

        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
