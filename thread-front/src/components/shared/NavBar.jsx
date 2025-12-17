import "./NavBar.css";
import { useNavigate } from "react-router-dom";

export default function navBar() {
  const navigate = useNavigate();

  const goToNewPost = () => {
    navigate(`/NewPost`);
  };

  const goToProfile = () => {
    navigate(`/profile`);
  };

  const goToFeed = () => {
    navigate(`/Feed`);
  };

  return (
    <footer className="navBar">
      <button className="navBar-button-plus" onClick={goToNewPost}>
        <img src="../src/assets/Logo/logo-newpost.svg" />
      </button>
      <button className="navBar-button-profile" onClick={goToProfile}>
        <img src="../src/assets/Logo/logo-profile.svg" />
      </button>
      <button className="navBar-button-message" onClick={goToFeed}>
        <img src="../src/assets/Logo/logo-feed.svg" />
      </button>
    </footer>
  );
}
