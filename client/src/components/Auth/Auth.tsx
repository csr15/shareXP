import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import SignIn from './SignIn';
import SignUp from './SignUp';
import './Auth.scss';
import Popup from '../common/Popup';

const Auth: React.FC = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [signupLoader, setSignupLoader] = useState(false);
  const [signInLoader, setSignInLoader] = useState(false);

  const navigate = useNavigate();

  const didSignedUp = useAppSelector((s) => s.auth.didSignedUp);
  const didGoogleAuthed = useAppSelector((s) => s.auth.googleAuth);
  const authState = useAppSelector((s) => s.auth.authState);

  useEffect(() => {
    if (didSignedUp !== '' && isSignup) {
      setIsSignup(false);
    }
  }, [didSignedUp, isSignup]);

  useEffect(() => {
    if (authState) {
      navigate('/');
    }
  }, [authState, navigate]);

  useEffect(() => {
    if (didGoogleAuthed !== '') {
      const likedStory = localStorage.getItem('likedStory');
      if (likedStory) {
        navigate(likedStory);
        localStorage.removeItem('likedStory');
      } else {
        navigate('/');
      }
    }
  }, [didGoogleAuthed, navigate]);

  return (
    <div className="xp-auth">
      <div className="row">
        <div className="col-md-5">
          <div className="xp-auth-img">
            <p>shareXP</p>
          </div>
        </div>
        <div className="col-md-7 my-auto">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <p
                className={`nav-link ${!isSignup ? 'active' : ''}`}
                style={!isSignup ? { borderBottomColor: '#FCA311' } : undefined}
                onClick={() => setIsSignup(false)}
              >
                Signin
              </p>
            </li>
            <li className="nav-item">
              <p
                className={`nav-link ${isSignup ? 'active' : ''}`}
                style={isSignup ? { borderBottomColor: '#FCA311' } : undefined}
                onClick={() => setIsSignup(true)}
              >
                Signup
              </p>
            </li>
          </ul>
          {isSignup ? (
            <SignUp
              loader={signupLoader}
              onLoader={() => setSignupLoader(true)}
              offLoader={() => setSignupLoader(false)}
            />
          ) : (
            <SignIn
              loader={signInLoader}
              onLoader={() => setSignInLoader(true)}
              offLoader={() => setSignInLoader(false)}
            />
          )}
        </div>
      </div>
      {didSignedUp && <Popup type="alert-success" text="Account created successfully!" />}
    </div>
  );
};

export default Auth;
