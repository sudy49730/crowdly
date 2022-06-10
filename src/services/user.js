import { firebase } from "./firebase";
import { notification } from "./notification";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "./database";

class UserService {
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
          notification.error("Oops! Unable to sign you in.");
          break;
      }
    } else {
      notification.error("Oops! Something went wrong, please try again later.");
    }
  }

  async updateUserDetails(updatedUser) {
    const updateRef = doc(this.#database, "users", updatedUser["id"]);
    delete updatedUser["id"];
    try {
      const response = await updateDoc(updateRef, updatedUser);
      return response;
    } catch (error) {
      this.#handleFirebaseError();
      return null;
    }
  }

  async fetchCurrentUserPosts(uid) {
    const collectionRef = collection(this.#database, "posts");
    const currentUserPostsQuery = query(collectionRef, where("uid", "==", uid));
    try {
      const querySnapshot = await getDocs(currentUserPostsQuery);
      return querySnapshot;
    } catch (error) {
      this.#handleFirebaseError(error);
      return null;
    }
  }

  async getLoggedInUserExistingDetails(uid) {
    const collectionRef = collection(this.#database, "users");
    const userExistanceQuery = query(collectionRef, where("uid", "==", uid));
    try {
      const querySnapshot = await getDocs(userExistanceQuery);
      const response = querySnapshot.docs.map((user) => {
        return { ...user.data(), id: user.id };
      });
      return response.length > 0 ? response[0] : null;
    } catch (error) {
      this.#handleFirebaseError(error);
      return null;
    }
  }

  async saveUserToDatabaseIfDoesntExist(user) {
    const collectionRef = collection(this.#database, "users");
    const userExists = await this.#userExists(collectionRef, user["uid"]);
    if (userExists === false) {
      try {
        await db.create("users", user);
        return user;
      } catch (error) {
        this.#handleFirebaseError(error);
        return null;
      }
    }
    return user;
  }

  async #userExists(collectionRef, uid) {
    const userExistanceQuery = query(collectionRef, where("uid", "==", uid));
    try {
      const querySnapshot = await getDocs(userExistanceQuery);
      return querySnapshot.empty ? false : true;
    } catch (error) {
      this.#handleFirebaseError(error);
      return null;
    }
  }
}

const userService = new UserService();

export { userService };
