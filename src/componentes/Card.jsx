function Card({ title, mediaUrl, tags = [], metadata = [], cor = "var(--accent)" }) {
  return (
    <article className="card-item" style={{ "--cor-card": cor }}>
      <img src={mediaUrl} alt={title} />
      <h3>{title}</h3>

      {tags.length > 0 && (
        <ul className="tags">
          {tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      )}

      {metadata.length > 0 && (
        <dl className="metadata">
          {metadata.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </article>
  );
}

export default Card;
