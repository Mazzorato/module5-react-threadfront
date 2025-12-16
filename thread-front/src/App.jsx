// import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Register } from "./components/auth/register.jsx";
import { Login } from "./components/auth/login.jsx";
import { Feed } from "./components/Feed/Feed.jsx";
import { Post } from "./components/Post/Post.jsx";
import { NewPost } from "./components/NewPost/NewPost.jsx";
import { NewComment } from "./components/Comment/NewComment.jsx";
import { Profil } from "./components/profile/profile.jsx";
import { Settings } from "./components/settings/settings.jsx";

import HomePage from "./components/HomePage.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Feed" element={<Feed />} />
          <Route path="/Post" element={<Post />} />
          <Route path="/NewPost" element={<NewPost />} />
          <Route path="/NewComment" element={<NewComment />} />
          <Route path="/profile" element={<Profil />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
