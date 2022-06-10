const TOGGLE_THEME = () => {
  return {
    type: "TOGGLE_THEME",
  };
};

const CHANGE_LANGUAGE = (newLanguage) => {
  return {
    type: "CHANGE_LANGUAGE",
    payload: newLanguage,
  };
};

const CACHE_NEWS = (news) => {
  return {
    type: "CACHE_NEWS",
    payload: news,
  };
};

const CACHE_LOGGED_IN_USER = (loggedInUser) => {
  return {
    type: "CACHE_LOGGED_IN_USER",
    payload: loggedInUser,
  };
};

const SIGN_OUT_USER = (loggedInUser) => {
  return {
    type: "SIGN_OUT_USER",
    payload: loggedInUser,
  };
};

const UPDATE_CURRENT_USER_POSTS = (currentUsersPosts) => {
  return {
    type: "UPDATE_CURRENT_USER_POSTS",
    payload: currentUsersPosts,
  };
};

export {
  TOGGLE_THEME,
  CHANGE_LANGUAGE,
  CACHE_NEWS,
  CACHE_LOGGED_IN_USER,
  SIGN_OUT_USER,
  UPDATE_CURRENT_USER_POSTS,
};
