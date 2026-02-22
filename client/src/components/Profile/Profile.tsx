import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchProfile } from '../../store/slices/profile.slice';
import { logout } from '../../store/slices/auth.slice';
import { config } from '../../utils/constants';
import Popup from '../common/Popup';
import Modal from '../common/Modal';
import CustomAvatar from '../common/CustomAvatar';
import MyStories from './MyStories';
import Edit from './Edit';
import FollowingTags from './FollowingTags';
import DangerZone from './DangerZone';
import { deleteAccount } from '../../store/slices/auth.slice';
import './Profile.scss';

const Profile: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('myStories');
  const [confirmation, setConfirmation] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const myStories = useAppSelector((s) => s.profile.myStories);
  const publishedStory = useAppSelector((s) => s.story.publishedStory);
  const userDetails = useAppSelector((s) => s.profile.userDetails);
  const updatedProfile = useAppSelector((s) => s.profile.updatedProfile);
  const didStoryDeleted = useAppSelector((s) => s.profile.didStoryDeleted);
  const errorOnAccountDeletion = useAppSelector((s) => s.auth.errorOnAccountDeletion);
  const didStoryUpdated = useAppSelector((s) => s.story.didStoryUpdated);

  useEffect(() => {
    if (!myStories || !userDetails || didStoryUpdated) {
      dispatch(fetchProfile());
    }
  }, [publishedStory, didStoryDeleted, didStoryUpdated, dispatch, myStories, userDetails]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  let tab: React.ReactNode;
  if (currentTab === 'myStories') {
    tab = <MyStories myStories={myStories} onClick={(story) => navigate(`/viewstory/${story._id}/${story.uid}`)} />;
  } else if (currentTab === 'Edit Profile') {
    tab = <Edit userDetails={userDetails} />;
  } else if (currentTab === 'logout') {
    tab = (
      <div className="xp-profile-logout text-center">
        <h4>Are you sure to logout?</h4>
        <button className="xp-btn-primary" onClick={handleLogout}>Logout</button>
      </div>
    );
  } else if (currentTab === 'Danger Zone') {
    tab = <DangerZone onClick={() => setConfirmation(true)} />;
  } else if (currentTab === 'Following Tags') {
    tab = <FollowingTags userDetails={userDetails} />;
  }

  return (
    <div className="xp-profile">
      <div className="container-fluid xp-profile-img-bg">
        <div className="d-block xp-profile-img text-center">
          {userDetails?.avatar ? (
            <img src={userDetails.avatar} alt={config.imgAlt} />
          ) : (
            <div className="xp-cutom-avatar"><CustomAvatar /></div>
          )}
        </div>
      </div>
      <div className="d-block xp-profile-title text-center">
        <h1>{userDetails?.sureName}</h1>
        <h6>@{userDetails?.userName}</h6>
        {userDetails?.description && <p><span>"</span> {userDetails.description} <span>"</span></p>}
      </div>
      <div className="xp-profile-activity">
        <div className="row">
          <div className="col-md-12">
            <div className="xp-profile-tabs-mobile">
              <h5>Profile</h5>
              <div className="dropdown">
                <button className="xp-btn-dropdown xp-btn-secondary" type="button" data-toggle="dropdown">
                  <span>{currentTab}</span><i className="bx bxs-down-arrow ml-2" />
                </button>
                <div className="dropdown-menu">
                  <p className="mx-4 my-2" onClick={() => setCurrentTab('myStories')}>My Stories</p>
                  <p className="mx-4 my-2" onClick={() => setCurrentTab('Following Tags')}>Following Tags</p>
                  <p className="mx-4 my-2" onClick={() => setCurrentTab('Edit Profile')}>Edit Profile</p>
                  <p className="mx-4 my-2" onClick={() => setCurrentTab('logout')}>Logout</p>
                  <p className="mx-4 my-2" onClick={() => setCurrentTab('Danger Zone')}>Danger Zone</p>
                </div>
              </div>
            </div>
            <div className="xp-profile-tabs">
              <ul className="nav nav-tabs">
                {['myStories', 'Following Tags', 'Edit Profile', 'logout', 'Danger Zone'].map((tab) => (
                  <li className="nav-item" key={tab}>
                    <p
                      className={`nav-link ${currentTab === tab ? 'active' : ''}`}
                      style={currentTab === tab ? { color: '#8e27f6' } : undefined}
                      onClick={() => setCurrentTab(tab)}
                    >
                      {tab === 'myStories' ? 'My Stories' : tab === 'logout' ? 'Logout' : tab}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div>{tab}</div>
            {publishedStory !== '' && <Popup type="alert-success" text="Hurray!! your story published" />}
            {updatedProfile !== '' && <Popup type="alert-success" text="Profile updated, refresh to see updated details" />}
            {didStoryDeleted && <Popup type="alert-success" text="One Story Deleted" />}
            {errorOnAccountDeletion && <Popup type="alert-danger" text="Something went wrong on account deletion, try again" />}
            {didStoryUpdated && <Popup type="alert-success" text="Story updated successfully!" />}
            {confirmation && (
              <Modal
                text="Are you sure to quit shareXP?"
                pri="Delete"
                secHandler={() => setConfirmation(false)}
                priHandler={() => dispatch(deleteAccount())}
                backDropHandler={() => setConfirmation(false)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
