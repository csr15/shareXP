import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchTagStories } from '../../store/slices/search.slice';
import { fetchProfile } from '../../store/slices/profile.slice';
import { profileApi } from '../../api/profile.api';
import VTStoryView from './VTStoryView';
import VTScreenSkeleton from '../common/VTScreenSkeleton';
import Popup from '../common/Popup';
import './TagStories.scss';

const TagStories: React.FC = () => {
  const [didFollowed, setDidFollowed] = useState(false);
  const [didUnFollowed, setDidUnFollowed] = useState(false);
  const [followError, setFollowError] = useState(false);
  const [unfollowError, setUnfollowError] = useState(false);
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();
  const { tagName } = useParams<{ tagName: string }>();
  const dispatch = useAppDispatch();

  const tagStories = useAppSelector((s) => s.search.tagStories);
  const searchTagName = useAppSelector((s) => s.search.tagName);
  const userDetails = useAppSelector((s) => s.profile.userDetails);
  const authState = useAppSelector((s) => s.auth.authState);

  useEffect(() => {
    if (tagName) {
      dispatch(fetchTagStories(tagName));
    }
    if (!userDetails) {
      dispatch(fetchProfile());
    }
  }, [tagName, userDetails, dispatch]);

  const followHandler = async () => {
    setLoader(true);
    try {
      const uid = localStorage.getItem('uid') || '';
      await profileApi.followTag(uid, searchTagName);
      setDidFollowed(true);
      setDidUnFollowed(false);
    } catch {
      setFollowError(true);
      setTimeout(() => setFollowError(false), 3000);
    }
    setLoader(false);
  };

  const unfollowHandler = async () => {
    setLoader(true);
    try {
      const uid = localStorage.getItem('uid') || '';
      await profileApi.unFollowTag(uid, searchTagName);
      setDidUnFollowed(true);
      setDidFollowed(false);
    } catch {
      setUnfollowError(true);
      setTimeout(() => setUnfollowError(false), 3000);
    }
    setLoader(false);
  };

  const isFollowing = userDetails?.following?.includes(tagName || '') && !didUnFollowed;
  const showUnfollow = isFollowing || (didFollowed && !didUnFollowed);

  return (
    <div className="xp-tag__stories">
      {tagStories ? (
        <>
          <div className="xp-tag__stories-details">
            <h1>#{searchTagName}</h1>
            {authState && (
              <button className="btn xp-btn-follow" onClick={showUnfollow ? unfollowHandler : followHandler} disabled={loader}>
                {loader ? 'Updating..' : showUnfollow ? 'Unfollow' : 'Follow'}
              </button>
            )}
          </div>
          {tagStories.map((el) => (
            <VTStoryView key={el._id} story={el} onClick={() => navigate(`/viewstory/${el._id}/${el.uid}`)} />
          ))}
        </>
      ) : (
        <>
          <VTScreenSkeleton />
          <VTScreenSkeleton />
        </>
      )}
      {followError && <Popup type="alert-danger" text={`Problem on following ${searchTagName}`} />}
      {unfollowError && <Popup type="alert-danger" text={`Problem unfollowing ${searchTagName}`} />}
    </div>
  );
};

export default TagStories;
