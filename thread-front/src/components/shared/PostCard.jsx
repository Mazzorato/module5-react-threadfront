import "./PostCard.css";
import { useNavigate} from "react-router-dom";

export default function PostCard({ author, content, date, isOpen, id }) {

  const navigate = useNavigate();
  function handleClick() {
    navigate(`/post/${id}`);
  };

  function formatDate(date) {
    
    const heurs = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const jour = date.getUTCDate();
  
    const mois = [
        'janv', 'fev', 'mar', 'avr', 'mai', 'juin',
        'juil', 'aout', 'sep', 'oct', 'nov', 'dec'
    ];
    const singleMois = mois[date.getUTCMonth()];
    const year = date.getUTCFullYear().toString().slice(-2);
  
    return `${heurs}:${minutes} ${jour} ${singleMois} ${year}`;

  }

  return (
    <div className="post-card"
      style={{ "minHeight": `${isOpen ? "8rem" : ""}` }}
      onClick={handleClick}>

      <h2 className="post-author">{author}</h2>
      <p className="post-content">{content}</p>
      <p className="post-date">{formatDate(date)}</p>
    </div>
  );
}
