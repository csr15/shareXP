import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import GoogleLogin from "react-google-login";

import "./Auth.css";
import Signin from "./Signin";
import Signup from "./Signup";
import Popup from "../Popup/Popup";
import * as actions from "../../store";

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);

  //mapStateToProps
  const state = useSelector((state) => {
    return {
      didSignedUp: state.auth.didSignedUp,
      didGoogleAuthed: state.auth.googleAuth,
    };
  });
  if (state.didSignedUp !== "" && isSignup === true) {
    setIsSignup(false);
  }

  const dispatch = useDispatch();
  const onGoogleSignup = (response) => {
    dispatch(actions.googleAuth(response));
  };

  const history = useHistory();
  const likedStory = localStorage.getItem("likedStory");
  if (state.didGoogleAuthed !== "" && likedStory === null) {
    history.push("/");
  } else if (state.didGoogleAuthed !== "" && likedStory !== "") {
    history.push(likedStory);
    localStorage.removeItem('likedStory')
  }

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
                className={`nav-link ${!isSignup && "active"}`}
                style={!isSignup ? { borderBottomColor: "#FCA311" } : null}
                href="#"
                onClick={() => setIsSignup(false)}
              >
                Signin
              </p>
            </li>
            <li className="nav-item">
              <p
                className={`nav-link ${isSignup && "active"}`}
                style={isSignup ? { borderBottomColor: "#FCA311" } : null}
                onClick={() => setIsSignup(true)}
              >
                signup
              </p>
            </li>
          </ul>
          {isSignup ? <Signup /> : <Signin />}
          <div className="text-center m-3">
            <p>Or login with</p>
            <GoogleLogin
              clientId="419326780272-n2ti7qe7onojrlmrecfvmj7ll8paa1fk.apps.googleusercontent.com"
              buttonText="Login with Google"
              onSuccess={onGoogleSignup}
              onFailure={(err) => console.log(err)}
              cookiePolicy={`single_host_origin`}
            />
          </div>
        </div>
      </div>
      {state.didSignedUp && (
        <Popup type="alert-success" text="Account created successfully! 🚀" />
      )}
    </div>
  );
};

export default Auth;
