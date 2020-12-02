import React, { useState } from "react";
import { useDispatch } from "react-redux";
import imageCompression from "browser-image-compression";

import * as actions from "../../store";
import firebase from "../../firebase/base";
import Popup from "../Popup/Popup";
import Axios from "axios";
import { config } from "../../utilities/constants/constants";

export default function Edit({ state }) {
  const [editFb, setEditFb] = useState(false);
  const [editLinkedIn, setEditLinkedIn] = useState(false);
  const [editLink, setEditLink] = useState(false);
  const [editStatus, setEditStatus] = useState(false);
  const [editDesc, setEditDesc] = useState(false);
  const [description, setDescription] = useState("");
  const [workingStatus, setWorkingStatus] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarError, setAvatarError] = useState(false);
  const [socialLinks, setSocialLinks] = useState({
    facebook: "",
    linkedIn: "",
    link: "",
  });
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [isAvatarDeleted, setIsAvatarDeleted] = useState(false);
  const [fbLinkCheck, setFbLinkCheck] = useState(false);
  const [fbLinkError, setFbLinkError] = useState(false);
  const [linkedInLinkCheck, setLinkedInLinkCheck] = useState(false);
  const [linkedInLinkError, setLinkedInLinkError] = useState(false);
  const [externalLinkCheck, setExternalLinkCheck] = useState(false);
  const [externalLinkError, setExternalLinkError] = useState(false);
  //save profile handler
  const dispatch = useDispatch();
  const saveProfile = () => {
    const { facebook, linkedIn, link } = socialLinks;

    ((facebook) => {
      try {
        new URL(facebook);
      } catch (_) {
        console.log("invalid URL");
        return false;
      }
      return true;
    })(facebook);

    if (avatar) {
      setAvatarLoading(true);
      const options = {
        maxSizeMB: 5,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      };
      imageCompression(avatar, options)
        .then((imgURL) => {
          const storage = firebase.storage();
          storage
            .ref(`users/${localStorage.getItem("uid")}`)
            .put(imgURL)
            .then(() => {
              storage
                .ref(`users/${localStorage.getItem("uid")}`)
                .getDownloadURL()
                .then((url) => {
                  setAvatarLoading(false);
                  dispatch(
                    actions.updateProfileHandler({
                      description:
                        description !== ""
                          ? description
                          : state.userDetails.description,
                      socialLinks: {
                        facebook:
                          facebook !== ""
                            ? facebook
                            : state.userDetails.facebook,
                        linkedIn:
                          linkedIn !== ""
                            ? linkedIn
                            : state.userDetails.linkedIn,
                        link: link !== "" ? link : state.userDetails.link,
                      },
                      workingStatus:
                        workingStatus !== ""
                          ? workingStatus
                          : state.userDetails.workingStatus,
                      avatar: url,
                    })
                  );
                })
                .catch(() => {
                  setAvatarError(true);

                  setTimeout(() => {
                    setAvatarError(false);
                  });
                });
            })
            .catch(() => {
              setAvatarError(true);

              setTimeout(() => {
                setAvatarError(false);
              });
            });
        })
        .catch((err) => {
          setAvatarError(true);
        });
    } else {
      dispatch(
        actions.updateProfileHandler({
          description:
            description !== "" ? description : state.userDetails.description,
          socialLinks: {
            facebook: facebook !== "" ? facebook : state.userDetails.facebook,
            linkedIn: linkedIn !== "" ? linkedIn : state.userDetails.linkedIn,
            link: link !== "" ? link : state.userDetails.link,
          },
          workingStatus:
            workingStatus !== ""
              ? workingStatus
              : state.userDetails.workingStatus,
          avatar: state.userDetails.avatar,
        })
      );
    }
  };

  const deleteAvatar = async () => {
    try {
      await Axios.delete(
        `${config.server_url}/profile/deleteAvatar/${localStorage.getItem(
          "uid"
        )}`,
        {
          withCredentials: true,
        }
      );

      setIsAvatarDeleted(true);
    } catch (error) {
      setAvatarError(true);

      setTimeout(() => {
        setAvatarError(false);
      }, 3000);
    }
  };

  return (
    <div className="xp-profile-details">
      <div className="xp-profile-description">
        <h6>Summary</h6>
        <textarea
          name="description"
          id="description"
          autoComplete="false"
          autoCorrect="false"
          placeholder="Describe about you"
          value={editDesc ? description : state.userDetails.description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <div className="xp-desc-edit">
          {editDesc ? (
            <button
              className="xp-btn-secondary"
              onClick={() => setEditDesc(false)}
            >
              <i className="bx bx-x"></i>
            </button>
          ) : (
            <button
              className="xp-btn-secondary"
              onClick={() => setEditDesc(true)}
            >
              <i className="bx bx-edit-alt"></i>
            </button>
          )}
        </div>
      </div>
      <div className="xp-profile-status">
        <h6>Working status</h6>
        <div className="xp-wrapper">
          <input
            type="text"
            name="facebook"
            placeholder="eg: Student"
            autoCorrect="false"
            autoComplete="off"
            value={editStatus ? workingStatus : state.userDetails.workingStatus}
            onChange={(e) => setWorkingStatus(e.target.value)}
          />
          {editStatus ? (
            <button
              className="xp-btn-secondary"
              onClick={() => setEditStatus(false)}
            >
              <i className="bx bx-x"></i>
            </button>
          ) : (
            <button
              className="xp-btn-secondary"
              onClick={() => setEditStatus(true)}
            >
              <i className="bx bx-edit-alt"></i>
            </button>
          )}
        </div>
      </div>
      <div className="xp-profile-social_media">
        <h6>Social Links</h6>
        <div className="xp-wrapper">
          <div className="xp-facebook">
            <a href={state.userDetails.facebook}>
              <i className="bx bxl-facebook bx-md"></i>
            </a>
            <input
              type="text"
              name="facebook"
              placeholder="https://www.facebook.com/"
              autoCorrect="false"
              autoComplete="off"
              value={editFb ? socialLinks.facebook : state.userDetails.facebook}
              onPaste={(e) =>
                setSocialLinks({ ...socialLinks, facebook: e.target.value })
              }
              onChange={(e) =>
                setSocialLinks({ ...socialLinks, facebook: e.target.value })
              }
              onBlur={() => {
                if (socialLinks.facebook) {
                  try {
                    new URL(socialLinks.facebook);
                    setFbLinkCheck(true);
                  } catch (error) {
                    setFbLinkError(true);

                    setTimeout(() => {
                      setFbLinkError(false);
                    }, 3000);
                  }
                }
              }}
            />
          </div>
          {editFb ? (
            <button
              className="xp-btn-secondary"
              onClick={() => setEditFb(false)}
            >
              <i className="bx bx-x"></i>
            </button>
          ) : (
            <button
              className="xp-btn-secondary"
              onClick={() => setEditFb(true)}
            >
              <i className="bx bx-edit-alt"></i>
            </button>
          )}
        </div>
        <div className="xp-wrapper">
          <div className="xp-linked_in">
            <a href={state.userDetails.linkedIn}>
              <i className="bx bxl-linkedin bx-md"></i>
            </a>
            <input
              type="text"
              name="linkedIn"
              placeholder="linkedin.com/username"
              autoCorrect="false"
              autoComplete="off"
              value={
                editLinkedIn ? socialLinks.linkedIn : state.userDetails.linkedIn
              }
              onPaste={(e) =>
                setSocialLinks({ ...socialLinks, linkedIn: e.target.value })
              }
              onChange={(e) =>
                setSocialLinks({ ...socialLinks, linkedIn: e.target.value })
              }
              onBlur={() => {
                if (socialLinks.linkedIn) {
                  try {
                    new URL(socialLinks.linkedIn);
                    setLinkedInLinkCheck(true);
                  } catch (error) {
                    setLinkedInLinkError(true);

                    setTimeout(() => {
                      setLinkedInLinkError(false);
                    }, 3000);
                  }
                }
              }}
            />
          </div>
          {editLinkedIn ? (
            <button
              className="xp-btn-secondary"
              onClick={() => setEditLinkedIn(false)}
            >
              <i className="bx bx-x"></i>
            </button>
          ) : (
            <button
              className="xp-btn-secondary"
              onClick={() => setEditLinkedIn(true)}
            >
              <i className="bx bx-edit-alt"></i>
            </button>
          )}
        </div>
        <div className="xp-wrapper">
          <div className="xp-website">
            <a href={state.userDetails.link}>
              <i className="bx bx-link-external bx-md"></i>
            </a>
            <input
              type="url"
              name="userWeb"
              placeholder="https://www.portfolio.com"
              autoCorrect="false"
              autoComplete="off"
              value={editLink ? socialLinks.link : state.userDetails.link}
              onPaste={(e) =>
                setSocialLinks({ ...socialLinks, link: e.target.value })
              }
              onChange={(e) =>
                setSocialLinks({ ...socialLinks, link: e.target.value })
              }
              onBlur={() => {
                if (socialLinks.link) {
                  try {
                    new URL(socialLinks.link);
                    setExternalLinkCheck(true);
                  } catch (error) {
                    setExternalLinkError(true);

                    setTimeout(() => {
                      setExternalLinkError(false);
                    }, 3000);
                  }
                }
              }}
            />
          </div>
          {editLink ? (
            <button
              className="xp-btn-secondary"
              onClick={() => setEditLink(false)}
            >
              <i className="bx bx-x"></i>
            </button>
          ) : (
            <button
              className="xp-btn-secondary"
              onClick={() => setEditLink(true)}
            >
              <i className="bx bx-edit-alt"></i>
            </button>
          )}
        </div>
      </div>
      <div className="xp-profile-avatar">
        <h6>Change Avatar</h6>
        <div className="xp-profile-avatar-layout">
          <div className="xp-profile-avatar_wrapper">
            <label htmlFor="avatar">
              {(() => {
                if (avatar !== "" && !avatarLoading) {
                  return avatar.name;
                } else if (avatar !== "" && avatarLoading) {
                  return (
                    <span>
                      <i className="bx bx-loader-alt bx-spin mr-1"></i>Updating
                      avatar..
                    </span>
                  );
                } else {
                  return "Change Avatar";
                }
              })()}
              <input
                type="file"
                name="avatar"
                id="avatar"
                onChange={(e) => setAvatar(e.target.files[0])}
              />
            </label>
          </div>
          <div
            className="xp-profile-avatar_delete"
            style={
              state.userDetails.avatar === ""
                ? { pointerEvents: "none", opacity: 0.7 }
                : null
            }
          >
            <p onClick={deleteAvatar}>Delete avatar</p>
          </div>
        </div>
      </div>
      <div className="d-flex mt-3 justify-content-center">
        <button
          className="xp-btn-secondary mx-2"
          onClick={() => {
            setDescription("");
            setWorkingStatus("");
            setSocialLinks({ facebook: "", linkedIn: "", link: "" });
            setAvatar("");
          }}
        >
          cancel
        </button>
        <button className="xp-btn-primary mx-2" onClick={saveProfile}>
          save
        </button>

        {avatarError && (
          <Popup
            type="alert-danger"
            text="Something went wrong, please try again later"
          />
        )}

        {isAvatarDeleted && (
          <Popup type="alert-success" text="Avatar deleted" />
        )}

        {fbLinkError && (
          <Popup type="alert-danger" text="Invalid Facebook URL" />
        )}
        {linkedInLinkError && (
          <Popup type="alert-danger" text="Invalid LinkedIn URL" />
        )}
        {externalLinkError && <Popup type="alert-danger" text="Invalid  URL" />}
      </div>
    </div>
  );
}
