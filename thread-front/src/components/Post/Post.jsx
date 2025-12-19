import "./Post.css";
import Title from "../shared/Title.jsx";
import PostCard from "../shared/PostCard.jsx";
import CommentCard from "../shared/CommentCard.jsx";
import NavBar from "../shared/NavBar.jsx";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { NotifContext } from "../../utils/NotifContext";

export function Post() {
  const { id } = useParams();
  const [post, setPost] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { addNotif } = useContext(NotifContext);

  function fetchPost() {
    try {
      fetch("http://localhost:3000/posts/" + id, { credentials: 'include' })
        .then((response) => response.json())
        .then((postData) => setPost(postData))
        .catch((error) => console.error("Error fetching post:", error));
    } catch (error) {
      console.error("Unexpected error:", error);
      addNotif("Erreur lors du chargement du post", "error");
    }
  }

  useEffect(() => {
    fetchPost();
  }, [id]);

  if (!post.comments) {
    return <div>Loading...</div>;
  }

  const commentdivs = post.comments.map((comment) => {
    return (
      <CommentCard
        key={comment.id}
        id={comment.id}
        author={comment.user.username}
        content={comment.content}
        date={new Date(comment.createdAt)}
        isOwner={comment.isOwner}
        reloadPost={fetchPost}
      />)
  });
  
  function handleInputChange(e){
    setNewComment(e.target.value);
  };

  async function onSubmit(e) {
    e.preventDefault();

    if (!newComment.trim()) return;

    try {
      const response = await fetch(`http://localhost:3000/posts/${id}/comments`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newComment })
      });

      if (response.ok) {
        setNewComment("");
        addNotif("Commentaire envoyé avec succès !", "success");
        fetchPost();
      }
    } catch (error) {
      console.error("Error al enviar comentario:", error);
      addNotif("Erreur lors de l'envoi du commentaire", "error");
    }
  };

  return (
    <div className="PostPage">
      <Title title={"Post"} />
      <div className="postContainer">
        <PostCard
          key={post.id}
          author={post.author}
          content={post.content}
          date={new Date(post.createdAt)}
          isOpen='true'
        />

        <p className="commentNumber">
          {post.comments.length} <i className="fa-solid fa-message"></i>
        </p>

        <form className="commentForm" onSubmit={onSubmit}>
          <input
            className="comment-container"
            type="textarea"
            name="comment"
            placeholder="Tapez votre commentaire ici ..."
            value={newComment}
            onChange={handleInputChange}
            required
          />
        <button type="submit" onClick={onSubmit} style={{ display: 'none' }}></button>{/*button caché pour permettre la soumission avec "Enter"*/}
        </form>

        {commentdivs}

      </div>
      <NavBar />
    </div>
  );
}
