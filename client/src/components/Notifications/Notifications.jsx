import React from "react";
import Axios from "axios";
import Skeleton from "react-loading-skeleton";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

import "./Notifications.css";
import Popup from "../Popup/Popup";
import { config } from "../../utilities/constants/constants";
import * as actions from "../../store";

const NotificationCard = ({
  userName,
  content,
  createdAt,
  storyTitle,
  clearHandler,
  loader
}) => (
  <div className="xp-notification-card">
    <h6>
      <span>{userName}</span> {content}
    </h6>
    <p className="title">{storyTitle}</p>

    <div className="xp-notification-reaction">
      {/* <button className="btn xp-btn-outline view">View</button> */}
      <button className="btn xp-btn-outline clear" onClick={clearHandler} disabled={loader}>
        {loader ? "Clearing..!" : "Clear"}
      </button>
      <p>{moment(createdAt).fromNow()}</p>
    </div>
  </div>
);

const NotificationSkull = () => (
  <div className="xp-notification-skull">
    <Skeleton width={200} height={20} className="xp-notification-bone" />
    <Skeleton width={150} height={20} className="xp-notification-bone" />
  </div>
);

export const Notifications = ({ closeNotification }) => {
  const [
    errorOnClearNotification,
    setErrorOnClearNotification,
  ] = React.useState(false);
  const [cleared, setCleared] = React.useState(false);
  const [loader, setLoader] = React.useState(false);

  const notifications = useSelector((state) => state.profile.notifications);
  
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(actions.getNotifications());
  }, [cleared]);

  //function to clear notification
  const clearNotificationHandler = async (authorId) => {
    setLoader(true);
    try {
      await Axios.patch(
        `${
          config.server_url
        }/profile/clearNotification/${authorId}/${localStorage.getItem("uid")}`
      );

      setCleared(true);
      setLoader(false);
      setTimeout(() => {
        setCleared(false);
      }, 3000);
    } catch (error) {
      setErrorOnClearNotification(true);

      setTimeout(() => {
        setErrorOnClearNotification(false);
      }, 3000);
    }
  };
  return (
    <div className="xp-notification">
      <div className="xp-notification-close">
        <i className="bx bx-x" onClick={closeNotification}></i>
      </div>
      <h5>
        <i className="bx bxs-bell"></i>Notifications
      </h5>
      <div className="xp-notification-layout">
        {notifications ? (
          notifications.length > 0 ? (
            notifications.reverse().map((el) => {
              return (
                <NotificationCard
                  key={el._id}
                  userName={el.userName}
                  content={el.content}
                  createdAt={el.createdAt}
                  storyId={el.storyId}
                  uid={el.uid}
                  storyTitle={el.storyTitle}
                  loader={loader}
                  clearHandler={clearNotificationHandler.bind(this, el.uid)}
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
          <Popup type="alert-danger" text="Problem on clearing notification" />
        )}

        {cleared && <Popup type="alert-success" text="Notification cleared" />}
      </div>
    </div>
  );
};
