import { createContext, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Register } from "./components/auth/register.jsx";
import { Login } from "./components/auth/login.jsx";
import { Feed } from "./components/Feed/Feed.jsx";
import { Post } from "./components/Post/Post.jsx";
import { NewPost } from "./components/NewPost/NewPost.jsx";
import { NewComment } from "./components/Comment/NewComment.jsx";
import { Profil } from "./components/profile/profile.jsx";
import { Notif } from "./components/shared/notif.jsx";

import HomePage from "./components/HomePage.jsx";

export const NotifContext = createContext({});

function App() {
  const [notifications, setNotifications] = useState([
    { type: "success", message: "Bienvenue sur Thread !" },
    { type: "error", message: "Bienvenue sur 2 !" },
  ]);

  function addNotif(message, type = "success") {
    const newNotif = {
      type: type,
      message: message,
    };
    setNotifications((prev) => [...prev, newNotif]);
  }

  return (
    <NotifContext.Provider value={{ addNotif }}>
    <>
      <BrowserRouter>
        <Notif
          notifications={notifications}
          setNotifications={setNotifications}
        />
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Feed" element={<Feed />} />
          <Route path="/Post" element={<Post />} />
          <Route path="/NewPost" element={<NewPost />} />
          <Route path="/NewComment" element={<NewComment />} />
          <Route path="/profile" element={<Profil />} />
        </Routes>
      </BrowserRouter>
    </>
    </NotifContext.Provider>
  );
}

export default App;
