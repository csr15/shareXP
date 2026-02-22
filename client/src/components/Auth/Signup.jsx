import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";

import showIcon from "../../Assets/icons/xp-view.svg";
import hideIcon from "../../Assets/icons/xp-password.svg";
import { config } from "../../utilities/constants/constants";
import * as actions from "../../store";
import Popup from "../Popup/Popup";

const Signup = ({ onLoader, loader, offLoader }) => {
  const [userName, setUserName] = useState("");
  const [sureName, setSureName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [didFieldsnotFilled, setDidFieldsnotFilled] = useState(false);
  const [isMailError, setIsMailError] = useState(false);
  const [isSurenameError, setIsSurenameError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);

  React.useEffect(() => {

    return () => {
      offLoader();
    }
  }, [])

  //mapStatetoProps
  const state = useSelector((state) => {
    return {
      userNameValidation: state.auth.isUserNameValid,
      isMailValid: state.auth.isMailValid,
      signupError: state.auth.signupError,
    };
  });

  //mapDispatchToProps
  const dispatch = useDispatch();
  const mapDispatch = {
    checkuserName: (userName) =>
      dispatch(
        actions.userNameHandler({
          userName: userName,
        })
      ),
    checkMail: (mail) => dispatch(actions.mailHandler(mail)),
  };

  const onUserNameHandler = () => {
    mapDispatch.checkuserName(userName);
  };

  const mailHandler = (e) => {
    if (mail.indexOf("@") !== -1) {
      mapDispatch.checkMail(mail);
      setIsMailError(false);
    } else {
      setIsMailError(true);
    }
  };

  const sureNameHandler = (e) => {
    if (sureName !== "")
      if (/^[a-zA-Z ]+$/.test(e.target.value)) {
        setIsSurenameError(false);
      } else {
        setIsSurenameError(true);
      }
  };

  const passwordHandler = (e) => {
    if (password !== "")
      if (e.target.value.length < 8) {
        setIsPasswordError(true);
      } else {
        setIsPasswordError(false);
      }
  };

  const signupHandler = () => {
    if (userName !== "" && sureName !== "" && mail !== "" && password !== "") {
      if (
        state.userNameValidation.length === 0 &&
        !isMailError &&
        !isPasswordError &&
        !isSurenameError
      ) {
        onLoader();
        dispatch(
          actions.signupHandler({
            data: {
              userName: userName,
              sureName: sureName,
              mail: mail.toLowerCase(),
              password: password,
            },
          })
        );
      }
    } else {
      setDidFieldsnotFilled(true);
    }
  };

  return (
    <div className="xp-auth-form-group my-auto">
      <h4>Welcome to shareXP</h4>
      {didFieldsnotFilled && (
        <Popup
          type="alert-danger"
          text="Please fill all fields to create an account 👀"
        />
      )}
      {state.signupError && (
        <Popup
          type="alert-danger"
          text="Something went wrong, Please try again👀"
        />
      )}
      <div className="xp-auth-form">
        <div className="xp-auth-input">
          <label htmlFor="mail">
            User name <span>(can include symbols and numbers)</span>
          </label>
          <input
            type="text"
            placeholder="john_doe"
            id="userName"
            name="userName"
            value={userName}
            autoComplete="off"
            autoCapitalize="off"
            onChange={(e) => setUserName(e.target.value)}
            onBlur={onUserNameHandler}
          />
          {state.userNameValidation !== null ? (
            state.userNameValidation.length === 0 ? (
              <span className="xp-error text-success">username is available</span>
            ) : (
              <span className="xp-error">username is already taken</span>
            )
          ) : null}
        </div>
        <div className="xp-auth-input">
          <label htmlFor="mail">
            Name <span>(only letters)</span>
          </label>
          <input
            type="text"
            placeholder="John Doe"
            id="sureName"
            name="sureName"
            value={sureName}
            autoComplete="off"
            autoCapitalize="off"
            onChange={(e) => setSureName(e.target.value)}
            onBlur={sureNameHandler}
          />
          {isSurenameError && (
            <span className="xp-error">Name must contain only letters</span>
          )}
        </div>
        <div className="xp-auth-input">
          <label htmlFor="mail">Your mail id</label>
          <input
            type="mail"
            placeholder="johndoe@example.com"
            id="mail"
            name="mail"
            value={mail}
            autoComplete="off"
            autoCapitalize="off"
            onChange={(e) => setMail(e.target.value)}
            onBlur={mailHandler}
          />
          {isMailError && (
            <span className="xp-error">Enter a valid mail address</span>
          )}
          {state.isMailValid !== null ? (
            state.isMailValid.length !== 0 ? (
              <span className="xp-error">
                Entered mail id is already in use
              </span>
            ) : (
              <span className="xp-error text-success">mailID is valid</span>
            )
          ) : null}
        </div>
        <div className="xp-auth-input">
          <label htmlFor="mail">
            Password <span>(atleast 8 characters)</span>{" "}
          </label>
          <div className="xp-auth-password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={passwordHandler}
              autoComplete="off"
            />
            {showPassword ? (
              <img
                src={showIcon}
                alt={config.imgAlt}
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <img
                src={hideIcon}
                alt={config.imgAlt}
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>
          {isPasswordError && (
            <span className="xp-error">
              Password length should be minimum 8{" "}
            </span>
          )}
        </div>
        <div className="text-center">
          <button className="btn xp-btn-primary" onClick={signupHandler}>
            {loader ? (
              <i className="bx bx-loader-alt bx-spin"></i>
            ) : (
              "create an account"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Signup);
