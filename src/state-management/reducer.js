import { appConfig } from "../config";
const initialState = appConfig.initialState;

const primaryReducer = (state = initialState, action = null) => {
  if (!action) return state;
  const { type, payload } = action;

  switch (type) {
    case "TOGGLE_THEME":
      state.theme = state.theme === "light" ? "dark" : "light";
      return { ...state };

    case "CHANGE_LANGUAGE":
      if (!payload) return { ...state };
      state.language = payload;
      return { ...state };

    case "CACHE_NEWS":
      if (!payload) return { ...state };
      state.news = payload;
      return { ...state };

    case "CACHE_LOGGED_IN_USER":
      if (!payload) return { ...state };
      state.user = payload;
      return { ...state };

    case "SIGN_OUT_USER":
      state.user = null;
      return { ...state };

    case "UPDATE_CURRENT_USER_POSTS":
      if (!payload) return { ...state };
      state.posts = payload;
      return { ...state };

    default:
      return { ...state };
  }
};

export { primaryReducer };
