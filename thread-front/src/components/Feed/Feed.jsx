import { useState, useEffect } from "react";
import "./Feed.css";
import Title from "../shared/Title.jsx";
import PostCard from "../shared/PostCard.jsx";
import NavBar from "../shared/NavBar.jsx";

export function Feed() {
  const [posts, setPosts] = useState([]);

  function fetchPosts() {
    try {
        fetch("http://localhost:3000/posts", { credentials: "include" })
          .then((response) => response.json())
          .then((postData) => setPosts(postData))
          .catch((error) => console.error("Error fetching post:", error));
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  const postDivs = posts?.map((post) => (
    <PostCard
      key={post.id}
      id={post.id}
      author={post.user.username}
      content={post.content}
      date={new Date(post.createdAt)}
      isOwner={post.isOwner}
      reloadPosts={fetchPosts}
    />
  ));

  return (
    <div className="feedPage">
      <Title title={"Feed"} />

      <div className="feedContainer">{postDivs}</div>
      <NavBar />
    </div>
  );
}
