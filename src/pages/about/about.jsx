import "./about.scss";
import { Button, Input } from "rsuite";
import { useState } from "react";
import { db, notification } from "../../services";
import { useSelector } from "react-redux";
import { Label } from "../../components";

const AboutPage = () => {
  const Description = () => {
    return (
      <div>
        <h3>
          <Label i18nKey={"ABOUT_THIS_PROJECT"} />
        </h3>
        <p>
          <Label i18nKey={"HELLO_AND_WELCOME_TO_CROWDLY"} />
        </p>
        <p>
          <Label i18nKey={"ABOUT_PAGE_DESCRIPTION"} />
        </p>
      </div>
    );
  };

  const About = () => {
    return (
      <div className="author-container">
        <h5>
          <Label i18nKey={"WHOS_THE_AUTHOR"} />
        </h5>
        <span className="flex-container">
          <div className="left">
            <img
              src={require("../../assets/author.png")}
              alt="sudershan singh"
            />
          </div>
          <div className="right">
            <h6>
              <Label i18nKey={"AUTHOR_NAME"} />
            </h6>
            <p>
              <Label i18nKey={"AUTHOR_PAGE_NOTE"} />
              &nbsp;
              <a
                href="https://github.com/sudy49730"
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>{" "}
              <Label i18nKey={"AUTHOR_PAGE_NOTE_2"} />
              &nbsp;
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
              </a>
              ,
              &nbsp;
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
        <h5>
          <Label i18nKey={"CONTRIBUTION"} />
        </h5>
        <p>
          <Label i18nKey={"CONTRIBUTION_2"} />{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/sudy49730/crowdly"
          >
            repository
          </a>
          <Label key={"CONTRIBUTION_3"} />
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
        <h5>
          <Label i18nKey={"FEEDBACK"} />
        </h5>
        <p>
          <Label i18nKey={"FEEDBACK_2"} />
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
