import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Col, Grid, Row, Badge } from "rsuite";
import {
  LanguageChangeButton,
  MenuDrawer,
  ThemeToggleSwitch,
  MenuItems,
} from "../../components";
import "./home.scss";
import { CACHE_NEWS } from "../../state-management/actions";
import { newsService } from "../../services";

const HomePage = () => {
  const loggedInUser = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const cachedNews = useSelector((state) => state.news);

  const PrimarySidePanel = () => {
    const ActivityStatus = () => {
      const [activity, setActivity] = useState(false);
      window.addEventListener("mousemove", () => setActivity(true));
      useEffect(() => {
        const activityCheckerTimer = setInterval(() => {
          setActivity(false);
        }, 60 * 1000);
        return () => clearInterval(activityCheckerTimer);
      }, []);
      return (
        <span>
          {
            <>
              <span>{activity ? "online " : "offline "}</span>
              <Badge color={`${activity ? "green" : "red"}`} />
            </>
          }
        </span>
      );
    };
    return (
      <div className="primary-side-panel">
        <div className="profile-picture-container">
          <img
            referrerPolicy="no-referrer"
            alt={loggedInUser["displayName"]}
            src={
              loggedInUser["photoURL"] ||
              "https://images.pexels.com/photos/2968939/pexels-photo-2968939.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            className="profile-picture"
          />
        </div>
        <h4>{loggedInUser.displayName}</h4>
        <p>{loggedInUser.email}</p>
        <ActivityStatus />
        <hr />
        <h5>Bio</h5>
        {loggedInUser["bio"] || (
          <p>
            <i className="uil uil-info-circle"></i>&nbsp;You haven't written a
            bio yet. Your can write one using the{" "}
            <NavLink to="settings">settings page</NavLink> .
          </p>
        )}
      </div>
    );
  };

  const SecondarySidePanel = () => {
    const Header = () => {
      return (
        <span className="header">
          <span className="header-item">
            <span className="brand-container">
              <img
                alt="crowdly"
                src={require("../../assets/logo-no-bg.png")}
                className="brand-logo"
              />
              &nbsp;&nbsp;
              <span className="brand-name">Crowdly</span>
            </span>
          </span>
          <span className="header-item">
            <LanguageChangeButton />
          </span>
          <span className="header-item">
            <ThemeToggleSwitch />
          </span>
        </span>
      );
    };

    const NewsContainer = () => {
      let shouldFetchNews = true;
      const latestNews = useSelector((state) => state.news);
      const navigate = useNavigate();

      async function fetchNews() {
        if (shouldFetchNews === false) return; // Dont fetch more news if the previous API call failed.
        const news = await newsService.fetchTopHeadlines();
        if (!news) shouldFetchNews = false;
        else dispatch(CACHE_NEWS(news));
      }

      useEffect(() => {
        if (!cachedNews) {
          fetchNews();
        }

        const newsRefreshTimer = setInterval(fetchNews, 900 * 1000); // Refresh the news after every 15 min

        return () => clearInterval(newsRefreshTimer);
      }, []);

      return (
        <div className="news-container">
          <h5>Trending news for you</h5>
          <p>Showing some top headlines.</p>
          <div className="news-list">
            {latestNews && latestNews.length > 0 ? (
              latestNews.slice(0, 4).map((news, index) => {
                return (
                  <div
                    className="item"
                    key={index}
                    onClick={() => navigate(`news/${index}`)}
                  >
                    <span className="icon">
                      <img
                        src={
                          news.urlToImage ||
                          require("../../assets/logo-no-bg.png")
                        }
                        alt="news icon"
                      />
                    </span>
                    <span className="content">
                      <b>{news.title}</b>
                    </span>
                  </div>
                );
              })
            ) : (
              <>
                <h6>Nothing to show right now.</h6>
                <p>Will try to fetch news soon...</p>
              </>
            )}
          </div>
        </div>
      );
    };

    return (
      <div className="secondary-side-panel">
        <Header />
        <hr />
        <MenuItems />
        <hr />
        <NewsContainer />
      </div>
    );
  };

  return (
    <main className="home-page">
      <Grid>
        {/* Computer view layout */}
        <Row>
          <Col lg={6} md={6} xsHidden smHidden className="sticky-col">
            <PrimarySidePanel />
          </Col>
          <Col lg={12} md={12} xsHidden smHidden>
            <Outlet />
          </Col>
          <Col lg={6} md={6} xsHidden smHidden className="sticky-col">
            <SecondarySidePanel />
          </Col>
        </Row>
        {/* Mobile view layout */}
        <Row>
          <Col xs={24} sm={24} mdHidden lgHidden>
            <div className="mobile-view">
              <div className="app-header">
                <span className="brand-name">
                  <img
                    src={require("../../assets/logo-no-bg.png")}
                    alt="crowdly"
                  />
                  &nbsp;<h4>Crowdly</h4>
                </span>
                <span className="options">
                  <LanguageChangeButton />
                  <ThemeToggleSwitch />
                  <MenuDrawer />
                </span>
              </div>
              <div className="header">
                <img
                  src={
                    loggedInUser["photoURL"] ||
                    "https://images.pexels.com/photos/2968939/pexels-photo-2968939.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  }
                  alt="sudershan singh"
                />
                <h4>Sudershan Singh</h4>
                <p>sudershansingh900@gmail.com</p>
                <span>
                  online&nbsp;
                  <Badge color="green" />
                </span>
              </div>
              <hr />
              <div className="bio-section">
                <b>Bio</b>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Facere fuga tenetur adipisci neque ipsa vero tempora officiis
                  illum rerum explicabo nostrum harum ut asperiores quaerat a,
                  quod magnam voluptatem aperiam?
                </p>
              </div>
              <hr />
              <Outlet />
            </div>
          </Col>
        </Row>
      </Grid>
    </main>
  );
};

export { HomePage };
