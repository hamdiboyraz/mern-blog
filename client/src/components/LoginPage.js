import React from 'react';
import { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from './UserContext';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  const login = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
      credentials: 'include',
    });
    if (res.ok === true) {
      // response.json().then(userInfo => {
      //   setUserInfo(userInfo);
      //   setRedirect(true);
      // });
      // or we can use await
      const userInfo = await res.json();
      setUserInfo(userInfo);
      setRedirect(true);
    } else {
      alert('Login Failed');
    }
  };

  if (redirect === true) {
    return <Navigate to="/" />; // or we can use -> window.location.href = '/';
  }

  return (
    <form className="login" onSubmit={login}>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>Login</button>
    </form>
  );
};

export default LoginPage;
