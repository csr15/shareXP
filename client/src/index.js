import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

//Reducers
import publishReducer from "./store/reducers/publish";
import authReducer from "./store/reducers/auth";
import profileReducer from "./store/reducers/profile";
import searchReducer from "./store/reducers/search";
import userStoriesReducer from "./store/reducers/userStories";
import suggestReducer from "./store/reducers/suggestion";

const rootReducer = combineReducers({
  publish: publishReducer,
  auth: authReducer,
  profile: profileReducer,
  search: searchReducer,
  user: userStoriesReducer,
  suggest: suggestReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

//Avoiding console.log in production mode
if (process.env.NODE_ENV !== "development") console.log = () => {};
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
