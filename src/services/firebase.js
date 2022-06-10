import { appConfig } from "../config/";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

class Firebase {
  #app = null;
  #auth = null;
  #database = null;

  constructor() {
    this.#app = initializeApp(appConfig.firebase);
    this.#auth = getAuth();
    this.#database = getFirestore(this.#app);
  }

  getAppInstance() {
    return this.#app || null;
  }

  getAuthInstance() {
    return this.#auth || null;
  }

  getDatabaseInstance() {
    return this.#database || null;
  }
}
const firebase = new Firebase();

export { firebase };
