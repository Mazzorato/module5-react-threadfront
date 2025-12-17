import "./NewPost.css";
import Title from "../shared/Title.jsx";
import NavBar from "../shared/NavBar.jsx";
import {  useState } from "react";

import { useNavigate } from "react-router-dom";

export function NewPost() {

  const navigate = useNavigate();

  const [newPost, setNewPost] = useState("");

  // useEffect(() => {
  //   onSubmit();
  // }, [setNewPost]);

  function handleInputChange(e){
    setNewPost(e.target.value);
  };

  async function onSubmit(e) {
    e.preventDefault();

    if (!newPost.trim()) return;

    try {
      const response = await fetch(`http://localhost:3000/posts/create`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          { title: null,
          content: newPost })
      });

      if (response.ok) {
        setNewPost("");
        console.log("Post envoyé avec succès !");
        navigate("/Feed");

      }
    } catch (error) {
      console.error("Error al enviar comentario:", error);
    }
  };


  return (
    <div className="newPostPage">
      <Title title={"New Post"} />

      <form className="new-post-container" onSubmit={onsubmit}>
        <div className="newPostCard">
          <input
            className="new-post-input"
            name="content"
            type="textarea"
            placeholder="Tapez votre post ici ..."
            value={newPost}
            onChange={handleInputChange}
          />
          <p className="newPostDate">15:25 - 13 août 25</p>
        </div>
        <button className="btnNewPost" type="submit" onClick={onSubmit} style={{ display: 'none' }}>
          Poster !
        </button>
      </form>
      <NavBar />
    </div>
  );
}
