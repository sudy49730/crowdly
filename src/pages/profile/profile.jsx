import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Message, Timeline } from "rsuite";
import { Post } from "../../components";
import { userService, notification } from "../../services";
import "./profile-page.scss";

const ProfilePage = () => {
  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const loggedInUser = useSelector((state) => state.user);

  const fetchCurrentUserPosts = async () => {
    const posts = await userService.fetchCurrentUserPosts(loggedInUser["uid"]);
    if (!posts) {
      notification.error("Unable to fetch posts.");
      setLoading(false);
      return;
    } else {
      const allPosts = posts.docs.map((item) => {
        return { ...item.data(), id: item.id };
      });
      allPosts.sort((a, b) => b["postIndex"] - a["postIndex"]);
      setMyPosts(allPosts);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUserPosts();
  }, []);

  return (
    <div className="profile-page">
      {!loading ? (
        <div className="profile-container">
          <div className="page-header">
            <h3>My Profile</h3>
            <p>
              <i className="uil uil-info-circle"></i>&nbsp;These are the posts
              that you've created in the past.
            </p>
          </div>
          <br />
          <div className="timeline">
            <Timeline>
              {myPosts.map((post) => {
                return (
                  <Timeline.Item key={post['id']}>
                    <b>You on {post["createdAt"]}</b>
                    <Post post={post} />
                  </Timeline.Item>
                );
              })}

              <Timeline.Item>
                <b>You joined Crowdly !</b>
              </Timeline.Item>
            </Timeline>
          </div>
        </div>
      ) : (
        <Message>
          <h4>Loading your posts, please wait...</h4>
          <p>We're trying to fetch posts created by you from the server.</p>
        </Message>
      )}
    </div>
  );
};

export { ProfilePage };
