import { doc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Row, Col, Grid, Button } from "rsuite";
import {
  Label,
  LanguageChangeButton,
  ThemeToggleSwitch,
} from "../../components";
import { auth, notification, userService } from "../../services";
import { CACHE_LOGGED_IN_USER } from "../../state-management/actions";
import "./login.scss";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initiateGoogleSignIn = async () => {
    const user = await auth.signInWithGoogle();
    if (user) {
      const {
        stsTokenManager,
        uid,
        displayName,
        email,
        emailVerified,
        metadata,
        phoneNumber,
        photoURL,
      } = user;

      const postsFromDb = await userService.fetchCurrentUserPosts(uid);
      const currentUsersPosts = postsFromDb
        ? postsFromDb.docs.map((doc) => {
            return doc.data();
          })
        : [];

      const loggedInUser = {
        token: stsTokenManager,
        uid,
        displayName,
        email,
        emailVerified,
        lastLoginTime: metadata.lastSignInTime,
        phoneNumber,
        photoURL,
        posts: currentUsersPosts,
        bio: "",
        gender: "na",
      };
      const userToSaveInDb = { ...loggedInUser };
      delete userToSaveInDb.token;
      const userFromDb = await userService.saveUserToDatabaseIfDoesntExist(
        userToSaveInDb
      );
      if (!userFromDb) {
        notification.error("We are unable to log you in.");
        return;
      }
      const loggedInUserExistingDetails =
        await userService.getLoggedInUserExistingDetails(loggedInUser["uid"]);
      if (!loggedInUserExistingDetails) {
        notification.error("We are unable to find you in our database.");
        return;
      }
      dispatch(
        CACHE_LOGGED_IN_USER({
          ...loggedInUserExistingDetails,
          token: loggedInUser.token,
        })
      );
      navigate("home");
    } else {
      notification.error("Unable to sign you in at this moment.");
    }
  };

  return (
    <Grid className="login-page">
      <Row>
        <Col md={8} sm={24} xs={24} className="content-container">
          <div className="header">
            <span className="left">
              <img
                className="logo"
                src={require("../../assets/logo-no-bg.png")}
                alt="crowdly"
              />
              &nbsp;
              <h2 className="brand-text">
                <Label i18nKey={"APP_NAME"} />
              </h2>
            </span>
            <span className="right">
              <LanguageChangeButton />
              <ThemeToggleSwitch />
            </span>
          </div>
          <div className="description-container">
            <h5>
              <Label i18nKey={"GREETING"} />
              <br />
              <Label i18nKey={"DESCRIPTION"} />
            </h5>
            <Button
              onClick={initiateGoogleSignIn}
              appearance="primary"
              color="red"
              className="google-sign-ing-btn"
            >
              <i className="uil uil-google"></i>&nbsp;{" "}
              <Label i18nKey={"CONTINUE_WITH_GOOGLE"} />
            </Button>
            <h5 className="about-title">
              <Label i18nKey={"ABOUT_THIS_PROJECT"} />
            </h5>
            <p className="about-description">
              <Label i18nKey={"ABOUT_DESCRIPTION"} />
            </p>
            <h5 className="author-title">
              <Label i18nKey={"MEET_THE_AUTHOR"} />
            </h5>
            <p className="author-description">
              <Label i18nKey={"AUTHOR_DESCRIPTION"} />
            </p>
          </div>
        </Col>
        <Col md={16} xsHidden smHidden className="img-container">
          <img
            className="background-img"
            alt="welcome to crowdly"
            src={require("../../assets/background.png")}
          />
        </Col>
      </Row>
    </Grid>
  );
};

export { LoginPage };
