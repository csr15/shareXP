import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { signin } from '../../store/slices/auth.slice';
import Popup from '../common/Popup';

interface SignInProps {
  loader: boolean;
  onLoader: () => void;
  offLoader: () => void;
}

const SignIn: React.FC<SignInProps> = ({ loader, onLoader, offLoader }) => {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fieldsNotFilled, setFieldsNotFilled] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const didSignedIn = useAppSelector((s) => s.auth.didSignedIn);
  const didSignedUp = useAppSelector((s) => s.auth.didSignedUp);
  const signinError = useAppSelector((s) => s.auth.signinError);

  useEffect(() => {
    if (didSignedIn !== '') {
      const likedStory = localStorage.getItem('likedStory');
      if (likedStory) {
        navigate(likedStory);
      } else {
        navigate('/profile');
      }
    }
  }, [didSignedIn, navigate]);

  useEffect(() => {
    if (mail === '' && didSignedUp !== '' && typeof didSignedUp === 'object') {
      setMail((didSignedUp as any).mail || '');
    }
  }, [didSignedUp, mail]);

  useEffect(() => {
    if (signinError) offLoader();
  }, [signinError, offLoader]);

  const onSigninHandler = () => {
    if (mail !== '' && password !== '') {
      onLoader();
      dispatch(signin({ data: { mail: mail.toLowerCase(), password } }));
    } else {
      setFieldsNotFilled(true);
      setTimeout(() => setFieldsNotFilled(false), 3000);
    }
  };

  return (
    <div className="xp-auth-form-group my-auto">
      <h4>Welcome back to shareXP</h4>
      {fieldsNotFilled && <Popup type="alert-danger" text="Please fill all fields" />}
      {signinError && <Popup type="alert-danger" text="MailID or password is wrong" />}
      <div className="xp-auth-form">
        <div className="xp-auth-input">
          <label htmlFor="mail">Your mail id</label>
          <input
            type="email"
            placeholder="username@gmail.com"
            id="mail"
            value={mail}
            autoComplete="off"
            onChange={(e) => setMail(e.target.value)}
            style={signinError ? { borderColor: '#ee3902' } : undefined}
          />
          {signinError && <span className="xp-error">Wrong mailID</span>}
        </div>
        <div className="xp-auth-input">
          <label>Password</label>
          <div className="xp-auth-password-wrapper" style={signinError ? { borderColor: '#ee3902' } : undefined}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="password"
              value={password}
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
            />
            <span onClick={() => setShowPassword(!showPassword)} style={{ cursor: 'pointer', padding: '0 8px' }}>
              {showPassword ? 'Hide' : 'Show'}
            </span>
          </div>
          {signinError && <span className="xp-error">Wrong Password</span>}
        </div>
        <div className="text-center">
          <button className="btn xp-btn-primary" onClick={onSigninHandler} disabled={loader}>
            {loader ? <i className="bx bx-loader-alt bx-spin" /> : 'Sign in to my account'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(SignIn);
