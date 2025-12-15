import "./Post.css";
import Title from "../shared/Title.jsx";
import PostCard from "../shared/PostCard.jsx";
import CommentCard from "../shared/CommentCard.jsx";
import NavBar from "../shared/NavBar.jsx";

export function Post() {
    
    const { id } = useParams();
    const [post, setPost] = useState([]);
    function fetchPost() {
        try {
        fetch("http://localhost:3000/posts/"+id,{credentials: 'include'//regarder les cookies
        })
        .then((response) => response.json())
        .then((postData) => setPost(postData))
        .catch((error) => console.error("Error fetching post:", error));
        } catch (error) {
            console.error("Unexpected error:", error);
        }
        
    }

    useEffect(() => {
         fetchPost();
    }, [id]);
  
    const commentdivs = post.comments.map((comment) =>{
            return(
            <CommentCard 
                key={comment.id}
                author={comment.author} 
                content={comment.content} 
                date={comment.date} 
            />)

        } );
  return (
    <div className="PostPage">
      <Title title={"Post"} />
      <div className="postContainer">
        <PostCard
          key={post.id}
          author={post.author} 
          content={post.content} 
          date={post.date} 
          isOpen='true'
        />
        <p className="commentNumber">
          XX <i className="fa-solid fa-message"></i>
        </p>
        <form className="commentForm" method="post">
          <input
            className="comment-container"
            type="textarea"
            name="comment"
            placeholder="Tapez votre commentaire ici ..."
            required
          />
        </form>
        {commentdivs}
      </div>
      <NavBar />
    </div>
  );
}
