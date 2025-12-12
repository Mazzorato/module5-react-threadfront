import "./PostCard.css"

export default function PostCard({author, content, date}){ 
    return(
        <div className="post-card">
            <h2 className="post-author">{author}</h2>
            <p className="post-content">{content}</p>
            <p className="post-date">{date}</p>
        </div>
    )
}