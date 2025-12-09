// import { useState } from 'react'
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Feed } from "./components/Feed/Feed.jsx";
import { Post } from "./components/Post/Post.jsx";
import { NewPost } from "./components/NewPost/NewPost.jsx";
import { NewComment } from "./components/Comment/NewComment.jsx";

import HomePage from "./components/HomePage.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Feed" element={<Feed />} />
          <Route path="/Post" element={<Post />} />
          <Route path="/NewPost" element={<NewPost />} />
          <Route path="/NewComment" element={<NewComment />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
