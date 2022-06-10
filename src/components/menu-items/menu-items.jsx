import { Grid, Col, Row, Badge } from "rsuite";
import { useNavigate } from "react-router-dom";
import "./menu-items.scss";

const MenuItems = () => {
  const navigate = useNavigate();
  return (
    <div className="menu-items-container">
      <Grid>
        <Row>
          <Col md={6} className="menu-item-col">
            <div className="menu-item" onClick={() => navigate("")}>
              <i className="uil uil-star icon"></i>
              <p className="name">Home</p>
            </div>
          </Col>
          <Col md={6} className="menu-item-col">
            <div className="menu-item" onClick={() => navigate("profile")}>
              <i className="uil uil-user-circle icon"></i>
              <p className="name">Profile</p>
            </div>
          </Col>
          <Col md={6} className="menu-item-col">
            <div className="menu-item" onClick={() => navigate("settings")}>
              <i className="uil uil-cog icon"></i>
              <p className="name">Settings</p>
            </div>
          </Col>
          <Col md={6} className="menu-item-col">
            <div className="menu-item" onClick={() => navigate("about")}>
              <i className="uil uil-info-circle icon"></i>
              <p className="name">About</p>
            </div>
          </Col>
          <Col md={6} className="menu-item-col">
            <div className="menu-item" onClick={() => navigate("explore")}>
              <i className="uil uil-globe icon"></i>
              <p className="name">Explore</p>
            </div>
          </Col>
          <Col md={6} className="menu-item-col">
            <div className="menu-item" onClick={() => navigate("news/0")}>
              <i className="uil uil-newspaper icon"></i>
              <p className="name">News</p>
            </div>
          </Col>
          <Col md={6} className="menu-item-col">
            <div className="menu-item" onClick={() => navigate("signout")}>
              <i className="uil uil-sign-out-alt icon"></i>
              <p className="name">Sign Out</p>
            </div>
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export { MenuItems };
