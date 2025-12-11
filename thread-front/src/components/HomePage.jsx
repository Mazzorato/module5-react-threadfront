import Title from "./shared/Title";
import PostCard from "./shared/PostCard";
import CommentCard from "./shared/CommentCard";
import NavBar from "./shared/NavBar";


export default function HomePage(){

    return (
        <div>
            <PostCard 
                author={"@JaneDoe"} 
                content={"This is my first post!"}
                date={"2024-06-15"}/>
        </div>
    )
}