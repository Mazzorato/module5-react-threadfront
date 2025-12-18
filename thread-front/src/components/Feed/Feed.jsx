import { useState, useEffect } from "react";
import "./Feed.css";
import Title from "../shared/Title.jsx";
import PostCard from "../shared/PostCard.jsx";
import NavBar from "../shared/NavBar.jsx";
import InfiniteScroll from "react-infinite-scroll-component";

export function Feed() {
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const [page, setPage] = useState(1);

  function fetchPosts() {
    try {
      fetch("http://localhost:3000/posts?page=${page}&limit=10", { credentials: "include" })
        .then((response) => response.json())
        .then((posts) => setPosts((prev) => [...prev, ...posts]))
        .catch((error) => console.error("Error fetching post:", error));
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    }
    

  useEffect(() => {
    setHasMore(posts.hasMore)
    fetchPosts();
  }, [page]);

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

      <InfiniteScroll
        dataLength={posts.length}
        next={() => setPage(prev => prev + 1)}
        hasMore={hasMore}
        loader={<h4>Chargement...</h4>}
        endMessage={<p className="p-endmessage">Aucun post pour le moment</p>}
        height={700}
      >
      <div className="feedContainer">{postDivs}</div>
      </InfiniteScroll>
      <NavBar />
    </div>
  );
}













