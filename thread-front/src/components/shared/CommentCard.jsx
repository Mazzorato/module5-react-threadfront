import "./CommentCard.css"
export default function CommentCard({author, content}){  
   
    return(
        <div>
            <h3 className="comment-author">{author}</h3>
            <p className="comment-content">{content}</p>
        </div>
    )
}