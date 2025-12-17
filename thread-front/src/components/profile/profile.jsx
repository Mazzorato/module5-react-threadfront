import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./profile.css";
import Title from "../shared/Title.jsx";
import PostCard from "../shared/PostCard.jsx";
import NavBar from "../shared/NavBar.jsx";
import { useParams } from "react-router-dom";

import logoSetting from "../../assets/logo-setting.svg";

export function Profil() {
  const navigate = useNavigate();
  
  const userId = 3;
  const {userName} = useParams();

  const [firstPost, setFirstPost] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/users/${userId}/posts`
      );
      let posts = await response.json();

      if (posts.length > 0) {
        posts = posts.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setFirstPost(posts[0]);
        setPosts(posts);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const goToSettings = () => {
    navigate("/settings");
  };

  const goToNewPost = () => {
    navigate("/NewPost");
  };

  return (
    <div className="ProfilePage">
      <Title title={"Profile"} />
      <div className="profilContainer">
        <div className="fakeHeader">
          <h2>{userName}</h2>
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
            author={firstPost.title}
            content={firstPost.content}
            date={firstPost.createdAt}
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
                author={post.title}
                content={post.content}
                date={post.createdAt}
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
