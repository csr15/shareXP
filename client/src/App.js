import React from "react";
import { useDispatch } from "react-redux";
import Container from "./Container/Container";
import ReactGA from "react-ga";

import * as actions from "./store";

function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    ReactGA.initialize("G-JBYV97BRSK");
    ReactGA.pageview(window.location.pathname + window.location.search);
    dispatch(actions.checkAuthState());
    dispatch(actions.getNotifications());
  }, []);

  return (
    <div className="App">
      <Container />
    </div>
  );
}

export default App;
