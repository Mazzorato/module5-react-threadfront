import "./PostCard.css";
import { useNavigate} from "react-router-dom";

export default function PostCard({ author, content, date, isOpen, id }) {

  const navigate = useNavigate();
  function handleClick() {
    navigate(`/post/${id}`);
  };
//revisar date de feed 
  return (
    <div className="post-card"
      style={{ "minHeight": `${isOpen ? "8rem" : ""}` }}
      onClick={handleClick}>

      <h2 className="post-author">{author}</h2>
      <p className="post-content">{content}</p>
      <p className="post-date">{date.toString()}</p>
    </div>
  );
}
