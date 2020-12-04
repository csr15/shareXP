import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import "./Profile.css";
import xpAvatar from "../../Assets/icons/xp-avatar.svg";
import * as actions from "../../store";
import Popup from "../Popup/Popup";
import MyStories from "./MyStories";
import Edit from "./Edit";
import Logout from "./Logout";
import DangerZone from "./DangerZone";
import FollowingTags from "./FollowingTags";
import { config } from "../../utilities/constants/constants";

export default function Profile() {
  const [currentTab, setCurrentTab] = useState("myStories");

  const history = useHistory();

  //mapStateToProps
  const state = useSelector((state) => {
    return {
      myStories: state.profile.myStories,
      didPublished: state.publish.story,
      userDetails: state.profile.userDetails,
      updatedProfile: state.profile.updatedProfile,
      didStoryDeleted: state.profile.didStoryDeleted,
      errorOnAccountDeletion: state.auth.errorOnAccountDeletion,
      didStoryUpdated: state.publish.didStoryUpdated,
    };
  });

  //mapDispatchToProps
  const dispatch = useDispatch();
  const mapDispatchToProps = {
    fetchProfileDetails: () => dispatch(actions.profileHandler()),
    updatedProfile: (data) => dispatch(actions.updateProfileHandler(data)),
    logouthandler: () => dispatch(actions.logout()),
    deleteAccount: () => dispatch(actions.deleteAccount()),
  };

  console.log(state.didStoryUpdated)
  useEffect(() => {
    if (state.myStories === "" || state.userDetails === "" || state.didStoryUpdated) {
      mapDispatchToProps.fetchProfileDetails();
    }
  }, [state.didPublished, state.didStoryDeleted, state.didStoryUpdated]);

  const setLogoutHandler = () => {
    mapDispatchToProps.logouthandler();
    history.push("/");
  };
  let tab = "";
  if (currentTab === "myStories") {
    tab = (
      <MyStories
        onClick={(story) =>
          history.push(`/viewstory/${story._id}/${story.uid}`)
        }
        myStories={state.myStories}
      />
    );
  } else if (currentTab === "Edit Profile") {
    tab = <Edit state={{ userDetails: state.userDetails }} />;
  } else if (currentTab === "logout") {
    tab = <Logout logoutHandler={setLogoutHandler} />;
  } else if (currentTab === "Danger Zone") {
    tab = <DangerZone onClick={() => mapDispatchToProps.deleteAccount()} />;
  } else if (currentTab === "Following Tags") {
    tab = <FollowingTags userDetails={state.userDetails} />;
  }

  return (
    <div className="xp-profile">
      <div className="container-fluid xp-profile-img-bg">
        <div className="d-block xp-profile-img text-center">
          <img
            src={state.userDetails.avatar ? state.userDetails.avatar : xpAvatar}
            alt={config.imgAlt}
          />
        </div>
      </div>
      <div className="d-block xp-profile-title text-center">
        <h1>{state.userDetails.sureName}</h1>
        <h6>@{state.userDetails.userName}</h6>
        {state.userDetails.description !== "" && (
          <p>
            <span>“</span> {state.userDetails.description} <span>”</span>
          </p>
        )}
      </div>
      <div className="xp-profile-activity">
        <div className="row">
          <div className="col-md-12">
            <div className="xp-profile-tabs-mobile">
              <h5>Profile</h5>
              <div className="dropdown">
                <button
                  className="xp-btn-dropdown xp-btn-secondary"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                >
                  <span>{currentTab}</span>
                  <i className="bx bxs-down-arrow ml-2"></i>
                </button>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <p
                    className="mx-4 my-2"
                    onClick={() => setCurrentTab("myStories")}
                  >
                    My Stories
                  </p>
                  <p
                    className="mx-4 my-2"
                    onClick={() => setCurrentTab("Following Tags")}
                  >
                    Following Tags
                  </p>
                  <p
                    className="mx-4 my-2"
                    onClick={() => setCurrentTab("Edit Profile")}
                  >
                    Edit Profile
                  </p>
                  <p
                    className="mx-4 my-2"
                    onClick={() => setCurrentTab("logout")}
                  >
                    Logout
                  </p>
                  <p
                    className="mx-4 my-2"
                    onClick={() => setCurrentTab("Danger Zone")}
                  >
                    Danger Zone
                  </p>
                </div>
              </div>
            </div>
            <div className="xp-profile-tabs">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <p
                    style={
                      currentTab === "myStories" ? { color: "#8e27f6" } : null
                    }
                    className={`nav-link ${
                      currentTab === "myStories" && "active"
                    }`}
                    href="#"
                    onClick={() => setCurrentTab("myStories")}
                  >
                    My stories
                  </p>
                </li>
                <li className="nav-item">
                  <p
                    className={`nav-link ${
                      currentTab === "Following Tags" && "active"
                    }`}
                    href="#"
                    onClick={() => setCurrentTab("Following Tags")}
                  >
                    Following Tags
                  </p>
                </li>
                <li className="nav-item">
                  <p
                    className={`nav-link ${
                      currentTab === "editProfile" && "active"
                    }`}
                    href="#"
                    onClick={() => setCurrentTab("Edit Profile")}
                  >
                    Edit profile
                  </p>
                </li>
                <li className="nav-item">
                  <p
                    className={`nav-link ${
                      currentTab === "logout" && "active"
                    }`}
                    href="#"
                    onClick={() => setCurrentTab("logout")}
                  >
                    Logout
                  </p>
                </li>
                <li className="nav-item">
                  <p
                    className={`nav-link ${
                      currentTab === "dangerZone" && "active"
                    }`}
                    onClick={() => setCurrentTab("Danger Zone")}
                  >
                    Danger Zone
                  </p>
                </li>
              </ul>
            </div>
            <div>{tab}</div>
            {state.didPublished !== "" && (
              <Popup
                type="alert-success"
                text={"Hurray!! your story published 🚀"}
              />
            )}
            {state.updatedProfile !== "" && (
              <Popup
                type="alert-success"
                text={"Profile updated 🚀, refresh to see updated details"}
              />
            )}
            {state.isErrorOnPofileUpdation && (
              <Popup
                type="alert-danger"
                text={
                  "Oops!, Problem on updatingyur profile, please try again 🥴"
                }
              />
            )}
            {state.didProfileUpdated && (
              <Popup type="alert-success" text={"Profile updated 🚀"} />
            )}
            {state.didStoryDeleted && (
              <Popup type="alert-success" text={"One Story Deleted 😕"} />
            )}
            {state.isErrorOnDeletingStory && (
              <Popup
                type="alert-danger"
                text={"Problem on deleting story, try again 🥴"}
              />
            )}
            {state.isErrorOnUnFollow && (
              <Popup
                type="alert-danger"
                text={"Problem on unfollowing tag,Please try again 🥴"}
              />
            )}

            {state.errorOnAccountDeletion && (
              <Popup
                type="alert-danger"
                text={"Something went wrong on account deletin, try again 🥴"}
              />
            )}

            {state.didStoryUpdated && (
              <Popup
                type="alert-success"
                text={"Story updated successfully!"}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
