import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
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
const rootReducer = combineReducers({
  publish: publishReducer,
  auth: authReducer,
  profile: profileReducer,
  search: searchReducer,
  user: userStoriesReducer,
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
