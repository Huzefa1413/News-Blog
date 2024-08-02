import "./NewsPost.css";

const Post = (props, i) => (
  <div key={i} className="apipost">
    <h2>{props.source}</h2>
    <div className="time">{props.publishedAt}</div>
    <div className="data">
      <h3>{props.title}</h3>
      <p>{props.description}</p>
      <a href={props.url} target="_blank" rel="noreferrer">Read More</a>
    </div>
    <div className="image">
      <img src={props.urlToImage} alt="" />
    </div>
    <div>
    </div>
  </div >
);

export default Post;
