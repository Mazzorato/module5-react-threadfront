import "./PostCard.css"

export default function PostCard({author, content}){ 
    return(
        <div>
            <h2 className="post-title">{author}</h2>
            <p className="post-content">{content}</p>
        </div>
    )
}