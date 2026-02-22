import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { Notifications } from '../common/Notifications';
import BackDrop from '../common/BackDrop';
import './Navigation.scss';

const Navigation: React.FC = () => {
  const [toggleMobileNav, setToggleMobileNav] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);

  const state = useAppSelector((s) => ({
    didPublished: s.story.publishedStory,
    authState: s.auth.authState,
    userDetails: s.profile.userDetails,
    notifications: s.profile.notifications,
  }));

  const navigate = useNavigate();

  return (
    <div className="xp-nav">
      <nav className="navbar navbar-expand-lg">
        <a href="/">
          <div className="navbar-brand">
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
              {state.notifications && state.notifications.length > 0 && <span className="len" />}
              <i className="bx bx-bell" />
            </span>
          )}
          <button
            className="navbar-toggler my-auto"
            type="button"
            onClick={() => setToggleMobileNav((cur) => !cur)}
          >
            {toggleMobileNav ? (
              <i className="bx bx-x" style={{ color: '#FFFFFF' }} />
            ) : (
              <i className="bx bx-menu-alt-right" />
            )}
          </button>
        </div>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <p onClick={() => navigate('/')}>Stories</p>
            </li>
            <li className="nav-item" onClick={() => navigate('/search')}>
              <p>Search</p>
            </li>
            <li className="nav-item" onClick={() => navigate('/help')}>
              <p>Help</p>
            </li>
            {state.authState ? (
              <>
                <li className="nav-item" onClick={() => navigate('/profile')}>
                  <p>Profile</p>
                </li>
                <li className="nav-item" onClick={() => setOpenNotification(true)}>
                  {state.notifications && state.notifications.length > 0 && <span className="len" />}
                  <i className="bx bxs-bell" />
                </li>
              </>
            ) : (
              <li className="nav-item m-1" onClick={() => navigate('/auth')}>
                <button className="xp-btn-secondary" style={{ border: 'none' }}>Login</button>
              </li>
            )}
            <li className="nav-item m-1" onClick={() => navigate('/publish')}>
              <button className="xp-btn-secondary" disabled={state.didPublished !== ''}>
                share experience
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <div className="xp-nav-mobile-wrapper">
        {toggleMobileNav && <BackDrop clickHandler={() => setToggleMobileNav(false)} />}
        <div
          className="xp-nav-mobile-list"
          style={toggleMobileNav ? { left: '0%', opacity: 1 } : { left: '-100%', opacity: 0 }}
        >
          <p onClick={() => { setToggleMobileNav(false); navigate('/'); }}>Stories</p>
          <p onClick={() => { setToggleMobileNav(false); navigate('/search'); }}>Search</p>
          <p onClick={() => { setToggleMobileNav(false); navigate('/help'); }}>Help</p>
          {state.authState ? (
            <p onClick={() => { setToggleMobileNav(false); navigate('/profile'); }}>Profile</p>
          ) : (
            <button className="xp-btn-secondary" onClick={() => { setToggleMobileNav(false); navigate('/auth'); }}>
              LOGIN
            </button>
          )}
          <button className="xp-btn-primary" onClick={() => { setToggleMobileNav(false); navigate('/publish'); }}>
            Share experience
          </button>
        </div>
      </div>

      {openNotification && state.userDetails && (
        <div className="xp-notify">
          <Notifications
            closeNotification={() => setOpenNotification(false)}
            viewPropHandler={(storyId: string, authorId: string) => {
              setOpenNotification(false);
              navigate(`/viewstory/${storyId}/${authorId}`);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default React.memo(Navigation);
