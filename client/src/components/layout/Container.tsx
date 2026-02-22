import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import Navigation from './Navigation';
import StoryScreen from '../../pages/StoryScreen';
import Search from '../search/Search';
import ViewStory from '../story/ViewStory';
import TagStories from '../story/TagStories';
import Auth from '../auth/Auth';
import Help from '../common/Help';
import Publish from '../publish/Publish';
import Profile from '../profile/Profile';
import NotFound from '../../pages/NotFound';

const Container: React.FC = () => {
  const authState = useAppSelector((state) => state.auth.authState);

  return (
    <div className="xp-home">
      <div className="container-fluid">
        <Navigation />
      </div>
      <div className="container">
        <Routes>
          <Route path="/" element={<StoryScreen />} />
          <Route path="/search" element={<Search />} />
          <Route path="/viewStory/:storyID/:authorID" element={<ViewStory />} />
          <Route path="/viewstory/:storyID/:authorID" element={<ViewStory />} />
          <Route path="/tagStories/:tagName" element={<TagStories />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/help" element={<Help />} />
          <Route path="/publish" element={<Publish />} />
          {authState ? (
            <>
              <Route path="/profile" element={<Profile />} />
              <Route path="/publish/editStory/:storyId" element={<Publish />} />
            </>
          ) : (
            <Route path="/profile" element={<Navigate to="/" replace />} />
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default Container;
