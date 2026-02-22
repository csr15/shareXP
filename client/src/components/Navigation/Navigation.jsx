import React, { useState } from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";

import "./Navigation.css";
import Logo from "../../Assets/icons/Logo.svg";
import { config } from "../../utilities/constants/constants";
import { Notifications } from "../Notifications/Notifications";
import BackDrop from "../BackDrop/BackDrop";

const Navigation = React.memo(() => {
  const [toggleMobileNav, setToggleMobileNav] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);

  //mapStateToProps
  const state = useSelector((state) => {
    return {
      didPublished: state.publish.story,
      authState: state.auth.authState,
      myStories: state.profile.myStories,
      userDetails: state.profile.userDetails,
      notifications: state.profile.notifications,
    };
  });

  const history = useHistory();

  return (
    <div className="xp-nav">
      <nav className="navbar navbar-expand-lg">
        <a href="/">
          <div className="navbar-brand">
            <img
              src={Logo}
              alt={config.imgAlt}
              className="img-responsive my-auto"
            />
            <span className="my-auto">shareXP</span>
          </div>
        </a>
        <div className="navbar-actions my-auto">
          {state.authState && (
            <span
              className="bell"
              onClick={() => {
                setToggleMobileNav(false);
                setOpenNotification(true);
              }}
            >
              {state.notifications.length > 0 ? (
                <span className="len"></span>
              ) : null}
              <i className="bx bx-bell"></i>{" "}
            </span>
          )}

          <button
            className="navbar-toggler my-auto"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setToggleMobileNav((curNav) => !curNav)}
          >
            {toggleMobileNav ? (
              <i
                className="bx bx-x"
                style={toggleMobileNav ? { color: "#FFFFFF" } : null}
              ></i>
            ) : (
              <i className="bx bx-menu-alt-right"></i>
            )}
          </button>
        </div>

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
                  className="nav-item"
                  onClick={() => setOpenNotification(true)}
                >
                  {state.notifications.length > 0 ? (
                    <span className="len"></span>
                  ) : null}
                  <i className="bx bxs-bell"></i>
                </li>
              </>
            ) : (
              <li
                className="nav-item m-1"
                onClick={() => history.push("/auth")}
              >
                <button className="xp-btn-secondary" style={{ border: "none" }}>
                  Login
                </button>
              </li>
            )}
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
          </ul>
        </div>
      </nav>
      <div className="xp-nav-mobile-wrapper">
        {toggleMobileNav && (
          <BackDrop clickHandler={() => setToggleMobileNav(false)} />
        )}
        <div
          className="xp-nav-mobile-list"
          style={
            toggleMobileNav
              ? { left: "0%", opacity: 1 }
              : { left: "-100%", opacity: 0 }
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
            </>
          ) : (
            <button
              className="xp-btn-secondary"
              onClick={() => {
                setToggleMobileNav(false);
                history.push("/auth");
              }}
            >
              LOGIN
            </button>
          )}
          <button
            className="xp-btn-primary"
            onClick={() => {
              setToggleMobileNav(false);
              history.push("/publish");
            }}
          >
            Share experience
          </button>
        </div>
      </div>

      {/* Notifications */}
      {openNotification && state.userDetails ? (
        <div className="xp-notify">
          <Notifications
            userDetails={state.userDetails}
            closeNotification={() => setOpenNotification(false)}
            viewPropHandler={(storyId, authorId) => {
              setOpenNotification(false);
              history.push(`/viewstory/${storyId}/${authorId}`);
            }}
          />
        </div>
      ) : null}
    </div>
  );
});

export default Navigation;
