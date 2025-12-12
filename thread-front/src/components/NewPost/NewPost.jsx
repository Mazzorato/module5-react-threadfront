import "./NewPost.css";

export function NewPost() {
  return (
    <div className="newPostPage">
      <h1> New Post</h1>

      <form className="post-container">
        <div className="postCard">
          <input
            class="post-input"
            name="content"
            type="textarea"
            placeholder="Tapez votre post ici ..."
          />
          <p className="date">15:25 - 13 août 25</p>
        </div>
        <button className="btnPost" type="submit">
          Poster !
        </button>
      </form>
    </div>
  );
}
