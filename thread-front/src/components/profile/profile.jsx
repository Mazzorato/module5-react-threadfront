import "./profile.css";
import Title from "../shared/Title.jsx";
import PostCard from "../shared/PostCard.jsx";
import NavBar from "../shared/NavBar.jsx";

export function Profil() {
  return (
    <div className="ProfilePage">
      <Title title={"Profile"} />
      <div className="profilContainer">
      <h2>Pseudo</h2>
      <PostCard
        author={"@Ryu-du57"}
        content={"Aujourd'hui je me suis promene sous la pluie."}
        date={"11:50 12 dec 25"}
      />
      <p className="postNumber">
        XX <i className="fa-brands fa-facebook-messenger"></i>
      </p>
      <PostCard
        author={"@Ryu-du57"}
        content={"Aujourd'hui je me suis promene sous la pluie."}
        date={"11:50 12 dec 25"}
      />
      <PostCard
        author={"@Ryu-du57"}
        content={"Aujourd'hui je me suis promene sous la pluie."}
        date={"11:50 12 dec 25"}
      />
      <PostCard
        author={"@Ryu-du57"}
        content={"Aujourd'hui je me suis promene sous la pluie."}
        date={"11:50 12 dec 25"}
      />
      </div>
      <NavBar />
    </div>
  );
}
