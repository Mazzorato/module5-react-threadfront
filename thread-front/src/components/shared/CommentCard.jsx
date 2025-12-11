import "./CommentCard.css"
export default function CommentCard({author, content, date}){  
   
    return(
        <div className="comment-card">
            <h3 className="comment-author">{author}</h3>
            <p className="comment-content">{content} </p>
            <p className="comment-date">{date}</p>
        </div>
         
    )
}