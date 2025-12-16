import "./PostCard.css";

export default function PostCard({ author, content, date, isOpen }) {
  return (
    <div
      className="post-card"
      style={{ "minHeight": `${isOpen ? "8rem" : ""}` }}
    >
        <div>
      <h2 className="post-author">{author}</h2>
      <p className="post-content">{content}</p>
      </div>
      <p className="post-date">{new Date(date)?.toLocaleString("fr-FR")}</p>
    </div>
  );
}
