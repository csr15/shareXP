import React from "react";
import Axios from "axios";
import Skeleton from "react-loading-skeleton";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

import "./Notifications.css";
import Popup from "../Popup/Popup";
import { config } from "../../utilities/constants/constants";
import * as actions from "../../store";
import BackDrop from "../BackDrop/BackDrop";

const NotificationCard = ({
  userName,
  content,
  createdAt,
  storyTitle,
  clearHandler,
  loader,
  viewStoryHandler,
}) => (
  <div className="xp-notification-card">
    <h6>
      <span>{userName}</span> {content}.
    </h6>
    <p className="title">{storyTitle}</p>
    <p className="xp-date">{moment(createdAt).fromNow()}</p>
    <div className="xp-notification-reaction">
      {/* <button className="btn xp-btn-outline view">View</button> */}
      <button
        className="btn xp-btn-notification"
        onClick={clearHandler}
        disabled={loader}
      >
        {loader ? "Clearing..!" : "Clear"}
      </button>
      <button className="btn xp-btn-notification" onClick={viewStoryHandler}>
        View
      </button>
    </div>
  </div>
);

const NotificationSkull = () => (
  <div className="xp-notification-skull">
    <Skeleton width={200} height={20} className="xp-notification-bone" />
    <Skeleton width={150} height={20} className="xp-notification-bone" />
  </div>
);

export const Notifications = ({ closeNotification, viewPropHandler }) => {
  const [
    errorOnClearNotification,
    setErrorOnClearNotification,
  ] = React.useState(false);
  const [cleared, setCleared] = React.useState(false);
  const [loader, setLoader] = React.useState("");

  const notifications = useSelector((state) => state.profile.notifications);

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(actions.getNotifications());
  }, [cleared]);

  //function to clear notification
  const clearNotificationHandler = async (storyId) => {
    setLoader(true);
    try {
      await Axios.patch(
        `${
          config.server_url
        }/profile/clearNotification/${storyId}/${localStorage.getItem("uid")}`
      );

      setCleared(true);
      setLoader(false);
      setTimeout(() => {
        setCleared(false);
      }, 3000);
    } catch (error) {
      setErrorOnClearNotification(true);
      setLoader(false);

      setTimeout(() => {
        setErrorOnClearNotification(false);
      }, 3000);
    }
  };

  return (
    <>
      <BackDrop clickHandler={closeNotification} />

      <div className="xp-notification">
        <div className="xp-notification-close">
          <i className="bx bx-x" onClick={closeNotification}></i>
        </div>
        <h5>
          <i className="bx bxs-bell"></i>Notifications
        </h5>
        <div
          className="xp-notification-layout"
          style={loader ? { opacity: 0.5, userSelect: "none" } : null}
        >
          <div
            className="xp-notification-loader"
            style={loader ? { display: "block" } : { display: "none" }}
          ></div>
          {notifications ? (
            notifications.length > 0 ? (
              notifications.map((el) => {
                return (
                  <NotificationCard
                    key={el._id}
                    userName={el.userName}
                    content={el.content}
                    createdAt={el.createdAt}
                    storyId={el.storyId}
                    uid={el.uid}
                    storyTitle={el.storyTitle}
                    viewStoryHandler={viewPropHandler.bind(
                      this,
                      el.storyId,
                      el.uid
                    )}
                    clearHandler={clearNotificationHandler.bind(this, el._id)}
                  />
                );
              })
            ) : (
              <p className="text-center m-3">No notifications</p>
            )
          ) : (
            <NotificationSkull />
          )}
          {errorOnClearNotification && (
            <Popup
              type="alert-danger"
              text="Problem on clearing notification"
            />
          )}
          {cleared && (
            <Popup type="alert-success" text="Notification cleared" />
          )}
        </div>
      </div>
    </>
  );
};
