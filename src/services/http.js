import axios, { AxiosError } from "axios";
import { notification } from "./notification";

// This service will either return the response or null
class HttpService {
  #handelErrorGracefully(error) {
    if (error instanceof AxiosError) {
      notification.error(
        error.response.data ? error.response.data.message : error.message,
        5000
      );
    } else {
      notification.error("Something went wrong, please try again later.", 5000);
    }
  }

  async get(URL = null, headers = null) {
    // Deliberately throw this error so that the developer is aware they made a mistake.
    if (!URL) {
      notification.error("URL not provided for GET request.");
      return null;
    }
    try {
      const response = await axios.get(URL, headers);
      return response && response.data;
    } catch (error) {
      this.#handelErrorGracefully(error);
      return null;
    }
  }

  async post(URL = null, body = null, headers = null) {
    // Deliberately throw this error so that the developer is aware they made a mistake.
    if (!URL) {
      notification.error("URL not provided for POST request.");
      return null;
    }
    try {
      const response = await axios.post(URL, body, headers);
      return response && response.data;
    } catch (error) {
      this.#handelErrorGracefully(error);
      return null;
    }
  }

  async put(URL = null, body = null, headers = null) {
    // Deliberately throw this error so that the developer is aware they made a mistake.
    if (!URL) {
      notification.error("URL not provided for PUT request.");
      return null;
    }
    try {
      const response = await axios.put(URL, body, headers);
      return response && response.data;
    } catch (error) {
      this.#handelErrorGracefully(error);
      return null;
    }
  }

  async delete(URL = null, headers = null) {
    // Deliberately throw this error so that the developer is aware they made a mistake.
    if (!URL) {
      notification.error("URL not provided for DELETE request.");
      return null;
    }
    try {
      const response = await axios.delete(URL, headers);
      return response && response.data;
    } catch (error) {
      this.#handelErrorGracefully(error);
      return null;
    }
  }
}
const http = new HttpService();

export { http };
