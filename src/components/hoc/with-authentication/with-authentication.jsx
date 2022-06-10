import { useSelector } from "react-redux";

const withAuth = (component) => {
  const AuthenticatedComponent = () => {
    const loggedInUser = useSelector((state) => state.user);
    if (loggedInUser) {
      return component;
    } else {
      window.location.href = "/";
    }
  };
  return <AuthenticatedComponent />;
};

export { withAuth };
