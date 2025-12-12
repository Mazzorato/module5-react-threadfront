import "./NewComment.css";

export function NewComment() {
  return (
    <div>
      <h1>New Comment</h1>
      <div>
        <form className="commentForm" method="post">
          <input
            className="comment-container"
            type="textarea"
            name="comment"
            placeholder="Tapez votre commentaire ici ..."
            required
          />
          <button className="btnComm" type="submit">
            Commenter !
          </button>
        </form>
      </div>
    </div>
  );
}
