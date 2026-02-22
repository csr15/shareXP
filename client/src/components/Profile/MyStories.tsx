import React from 'react';
import VTStoryView from '../story/VTStoryView';
import VTScreenSkeleton from '../common/VTScreenSkeleton';
import { Story } from '../../types/story.types';

interface MyStoriesProps {
  myStories: Story[] | null;
  onClick: (story: Story) => void;
}

const MyStories: React.FC<MyStoriesProps> = ({ myStories, onClick }) => {
  if (!myStories) {
    return (
      <>
        <VTScreenSkeleton />
        <VTScreenSkeleton />
      </>
    );
  }

  if (myStories.length === 0) {
    return <p className="text-center m-4">No stories yet. Share your first experience!</p>;
  }

  return (
    <div>
      {myStories.map((story) => (
        <VTStoryView key={story._id} story={story} isProfile onClick={() => onClick(story)} />
      ))}
    </div>
  );
};

export default MyStories;
