import "./alerts.scss";
import { Panel } from "rsuite";

const AlertsAndNotifications = () => {
  const alerts = [1, 2, 3, 4, 5];
  const Notification = () => {
    return (
      <Panel bordered className="alert">
        <div className="container">
          <div className="picture">
            <img src={require("../../assets/logo-no-bg.png")} alt="alert" />
          </div>
          <div className="content">
            <h5>Someone commented on your post</h5>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel
              dolor, natus sequi dicta.
            </p>
          </div>
        </div>
      </Panel>
    );
  };
  return (
    <div className="alerts-page">
      <div className="header">
        <h3>Alerts & Notifications</h3>
        <p>Showing the latest 20 notifications.</p>
      </div>
      <div className="alerts-container">
        {alerts.map((alert, index) => {
          return <Notification key={index} />;
        })}
      </div>
    </div>
  );
};

export { AlertsAndNotifications };
