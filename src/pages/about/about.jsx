import "./about.scss";
import { Button, Input } from "rsuite";
import { useState } from "react";
import { db, notification } from "../../services";
import { useSelector } from "react-redux";

const AboutPage = () => {
  const Description = () => {
    return (
      <div>
        <h3>About this project</h3>
        <p>Hello and welcome to Crowdly !</p>
        <p>
          It is an open source project developed for educational purpose and
          fun. It's front end is built on top of React Js and the backend runs
          on firebase, with a nodeJS server acting as a middleware.
        </p>
      </div>
    );
  };

  const About = () => {
    return (
      <div className="author-container">
        <h5>Who's the author ?</h5>
        <span className="flex-container">
          <div className="left">
            <img
              src={require("../../assets/author.png")}
              alt="sudershan singh"
            />
          </div>
          <div className="right">
            <h6>Sudershan Singh</h6>
            <p>
              Hi, my name is Sudershan Singh, and I'm the author of this
              application. I enjoy developing such projects as part of my hobby,
              there are more project like this listed on my&nbsp;
              <a
                href="https://github.com/sudy49730"
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>{" "}
              profile. If you'd like to connect please feel free to reach out on
              my&nbsp;
              <a
                href="https://wa.me/7568999246?text=Saw%20your%20project%20crowdly,%20and%20thought%20of%20saying%20Hello"
                target="_blank"
                rel="noreferrer"
              >
                Whatsapp
              </a>
              , &nbsp;
              <a
                href="https://www.linkedin.com/in/sudershan-singh-9a874512a/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>{" "}
              or drop an&nbsp;
              <a
                href="mailto:sudershansingh900@gmail.com"
                target="_blank"
                rel="noreferrer"
              >
                eMail
              </a>
            </p>
          </div>
        </span>
      </div>
    );
  };

  const Contribution = () => {
    return (
      <div className="contribution-container">
        <h5>Contribution</h5>
        <p>
          Since this is an open-source project you as a developer can contribute
          as well. If you'd like to do so please feel free to clone the project
          from the{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/sudy49730/crowdly"
          >
            repository
          </a>
          , and raise PRs to the develop branch.
        </p>
      </div>
    );
  };

  const Feedback = () => {
    const loggedInUser = useSelector((state) => state.user);
    const [feedbackContent, setFeedBackContent] = useState("");
    const [feedbackButtonDisabled, setFeedbackButtonDisabled] = useState(false);
    const handelFeedbackChange = (value) => {
      setFeedBackContent(value);
    };

    const submitFeedback = async () => {
      setFeedbackButtonDisabled(true);
      const feedbackObject = { ...loggedInUser };
      delete feedbackObject["token"];
      feedbackObject["feedback"] = feedbackContent;
      const response = await db.create("feedback", feedbackObject);
      if (!response) {
        notification.error("Unable to submit your feedback :(");
      } else {
        notification.success("Feedback shared successfully :)");
      }
      setFeedBackContent("");
      setFeedbackButtonDisabled(false);
    };

    return (
      <div className="feedback-container">
        <h5>Have something to say ?</h5>
        <p>
          Your suggestion/feedback is valuable. Please use the form below and
          let me know how you feel about crowdly.
        </p>
        <Input
          value={feedbackContent}
          as="textarea"
          rows={5}
          onChange={handelFeedbackChange}
        />
        <Button
          disabled={feedbackButtonDisabled}
          appearance="primary"
          color="green"
          onClick={submitFeedback}
        >
          Submit
        </Button>
      </div>
    );
  };

  return (
    <div className="about-page">
      <Description />
      <About />
      <Contribution />
      <Feedback />
    </div>
  );
};

export { AboutPage };
