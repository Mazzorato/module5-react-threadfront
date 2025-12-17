import "./NavBar.css";
import { useNavigate } from "react-router-dom";
export default function navBar({ username }) {
  
    

  return (
    <footer className="navBar">
      <button
        className="navBar-button-plus"
        onClick={() => useNavigate("/NewPost/" + username)}
      >
        <img src="../src/assets/Logo/logo-newpost.svg" />
      </button>
      <button
        className="navBar-button-profile"
        onClick={() => useNavigate("/profile/:username")}
      >
        <img src="../src/assets/Logo/logo-profile.svg" />
      </button>
      <button
        className="navBar-button-message"
        onClick={() => useNavigate("/Feed/:username")}
      >
        <img src="../src/assets/Logo/logo-feed.svg" />
      </button>
    </footer>
  );
}
