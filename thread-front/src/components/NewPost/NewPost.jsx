import "./NewPost.css";
import Title from "../shared/Title.jsx";
import NavBar from "../shared/NavBar.jsx";

export function NewPost() {
  
  return (
    <div className="newPostPage">
      <Title title={"New Post"} />

      <form className="new-post-container">
        <div className="newPostCard">
          <input
            className="new-post-input"
            name="content"
            type="textarea"
            placeholder="Tapez votre post ici ..."
          />
          <p className="newPostDate">15:25 - 13 août 25</p>
        </div>
        <button className="btnNewPost" type="submit">
          Poster !
        </button>
      </form>
      <NavBar />
    </div>
  );
}
