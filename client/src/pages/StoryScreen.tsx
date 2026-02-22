import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  fetchFollowingStories,
  fetchTopStories,
  fetchLatestStories,
} from '../store/slices/story.slice';
import Story from '../components/story/Story';
import Categories from '../components/search/Categories';
import AlsoLike from '../components/story/AlsoLike';
import StorySkeleton from '../components/common/StorySkeleton';

const StoryScreen: React.FC = () => {
  const [filter, setFilter] = useState('Most Popular');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const followingStories = useAppSelector((s) => s.story.followingStories);
  const topStories = useAppSelector((s) => s.story.topStories);
  const latestStories = useAppSelector((s) => s.story.latestStories);
  const authState = useAppSelector((s) => s.auth.authState);
  const userDetails = useAppSelector((s) => s.profile.userDetails);

  useEffect(() => {
    if (filter === 'Following' && !followingStories) {
      dispatch(fetchFollowingStories());
    }
    if (filter === 'Most Popular' && !topStories) {
      dispatch(fetchTopStories());
    }
    if (filter === 'Latest' && !latestStories) {
      dispatch(fetchLatestStories());
    }
  }, [filter, followingStories, topStories, latestStories, dispatch]);

  const Loader = () => (
    <>
      <StorySkeleton />
      <StorySkeleton />
      <StorySkeleton />
    </>
  );

  let storySection: React.ReactNode;

  if (filter === 'Following') {
    if (!authState) {
      storySection = (
        <div className="xp-story-login">
          <h3>Login to view following tag stories</h3>
          <button className="xp-btn-primary" onClick={() => navigate('/auth')}>Login</button>
        </div>
      );
    } else if (followingStories) {
      if (followingStories.length > 0) {
        storySection = followingStories.map((el) => (
          <Story key={el._id} data={el} onClick={() => navigate(`/viewstory/${el._id}/${el.uid}`)} />
        ));
      } else {
        storySection = (
          <div className="text-center xp-no_tags_followed">
            <h4>You are not following any tags</h4>
            <Link to="/search"><button className="xp-btn-primary my-2">Follow Tags</button></Link>
          </div>
        );
      }
    } else {
      storySection = <Loader />;
    }
  } else if (filter === 'Most Popular') {
    storySection = topStories
      ? topStories.map((el) => (
          <Story key={el._id} data={el} onClick={() => navigate(`/viewstory/${el._id}/${el.uid}`)} />
        ))
      : <Loader />;
  } else {
    storySection = latestStories
      ? latestStories.map((el) => (
          <Story key={el._id} data={el} onClick={() => navigate(`/viewstory/${el._id}/${el.uid}`)} />
        ))
      : <Loader />;
  }

  return (
    <div className="xp-story_screen">
      <div className="row">
        <div className="col-md-8">
          <div className="xp-story_screen-title">
            <h4>
              Stories{' '}
              {userDetails && (
                <span>
                  for <span className="highlight">@{userDetails.userName}</span>
                </span>
              )}
            </h4>
            <div className="xp-split" />
            <div className="xp-btn-story_screen-filter">
              <div className="dropdown">
                <button
                  className="xp-btn-dropdown xp-btn-secondary"
                  type="button"
                  data-toggle="dropdown"
                >
                  <span>{filter}</span>
                  <i className="bx bxs-down-arrow ml-2" />
                </button>
                <div className="dropdown-menu">
                  <p className="mx-4 my-2" onClick={() => setFilter('Following')}>Following</p>
                  <p className="mx-4 my-2" onClick={() => setFilter('Most Popular')}>Most Popular</p>
                  <p className="mx-4 my-2" onClick={() => setFilter('Latest')}>Latest</p>
                </div>
              </div>
            </div>
          </div>
          {storySection}
        </div>
        <div className="col-md-4">
          <div className="popular-tags">
            <h4>Popular tags on XP</h4>
            <Categories />
          </div>
          <div className="also_like_section">
            <h4>Top stories on XP</h4>
            {topStories ? (
              topStories.slice(0, 5).map((story, index) => (
                <AlsoLike key={index} story={story} />
              ))
            ) : (
              <>
                <Skeleton width={230} height={90} className="d-block my-2" />
                <Skeleton width={230} height={90} className="d-block my-2" />
                <Skeleton width={230} height={90} className="d-block my-2" />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryScreen;
