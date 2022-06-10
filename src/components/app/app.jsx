import { useSelector } from "react-redux";
import { NotificationContainer } from "react-notifications";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CustomProvider } from "rsuite";

import {
  LoginPage,
  HomePage,
  GreetingsPage,
  ProfilePage,
  SettingsPage,
  AboutPage,
  ExplorePage,
  AlertsAndNotifications,
  SignOut,
  NewsPage,
} from "../../pages";

import { withAuth } from "../";

const ApplicationRouting = () => {
  return (
    <Router basename="/crowdly">
      <Routes>
        <Route path="home" element={withAuth(<HomePage />)}>
          <Route index element={<GreetingsPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="explore" element={<ExplorePage />} />
          <Route path="notifications" element={<AlertsAndNotifications />} />
          <Route path="signout" element={<SignOut />} />
          <Route path="news/:index" element={<NewsPage />} />
          <Route path="*" element={<h1>Page not found</h1>} />
        </Route>
        <Route path="/" element={<LoginPage />} />
        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
    </Router>
  );
};

const App = () => {
  const theme = useSelector((state) => state.theme);
  return (
    <CustomProvider theme={theme}>
      <ApplicationRouting />
      <NotificationContainer />
    </CustomProvider>
  );
};

export { App };
