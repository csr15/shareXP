import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Skeleton from 'react-loading-skeleton';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchNotifications } from '../../store/slices/profile.slice';
import './Notifications.scss';
import { profileApi } from '../../api/profile.api';
import Popup from './Popup';
import BackDrop from './BackDrop';

interface NotificationsProps {
  closeNotification: () => void;
  viewPropHandler: (storyId: string, authorId: string) => void;
}

export const Notifications: React.FC<NotificationsProps> = ({ closeNotification, viewPropHandler }) => {
  const [errorOnClear, setErrorOnClear] = useState(false);
  const [cleared, setCleared] = useState(false);
  const [loader, setLoader] = useState(false);

  const notifications = useAppSelector((state) => state.profile.notifications);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [cleared, dispatch]);

  const clearHandler = async (notificationId: string) => {
    setLoader(true);
    try {
      const uid = localStorage.getItem('uid') || '';
      await profileApi.clearNotification(notificationId, uid);
      setCleared(true);
      setLoader(false);
      setTimeout(() => setCleared(false), 3000);
    } catch {
      setErrorOnClear(true);
      setLoader(false);
      setTimeout(() => setErrorOnClear(false), 3000);
    }
  };

  return (
    <>
      <BackDrop clickHandler={closeNotification} />
      <div className="xp-notification">
        <div className="xp-notification-close">
          <i className="bx bx-x" onClick={closeNotification} />
        </div>
        <h5><i className="bx bxs-bell" />Notifications</h5>
        <div className="xp-notification-layout" style={loader ? { opacity: 0.5 } : undefined}>
          {notifications ? (
            notifications.length > 0 ? (
              notifications.map((el) => (
                <div className="xp-notification-card" key={el._id}>
                  <h6><span>{el.userName}</span> {el.content}.</h6>
                  <p className="title">{el.storyTitle}</p>
                  <p className="xp-date">{moment(el.createdAt).fromNow()}</p>
                  <div className="xp-notification-reaction">
                    <button className="btn xp-btn-notification" onClick={() => clearHandler(el._id)} disabled={loader}>
                      {loader ? 'Clearing..!' : 'Clear'}
                    </button>
                    <button className="btn xp-btn-notification" onClick={() => viewPropHandler(el.storyId, el.authorId)}>
                      View
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center m-3">No notifications</p>
            )
          ) : (
            <div className="xp-notification-skull">
              <Skeleton width={200} height={20} />
              <Skeleton width={150} height={20} />
            </div>
          )}
          {errorOnClear && <Popup type="alert-danger" text="Problem on clearing notification" />}
          {cleared && <Popup type="alert-success" text="Notification cleared" />}
        </div>
      </div>
    </>
  );
};
