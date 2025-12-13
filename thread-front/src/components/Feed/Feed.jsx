// import { useState } from "react"

import "./Feed.css";
import Title from "../shared/Title.jsx";
import PostCard from "../shared/PostCard.jsx";
import NavBar from "../shared/NavBar.jsx";

export function Feed() {
  return (
    <div className="feedPage">
      <Title title={"Feed"} />

      <div className="feedContainer">
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
