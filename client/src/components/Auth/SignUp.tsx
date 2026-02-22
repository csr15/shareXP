import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { signup, checkUserName, checkMail } from '../../store/slices/auth.slice';
import Popup from '../common/Popup';

interface SignUpProps {
  loader: boolean;
  onLoader: () => void;
  offLoader: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ loader, onLoader, offLoader }) => {
  const [userName, setUserName] = useState('');
  const [sureName, setSureName] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fieldsNotFilled, setFieldsNotFilled] = useState(false);
  const [isMailError, setIsMailError] = useState(false);
  const [isSurenameError, setIsSurenameError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);

  const dispatch = useAppDispatch();

  const userNameValidation = useAppSelector((s) => s.auth.isUserNameValid);
  const isMailValid = useAppSelector((s) => s.auth.isMailValid);
  const signupError = useAppSelector((s) => s.auth.signupError);

  useEffect(() => {
    return () => { offLoader(); };
  }, [offLoader]);

  const onUserNameBlur = () => {
    if (userName) dispatch(checkUserName(userName));
  };

  const onMailBlur = () => {
    if (mail.includes('@')) {
      dispatch(checkMail(mail));
      setIsMailError(false);
    } else {
      setIsMailError(true);
    }
  };

  const onSureNameBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (sureName && !/^[a-zA-Z ]+$/.test(e.target.value)) {
      setIsSurenameError(true);
    } else {
      setIsSurenameError(false);
    }
  };

  const onPasswordBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (password && e.target.value.length < 8) {
      setIsPasswordError(true);
    } else {
      setIsPasswordError(false);
    }
  };

  const handleSignup = () => {
    if (userName && sureName && mail && password) {
      if (
        userNameValidation &&
        userNameValidation.length === 0 &&
        !isMailError &&
        !isPasswordError &&
        !isSurenameError
      ) {
        onLoader();
        dispatch(signup({
          data: { userName, sureName, mail: mail.toLowerCase(), password },
        }));
      }
    } else {
      setFieldsNotFilled(true);
      setTimeout(() => setFieldsNotFilled(false), 3000);
    }
  };

  return (
    <div className="xp-auth-form-group my-auto">
      <h4>Welcome to shareXP</h4>
      {fieldsNotFilled && <Popup type="alert-danger" text="Please fill all fields to create an account" />}
      {signupError && <Popup type="alert-danger" text="Something went wrong, please try again" />}
      <div className="xp-auth-form">
        <div className="xp-auth-input">
          <label>User name <span>(can include symbols and numbers)</span></label>
          <input type="text" placeholder="john_doe" value={userName} autoComplete="off" onChange={(e) => setUserName(e.target.value)} onBlur={onUserNameBlur} />
          {userNameValidation !== null && (
            userNameValidation.length === 0
              ? <span className="xp-error text-success">username is available</span>
              : <span className="xp-error">username is already taken</span>
          )}
        </div>
        <div className="xp-auth-input">
          <label>Name <span>(only letters)</span></label>
          <input type="text" placeholder="John Doe" value={sureName} autoComplete="off" onChange={(e) => setSureName(e.target.value)} onBlur={onSureNameBlur} />
          {isSurenameError && <span className="xp-error">Name must contain only letters</span>}
        </div>
        <div className="xp-auth-input">
          <label>Your mail id</label>
          <input type="email" placeholder="johndoe@example.com" value={mail} autoComplete="off" onChange={(e) => setMail(e.target.value)} onBlur={onMailBlur} />
          {isMailError && <span className="xp-error">Enter a valid mail address</span>}
          {isMailValid !== null && (
            isMailValid.length !== 0
              ? <span className="xp-error">Entered mail id is already in use</span>
              : <span className="xp-error text-success">mailID is valid</span>
          )}
        </div>
        <div className="xp-auth-input">
          <label>Password <span>(at least 8 characters)</span></label>
          <div className="xp-auth-password-wrapper">
            <input type={showPassword ? 'text' : 'password'} placeholder="password" value={password} autoComplete="off" onChange={(e) => setPassword(e.target.value)} onBlur={onPasswordBlur} />
            <span onClick={() => setShowPassword(!showPassword)} style={{ cursor: 'pointer', padding: '0 8px' }}>
              {showPassword ? 'Hide' : 'Show'}
            </span>
          </div>
          {isPasswordError && <span className="xp-error">Password length should be minimum 8</span>}
        </div>
        <div className="text-center">
          <button className="btn xp-btn-primary" onClick={handleSignup} disabled={loader}>
            {loader ? <i className="bx bx-loader-alt bx-spin" /> : 'create an account'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
