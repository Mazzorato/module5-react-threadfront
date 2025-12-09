import Title from "./shared/Title";
import PostCard from "./shared/PostCard";
import CommentCard from "./shared/CommentCard";
import Footer from "./shared/Footer";



export default function HomePage(){

    return (
        <div>
            <Title title={"Thread title"}/>
            <PostCard author={"author du post(user)"} content={"content du post"}/>
            <CommentCard author={"user"} content={"commentaire d'user"}/>
            <Footer />
        </div>
    )
}