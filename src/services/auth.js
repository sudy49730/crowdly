import { firebase } from "./firebase";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { notification } from "./notification";

class AuthService {
  #auth = null;

  constructor() {
    this.#auth = firebase.getAuthInstance();
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

  async signInWithGoogle() {
    try {
      const response = await signInWithPopup(
        this.#auth,
        new GoogleAuthProvider()
      );
      const user = response["user"];
      return user;
    } catch (error) {
      this.#handleFirebaseError(error);
      return null;
    }
  }

  async signOutUser() {
    try {
      const response = await signOut(this.#auth);
      return response;
    } catch (error) {
      this.#handleFirebaseError(error);
      return null;
    }
  }
}

const auth = new AuthService();

export { auth };
