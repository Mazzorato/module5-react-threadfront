import "./App.css";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Register } from "./components/auth/register.jsx";
import { Login } from "./components/auth/login.jsx";
import { Feed } from "./components/Feed/Feed.jsx";
import { Post } from "./components/Post/Post.jsx";
import { NewPost } from "./components/NewPost/NewPost.jsx";
import { NewComment } from "./components/Comment/NewComment.jsx";
import { Profil } from "./components/profile/profile.jsx";
import HomePage from "./components/HomePage.jsx";

function App() {
  // Route protection example
  /*const PrivateRoutes = () => {
    let auth = { 'token': true }
    return (
      auth.token ? <Outlet /> : <Navigate to='/login' />
    )
  }*/


  return (
    <>
      <BrowserRouter>
        <Routes>
          {/*<Route element={<PrivateRoutes />}>*/}
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/Feed/:username" element={<Feed />} />
            <Route path="/Post/:id" element={<Post />} />
            <Route path="/NewPost/:username" element={<NewPost />} />
            <Route path="/NewComment" element={<NewComment />} />
            <Route path="/profile" element={<Profil />} />
          {/*</Route>*/}
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
