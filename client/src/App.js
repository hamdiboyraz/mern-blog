import "./App.css";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Post from "./components/Post";
import Layout from "./components/Layout";
import IndexPage from "./components/IndexPage";
import LoginPage from "./components/LoginPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
}

export default App;
