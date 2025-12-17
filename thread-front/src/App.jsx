import { createContext, useState } from "react";

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register } from "./components/auth/register.jsx";
import { Login } from "./components/auth/login.jsx";
import { Feed } from "./components/Feed/Feed.jsx";
import { Post } from "./components/Post/Post.jsx";
import { NewPost } from "./components/NewPost/NewPost.jsx";
import { Profil } from "./components/profile/profile.jsx";
import { Settings } from "./components/settings/settings.jsx";
import { Notif } from "./components/shared/notif.jsx";
import { AuthProvider } from "./components/auth/authContext.jsx";

export const NotifContext = createContext({});

function App() {
  const [notifications, setNotifications] = useState([]);

  function addNotif(message, type = "success") {
    const newNotif = {
      type: type,
      message: message,
    };
    setNotifications((prev) => [...prev, newNotif]);
  }

  return (
    <NotifContext.Provider value={{ addNotif }}>
      <BrowserRouter>
        <AuthProvider>
          <Notif
            notifications={notifications}
            setNotifications={setNotifications}
          />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/newpost" element={<NewPost />} />
            <Route path="/profile" element={<Profil />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Feed />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </NotifContext.Provider>
  );
}

export default App;
