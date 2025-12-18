import "./CommentCard.css";
import { formatDate } from "../../utils/dateFormat";
import { useContext } from "react";
import { NotifContext } from "../../App.jsx";

export default function CommentCard({
  id,
  author,
  content,
  date,
  isOwner,
  reloadPost,
}) {
  const { addNotif } = useContext(NotifContext);
  function handleDelete() {
    if (window.confirm("Supprimer ce commentaire ?")) {
      fetch(`http://localhost:3000/comments/${id}`, {
        method: "DELETE",
        credentials: "include",
      }).then((result) => {
        addNotif("Commentaire supprimé", "success");
        reloadPost();
      });
    }
  }

  return (
    <div className="comment-card">
      <div className="comment-open">
        <h3 className="comment-author">{author}</h3>
        <p className="comment-content">{content} </p>
        <p className="comment-date">{formatDate(date)}</p>
      </div>

      {isOwner ? (
        <img
          onClick={handleDelete}
          className="commentrash"
          src="../../src/assets/trash-solid-full.svg"
        />
      ) : null}
    </div>
  );
}
