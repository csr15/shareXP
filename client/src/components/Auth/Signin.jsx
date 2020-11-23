import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, withRouter } from "react-router";

import showIcon from "../../Assets/icons/xp-view.svg";
import hideIcon from "../../Assets/icons/xp-password.svg";
import { config } from "../../utilities/constants/constants";
import * as actions from "../../store";
import Popup from "../Popup/Popup";

const Signin = React.memo((props) => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [didFieldsnotFilled, setDidFieldsnotFilled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  //mapDispatchToPrps
  const dispatch = useDispatch();

  //mapStateToProps;
  const state = useSelector((state) => {
    return {
      didSignedIn: state.auth.didSignedIn,
      didSignedUp: state.auth.didSignedUp,
      signinError: state.auth.signinError,
    };
  });

  const onSigninHandler = () => {
    if (mail !== "" && password !== "") {
      dispatch(
        actions.signinHandler({
          data: {
            mail: mail.toLowerCase(),
            password: password,
          },
        })
      );
    } else {
      setDidFieldsnotFilled(true);
    }
  };

  const history = useHistory();
  const likedStory = localStorage.getItem("likedStory");
  if (state.didSignedIn !== "" && likedStory === null) {
    history.push("/profile");
  } else if (state.didSignedIn !== "" && likedStory !== "") {
    history.push(likedStory);
  }

  if (mail === "" && state.didSignedUp !== "") {
    setMail(state.didSignedUp.mail);
  }

  if (didFieldsnotFilled) {
    setTimeout(() => {
      setDidFieldsnotFilled(false);
    }, 3000);
  }

  return (
    <div className="xp-auth-form-group my-auto">
      <h4>Welcome back to shareXP</h4>
      {didFieldsnotFilled && (
        <Popup
          type="alert-danger"
          text="Please fill all fields to create an account 👀"
        />
      )}
      {state.signinError && (
        <Popup type="alert-danger" text="MailID or password is wrong 🤧" />
      )}

      <div className="xp-auth-form">
        <div className="xp-auth-input">
          <label htmlFor="mail">Your mail id</label>
          <input
            type="mail"
            placeholder="username@gmail.com"
            id="mail"
            name="mail"
            value={mail}
            autoComplete="off"
            autoCapitalize="off"
            onChange={(e) => setMail(e.target.value)}
            style={state.signinError ? { borderColor: "#ee3902" } : null}
          />
          {state.signinError ? (
            <span className="xp-error">Wrong mailID</span>
          ) : null}
        </div>
        <div className="xp-auth-input">
          <label htmlFor="mail">Password</label>
          <div
            className="xp-auth-password-wrapper"
            style={state.signinError ? { borderColor: "#ee3902" } : null}
          >
            <input
              type={showPassword ? "text" : "password"}
              placeholder="password"
              id="password"
              name="password"
              value={password}
              autoFocus={state.didSignedUp !== "" && true}
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
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
          {state.signinError ? (
            <span className="xp-error">Wrong Password</span>
          ) : null}
        </div>
        <div className="text-center">
          <button className="btn xp-btn-primary" onClick={onSigninHandler}>
            signin to my account
          </button>
        </div>
      </div>
    </div>
  );
});

export default withRouter(Signin);
