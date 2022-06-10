import "./signout.scss";
import { Button } from "rsuite";
import { useDispatch } from "react-redux";
import { SIGN_OUT_USER } from "../../state-management/actions";
import { auth } from "../../services/auth";
const SignOut = () => {
  const dispatch = useDispatch();

  const signOutCurrentUser = async () => {
    await auth.signOutUser();
    dispatch(SIGN_OUT_USER());
  };
  return (
    <div className="signout-page">
      <div className="header">
        <h3>Sign out of the application</h3>
        <p>
          <i className="uil uil-info-circle"></i>&nbsp;Signing out will close
          your session on this device and all other devices you might have
          logged in earlier.
        </p>
      </div>
      <div className="signout-container">
        <Button appearance="primary" color="red" onClick={signOutCurrentUser}>
          <i className="uil uil-sign-out-alt"></i>&nbsp;Sign out
        </Button>
      </div>
    </div>
  );
};

export { SignOut };
