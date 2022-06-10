import "./greetings-page.scss";
import { Button, Input } from "rsuite";
import { Post } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { db, notification, userService } from "../../services";
import { useEffect, useState } from "react";
import { UPDATE_CURRENT_USER_POSTS } from "../../state-management/actions";

const GreetingsPage = () => {
  const loggedInUser = useSelector((state) => state.user);
  const [newPostContent, setNewPostContent] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [disableSubmitButton, setDisableSubmitButton] = useState(false);
  const dispatch = useDispatch();

  const fetchAllPosts = async () => {
    const posts = await db.read("posts");
    if (!posts) {
      notification.error("Unable to fetch posts.");
      return;
    } else {
      const allPosts = posts.docs.map((item) => {
        return { ...item.data(), id: item.id };
      });
      allPosts.sort((a, b) => b["postIndex"] - a["postIndex"]);
      setAllPosts(allPosts);
    }
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  const getCurrentSanitizedDate = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const date = new Date();
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const time = `${date.getHours()}:${date.getMinutes()}`;

    return `${day}-${month}-${year} @ ${time}`;
  };

  const handelChange = (value) => {
    setNewPostContent(value);
  };

  const handelSubmit = async () => {
    if (!newPostContent) {
      notification.info("Please write something first.");
      return;
    }
    setDisableSubmitButton(true);
    const post = {
      authorImageURL: loggedInUser["photoURL"],
      postIndex: allPosts.length,
      authorName: loggedInUser["displayName"],
      uid: loggedInUser["uid"],
      post: newPostContent,
      createdAt: getCurrentSanitizedDate(),
    };

    const response = await db.create("posts", post);
    if (response) {
      notification.success("Your post was published successfully");
      const response = await userService.fetchCurrentUserPosts(
        loggedInUser["uid"]
      );
      const currentUsersPosts = response
        ? response.docs.map((doc) => {
            return doc.data();
          })
        : [];
      dispatch(UPDATE_CURRENT_USER_POSTS(currentUsersPosts));
    } else notification.error("There was an error publishing your post");
    setNewPostContent("");
    fetchAllPosts();
    setDisableSubmitButton(false);
  };

  const handelDiscard = () => {
    setNewPostContent("");
  };

  return (
    <div className="greetings-page">
      <div className="greetings-container">
        <h3>Hello {loggedInUser["displayName"]}</h3>
        <p>Welcome to Crowdly, hope you're having a good day today.</p>
        <Input
          value={newPostContent}
          onChange={handelChange}
          className="textarea"
          as="textarea"
          rows={3}
          placeholder="What's on your mind ?"
        />
        <Button
          appearance="primary"
          color="green"
          onClick={handelSubmit}
          disabled={disableSubmitButton}
        >
          <i className="uil uil-message"></i>&nbsp;Publish
        </Button>
        &nbsp;
        <Button appearance="primary" color="red" onClick={handelDiscard}>
          <i className="uil uil-trash"></i>&nbsp;Discard
        </Button>
        <div className="my-posts-container">
          {allPosts.length > 0 && (
            <>
              <br />
              <h4>Showing latest posts</h4>
              <p>Here are some of the recent posts created by the community.</p>
              <br />
            </>
          )}
          {allPosts.length > 0 ? (
            allPosts.map((post, index) => <Post post={post} key={index} />)
          ) : (
            <div className="centralized-container">
              <video
                className="lottie-animation"
                autoPlay
                loop
                controls={false}
                src={require("../../assets/welcome-lottie.mp4")}
              >
                Unable to play video
              </video>
              <div className="dark-mode-illustration-container">
                <img
                  src={require("../../assets/no-post.png")}
                  alt="no posts to show"
                />
              </div>
              <h4>Wow, such empty. Create a new post!</h4>
              <p>When you create a new post, it will show up here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { GreetingsPage };
