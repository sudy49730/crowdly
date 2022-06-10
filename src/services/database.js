import { addDoc, collection, getDocs } from "firebase/firestore";
import { firebase } from "./firebase";
import { notification } from "./notification";

class DatabaseService {
  #database = null;

  constructor() {
    this.#database = firebase.getDatabaseInstance();
  }

  #handleFirebaseError(error) {
    const { code } = error;
    if (code) {
      switch (code) {
        case "auth/popup-closed-by-user":
          notification.error("Oops! You closed the sign in popup.");
          break;

        default:
          notification.error(`ERROR:  ${error["message"]}`);
          break;
      }
    } else {
      notification.error("Oops! Something went wrong, please try again later.");
    }
  }

  async create(collectionName, data) {
    const collectionRef = collection(this.#database, collectionName);
    try {
      const response = await addDoc(collectionRef, data);
      return response;
    } catch (error) {
      this.#handleFirebaseError(error);
      return null;
    }
  }

  async read(collectionName) {
    const collectionRef = collection(this.#database, collectionName);
    try {
      const response = await getDocs(collectionRef);
      return response;
    } catch (error) {
      this.#handleFirebaseError(error);
      return null;
    }
  }
}

const db = new DatabaseService();

export { db };
