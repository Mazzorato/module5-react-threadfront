import "./PostCard.css";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/dateFormat";

export default function PostCard({
  author,
  content,
  date,
  isOpen,
  id,
  isOwner,
  reloadPosts,
}) {
  const navigate = useNavigate();

  function handleClick() {
    if (!isOpen) {
      navigate(`/post/${id}`);
    }
  }

  function handleDelete() {
    if (window.confirm("Supprimer ce post ?")) {
      fetch(`http://localhost:3000/posts/${id}`, {
        method: "DELETE",
        credentials: "include",
      }).then((result) => {
        reloadPosts();
      });
    }
  }

  return (
    <div className="post-card" style={{ minHeight: `${isOpen ? "8rem" : ""}` }}>
      <div className="post-open" onClick={handleClick}>
        <h2 className="post-author">{author}</h2>
        <p className="post-content">{content}</p>
        <p className="post-date">{formatDate(new Date(date))}</p>
      </div>

      {isOwner ? (
        <img
          onClick={handleDelete}
          className="postrash"
          src="../../src/assets/trash-solid-full.svg"
        />
      ) : null}
    </div>
  );
}
