import React, { useState } from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";

import "./Navigation.css";
import Logo from "../../Assets/icons/logo.svg";
import { config } from "../../utilities/constants/constants";

const Navigation = React.memo(() => {
  const [toggleMobileNav, setToggleMobileNav] = useState(false);

  //mapStateToProps
  const state = useSelector((state) => {
    return {
      didPublished: state.publish.story,
      authState: state.auth.authState,
    };
  });

  const history = useHistory();

  return (
    <div className="xp-nav">
      <nav className="navbar navbar-expand-lg">
        <a className="navbar-brand" href="/">
          <img src={Logo} alt={config.imgAlt} />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setToggleMobileNav((curNav) => !curNav)}
        >
          {toggleMobileNav ? (
            <i className="bx bx-x bx-md "></i>
          ) : (
            <i className="bx bx-menu-alt-right bx-md"></i>
          )}
        </button>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <p onClick={() => history.push("/")}>
                Stories <span className="sr-only">(current)</span>
              </p>
            </li>
            <li className="nav-item" onClick={() => history.push("/search")}>
              <p>search</p>
            </li>
            <li className="nav-item" onClick={() => history.push("/help")}>
              <p>Help</p>
            </li>
            {state.authState ? (
              <>
                <li
                  className="nav-item"
                  onClick={() => history.push("/profile")}
                >
                  <p>Profile</p>
                </li>
                <li
                  className="nav-item m-1"
                  onClick={() => history.push("/publish")}
                >
                  <button
                    className="xp-btn-secondary"
                    disabled={state.didPublished !== ""}
                  >
                    share experience
                  </button>
                </li>
              </>
            ) : (
              <li
                className="nav-item m-1"
                onClick={() => history.push("/auth")}
              >
                <button className="xp-btn-primary">Login</button>
              </li>
            )}
          </ul>
        </div>
      </nav>
      <div className="xp-nav-mobile-wrapper">
        <div
          className="xp-nav-mobile-list"
          style={
            toggleMobileNav
              ? { left: "0%", opacity: 1, display: "flex" }
              : { left: "-100%", opacity: 0, display: "none" }
          }
        >
          <p
            onClick={() => {
              setToggleMobileNav(false);
              history.push("/");
            }}
          >
            Stories
          </p>
          <p
            onClick={() => {
              setToggleMobileNav(false);
              history.push("/search");
            }}
          >
            Search
          </p>
          <p
            onClick={() => {
              setToggleMobileNav(false);
              history.push("/help");
            }}
          >
            Help
          </p>
          {state.authState ? (
            <>
              <p
                onClick={() => {
                  setToggleMobileNav(false);
                  history.push("/profile");
                }}
              >
                Profile
              </p>
              <button
                className="btn xp-btn-seconary"
                onClick={() => {
                  setToggleMobileNav(false);
                  history.push("/publish");
                }}
              >
                Share experience
              </button>
            </>
          ) : (
            <button
              className="btn xp-btn-seconary"
              onClick={() => {
                setToggleMobileNav(false);
                history.push("/auth");
              }}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
});

export default Navigation;
