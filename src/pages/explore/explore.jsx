import "./explore.scss";
import { Post } from "../../components";
import { notification, db } from "../../services";
import { useState, useEffect } from "react";
import { Message } from "rsuite";

const ExplorePage = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllPosts = async () => {
    const posts = await db.read("posts");
    if (!posts) {
      notification.error("Unable to fetch posts.");
      setLoading(false);
      return;
    } else {
      const allPosts = posts.docs.map((item) => {
        return { ...item.data(), id: item.id };
      });
      allPosts.sort((a, b) => b["postIndex"] - a["postIndex"]);
      setAllPosts(allPosts);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);
  return (
    <div className="explore-page">
      {!loading ? (
        <>
          <div className="header">
            <h3>Explore</h3>
            <p>
              <i className="uil uil-info-circle"></i>&nbsp;Here, you can view
              all the posts others have created.
            </p>
          </div>
          <div className="content">
            {allPosts.map((post, index) => (
              <Post post={post} key={index} />
            ))}
          </div>
        </>
      ) : (
        <Message>
          <h4>Fetching all posts from the server.</h4>
          <p>
            Trying to fetch all the posts others have created from the server.
          </p>
        </Message>
      )}
    </div>
  );
};

export { ExplorePage };
