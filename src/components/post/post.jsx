import { Panel } from "rsuite";
import "./post.scss";

const Post = ({ post }) => {
  if (!post) return;
  return (
    <Panel bordered className="post">
      <div className="header">
        <span className="profile-image-container">
          <img
            referrerPolicy="no-referrer"
            src={
              post["authorImageURL"] || require("../../assets/logo-no-bg.png")
            }
            alt={post["authorName"]}
          />
        </span>
        <span className="profile-details-container">
          <h5>{post["authorName"]}</h5>
          <p>{post["createdAt"]}</p>
        </span>
      </div>
      <hr />
      <p>{post["post"]}</p>
      {/* <div className="actions-row">
        <i className="icon uil uil-thumbs-up"></i>
        <i className="icon uil uil-thumbs-down"></i>
        <i className="icon uil uil-comments"></i>
        <i className="icon danger uil uil-exclamation-triangle"></i>
      </div> */}
    </Panel>
  );
};

export { Post };
