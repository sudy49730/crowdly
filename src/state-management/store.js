import { createStore } from "redux";
import { primaryReducer } from "./reducer";

const store = createStore(primaryReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export { store };
