const appConfig = {
  initialState: {
    theme: "light",
    language: "en",
    news: null,
    user: null,
  },
  firebase: {
    apiKey: "Your firebase API key goes here",
    authDomain: "Your auth domain goes here",
    projectId: "Your project ID goes here",
    storageBucket: "Your storage bucket goes here",
    messagingSenderId: "Your messagingSenderId goes here",
    appId: "Your appId goes here",
    measurementId: "Your measurementId goes here",
  },
  api: {
    news: {
      endpoint: "https://newsapi.org/v2/top-headlines",
      key: "Your API key goes here",
    },
  },
};

export { appConfig };
