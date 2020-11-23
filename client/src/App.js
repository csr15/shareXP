import React from "react";
import { useDispatch } from "react-redux";
import Container from "./Container/Container";

import * as actions from "./store";

function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(actions.checkAuthState());
    dispatch(actions.getNotifications())
  }, []);

  return (
    <div className="App">
      <Container />
    </div>
  );
}

export default App;
