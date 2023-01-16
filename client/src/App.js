import './App.css';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Post from './components/Post';
import Layout from './components/Layout';
import IndexPage from './components/IndexPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import { UserContextProvider } from './components/UserContext';
import CreatePost from './components/CreatePost';

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/create" element={<CreatePost />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
