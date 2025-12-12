import "./NewComment.css";

export function NewComment() {
  return (
    <div>
      <h1>New Comment</h1>
      <div>
        <form method="post">
          <div className="comment-preview">
            <input className="comment-container"
              type="textarea"
              name="comment"
              placeholder="Tapez votre texte ici"
              required
            />
          </div>
          <button type="submit">Commenter ! </button>
        </form>
      </div>
    </div>
  );
}
