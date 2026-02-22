import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { checkAuthState } from './store/slices/auth.slice';
import { fetchProfile, fetchNotifications } from './store/slices/profile.slice';
import Container from './components/layout/Container';

function App() {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth.authState);
  const userDetails = useAppSelector((state) => state.profile.userDetails);

  useEffect(() => {
    dispatch(checkAuthState());

    if (localStorage.getItem('uid')) {
      dispatch(fetchNotifications());
    }
  }, [dispatch]);

  useEffect(() => {
    if (!userDetails && authState) {
      dispatch(fetchProfile());
    }
  }, [authState, userDetails, dispatch]);

  return (
    <div className="App">
      <Container />
    </div>
  );
}

export default App;
