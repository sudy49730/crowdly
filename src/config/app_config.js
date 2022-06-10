const appConfig = {
  initialState: {
    theme: "light",
    language: "en",
    news: null,
    user: null,
  },
  firebase: {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: "",
  },
  api: {
    news: {
      endpoint: "https://newsapi.org/v2/top-headlines",
      key: "",
    },
  },
};

export { appConfig };
