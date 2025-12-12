
import "./Post.css";
import Title from "../shared/Title.jsx";
import PostCard from "../shared/PostCard.jsx";
import CommentCard from "../shared/CommentCard.jsx";
import NavBar from "../shared/NavBar.jsx";
import { useEffect, useState } from "react";


export function Post() {
    /*
    const [post, setPost] = useState([]);
    function fetchPost() {
        try {
        fetch("http://localhost:3000/posts/1")
        .then((response) => response.json())
        .then((postData) => setPost(postData))
        .catch((error) => console.error("Error fetching post:", error));
        } catch (error) {
            console.error("Unexpected error:", error);
        }
        
    }

    useEffect(() => {
         fetchPost();
    }, []);

   
       
       a placer dans le return quand aura recupere les donnees dynamiquement
       <PostCard 
            key={post.id}
            author={post.author} 
            content={post.content} 
            date={post.date} 
        /> 
        const commentdivs = post.comments.map((comment) =>{
            return
             <CommentCard 
                key={comment.id}
                author={comment.author} 
                content={comment.content} 
                date={comment.date} 
            />

        } );*/

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