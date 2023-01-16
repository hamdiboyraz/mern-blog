import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { UserContext } from './UserContext';

const Header = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then((res) => {
      res.json().then(() => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  const logout = () => {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
    }).then((res) => {
      setUserInfo('');
    });
  };

  const username = userInfo?.username; // Optional Chaining -> instead of throwing an error, it will return undefined

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
