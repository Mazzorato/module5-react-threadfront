import { useState, useEffect } from "react"
import "./Feed.css";
import Title from "../shared/Title.jsx";
import PostCard from "../shared/PostCard.jsx";
import NavBar from "../shared/NavBar.jsx";

export function Feed() {

  const [post, setPost] = useState([]);
  function fetchPost() {
    try {
      fetch("http://localhost:3000/posts/",{
        credentials: 'include'
      })
        .then((response) => response.json())
        .then((postData) => setPost(postData))
        .catch((error) => console.error("Error fetching post:", error));
    } catch (error) {
      console.error("Unexpected error:", error);
    }

  }
  useEffect(() => {
    fetchPost();
  }, []);

  const postDivs = post.map((post) => (

    <PostCard 
      key={post.id}
      id={post.id}
      author={post.author}
      content={post.content}
      date={post.date}
    />
  ));


  return (
    <div className="feedPage">
      <Title title={"Feed"} />

      <div className="feedContainer">
        {postDivs}
      </div>
      <NavBar />
    </div>
  );
}
