import React from 'react';
import { config } from '../../utils/constants';
import { Story as StoryType } from '../../types/story.types';
import './Story.scss';

interface StoryProps {
  data: StoryType;
  onClick: () => void;
}

const Story: React.FC<StoryProps> = ({ data, onClick }) => {
  const readTime = (() => {
    const text = data.story.content.trim();
    const totalWords = text.length > 0 ? text.split(/\s+/).length : 0;
    return Math.floor(totalWords / 200);
  })();

  return (
    <div className="xp-story" onClick={onClick}>
      <div className="row">
        <div className="col-md-8 col-8">
          <div className="xp-story-body">
            <h6 className="xp-story-user">
              From <span className="highlight">{data.userName}</span>
            </h6>
            <h5 className="xp-story-title">{data.story.title}</h5>
            <div className="xp-story-details">
              <p>{readTime} mins read</p>
              <p><i className="bx bxs-like" /> {data.likes.length}</p>
              <p><i className="bx bxs-show" /> {data.views}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-4">
          {data.story.img && (
            <div className="xp-story-img">
              <img src={data.story.img} alt={config.imgAlt} className="img-responsive" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Story);
