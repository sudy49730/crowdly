import { NotificationManager } from "react-notifications";

class Notification {
  success(message = "", timeout = 3000, callback = null) {
    NotificationManager.success(message, "Success!", timeout, callback);
  }
  info(message = "", timeout = 3000, callback = null) {
    NotificationManager.info(message, "Info", timeout, callback);
  }
  error(message = "", timeout = 3000, callback = null) {
    NotificationManager.error(message, "Error", timeout, callback);
  }
  warning(message = "", timeout = 3000, callback = null) {
    NotificationManager.warning(message, "Warning", timeout, callback);
  }
}
const notification = new Notification();

export { notification };
