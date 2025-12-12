
import "./Post.css";
import Title from "../shared/Title.jsx";
import PostCard from "../shared/PostCard.jsx";
import CommentCard from "../shared/CommentCard.jsx";
import NavBar from "../shared/NavBar.jsx";


export function Post() {

    return( 

        <div>
            <Title title={"Post"} />
            <PostCard author={"@Ryu-du57"} 
            content={"Aujourd'hui je me suis promene sous la pluie."}
            date={"11:50 12 dec 25"}/>
            <CommentCard author={"@Sakura-chan"} 
            content={"Moi aussi j'aime la pluie !"}
            date={"12:00 12 dec 25"}/>
            <CommentCard author={"@Kenjiro"} 
            content={"La pluie c'est la vie."}
            date={"12:05 12 dec 25"}/>
            <CommentCard author={"@Sakura-chan"} 
            content={"Moi aussi j'aime la pluie !"}
            date={"12:00 12 dec 25"}/>
            <CommentCard author={"@Kenjiro"} 
            content={"La pluie c'est la vie."}
            date={"12:05 12 dec 25"}/>

            <NavBar />
            
        </div>
    )
}