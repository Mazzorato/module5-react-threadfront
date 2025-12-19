import "./NewPost.css";
import Title from "../shared/Title.jsx";
import NavBar from "../shared/NavBar.jsx";
import {  useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/dateFormat.jsx";
import { useContext } from "react";
import { NotifContext } from "../../utils/NotifContext";


export function NewPost() {

  const navigate = useNavigate();
  const { username } = useParams();
  const [newPost, setNewPost] = useState("");
  const { addNotif } = useContext(NotifContext);

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
          {
            title: username,
            content: newPost
          })
      });

      if (response.ok) {
        setNewPost("");
        console.log("Post envoyé avec succès !");
        addNotif("Post envoyé avec succès !", "success");
        navigate("/feed");

      }
    } catch (error) {
      console.error("Error al enviar comentario:", error);
      addNotif("Erreur lors de l'envoi du post", "error");
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
          <p className="newPostDate">{formatDate(new Date())}</p>
        </div>
        <button className="btnNewPost" type="submit" onClick={onSubmit} style={{ display: 'none' }}>
          Poster !
        </button>
      </form>
      <NavBar username={username}/>
    </div>
  );
}
