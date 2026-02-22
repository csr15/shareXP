import React from 'react';
import { useNavigate } from 'react-router-dom';
import { config } from '../../utils/constants';
import { Story } from '../../types/story.types';
import './AlsoLike.scss';

interface AlsoLikeProps {
  story: Story;
}

const AlsoLike: React.FC<AlsoLikeProps> = ({ story }) => {
  const navigate = useNavigate();
  const readTime = Math.floor(story.story.content.trim().split(/\s+/).length / 200);

  return (
    <div className="also_like" onClick={() => navigate(`/viewstory/${story._id}/${story.uid}`)}>
      <div className="xp-also_like-left">
        <div className="xp-also-like_left-body">
          <span className="xp-also-like_user">From <span className="highlight">{story.userName}</span></span>
          <h6>{story.story.title}</h6>
          <div className="xp-also-like-details"><p>{readTime} mins read</p></div>
        </div>
      </div>
      <div className="xp-also_like-right">
        {story.story.img && <img src={story.story.img} alt={config.imgAlt} className="img-responsive mt-0" />}
      </div>
    </div>
  );
};

export default AlsoLike;
