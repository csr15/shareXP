import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "./Container/Container";
import ReactGA from "react-ga";

import * as actions from "./store";

function App() {
  const userDetails = useSelector((state) => state.profile.userDetails);
  const authState = useSelector((state) => state.auth.authState);
  const dispatch = useDispatch();
  React.useEffect(() => {
    ReactGA.initialize("G-JBYV97BRSK");
    ReactGA.pageview(window.location.pathname + window.location.search);
    dispatch(actions.checkAuthState());

    if (localStorage.getItem("uid")) {
      dispatch(actions.getNotifications());
    }
    if (userDetails === "" && authState) {
      dispatch(actions.profileHandler());
    }
  }, [authState]);

  return (
    <div className="App">
      <Container />
    </div>
  );
}

export default App;
