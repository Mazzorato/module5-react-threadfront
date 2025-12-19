import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../auth/authContext.jsx";
import "./profile.css";
import Title from "../shared/Title.jsx";
import PostCard from "../shared/PostCard.jsx";
import NavBar from "../shared/NavBar.jsx";
import { NotifContext } from "../../utils/NotifContext";

import logoSetting from "../../assets/logo-setting.svg";

export function Profil() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addNotif } = useContext(NotifContext);

  const [firstPost, setFirstPost] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`http://localhost:3000/posts/me`, {
        credentials: "include",
      });
      let posts = await response.json();
      console.log(posts)
      if (posts.length > 0) {
        posts = posts.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setFirstPost(posts[0]);
        setPosts(posts);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      addNotif("Erreur lors du chargement des posts", "error");
    }
  };

  const goToSettings = () => {
    navigate("/settings");
  };

  const goToNewPost = () => {
    navigate("/newpost");
  };

  return (
    <div className="ProfilePage">
      <Title title={"Profile"} />
      <div className="profilContainer">
        <div className="fakeHeader">
          <h2>{user?.username}</h2>
          <img
            className="logoSetting"
            src={logoSetting}
            alt=""
            onClick={goToSettings}
          />
        </div>
        {posts.length > 0 ? (
          <PostCard
            key={firstPost.id}
            id={firstPost.id}
            author={firstPost.user.username}
            content={firstPost.content}
            date={new Date(firstPost.createdAt)}
            isOwner={firstPost.isOwner}
            reloadPosts={fetchPosts}
          />
        ) : null}
        <p className="postNumber">
          {posts.length} <i className="fa-brands fa-facebook-messenger"></i>
        </p>
        {posts.length > 0 ? (
          posts.map((post) => {
            return (
              <PostCard
                key={post.id}
                id={post.id}
                author={post.user.username}
                content={post.content}
                date={new Date(post.createdAt)}
                isOwner={post.isOwner}
                reloadPosts={fetchPosts}
              />
            );
          })
        ) : (
          <button className="btnEmptyProfil" onClick={goToNewPost}>
            <div className="addPostIfNull">
              <img src="../../src/assets/Logo/logo-newpost.svg" />{" "}
              <p> Ajouter un post </p>
            </div>
          </button>
        )}
      </div>
      <NavBar />
    </div>
  );
}
