import "./CommentCard.css"
export default function CommentCard({author, content, date}){  
   
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
    return(
        <div className="comment-card">
            <h3 className="comment-author">{author}</h3>
            <p className="comment-content">{content} </p>
            <p className="comment-date">{formatDate(date)}</p>
        </div>
         
    )
}