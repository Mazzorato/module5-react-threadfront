import "./NewPost.css";

export function NewPost() {
  return (
    <div>
      <h1> New Post</h1>
      <form method="post">
        <div className="post-preview">
          <input
            type="textarea"
            name="post"
            placeholder="Tapez votre post ici ..."
            required
          />
          <p>15:25 13 août 25</p>
        </div>
        <button type="submit">
          Poster !{" "}
        </button>
      </form>
    </div>
  );
}
