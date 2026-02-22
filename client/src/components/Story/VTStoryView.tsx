import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { deleteMyStory } from '../../store/slices/profile.slice';
import { config } from '../../utils/constants';
import Modal from '../common/Modal';
import { Story } from '../../types/story.types';
import './VTStoryView.scss';

interface VTStoryViewProps {
  story: Story;
  isProfile?: boolean;
  onClick?: () => void;
}

const VTStoryView: React.FC<VTStoryViewProps> = ({ story, isProfile, onClick }) => {
  const [doConfirmation, setDoConfirmation] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const readTime = Math.floor(story.story.content.trim().split(/\s+/).length / 200);
  const createdDate = new Date(story.createdAt).toLocaleDateString('en-US', {
    year: 'numeric', day: 'numeric', month: 'short',
  });

  return (
    <div className="xp_vt-story">
      <div className="xp_vp-story-header" onClick={onClick}>
        <div className="xp_vp-story-header-author">
          <h5>From <span>{story.userName}</span></h5>
          <h6>{createdDate}</h6>
        </div>
        <div className="xp_vp-story-header-read"><h6>{readTime} mins read</h6></div>
      </div>
      {story.story.img && (
        <div className="xp_vp-story-img" onClick={onClick}>
          <img src={story.story.img} alt={config.imgAlt} className="img-responsive" />
        </div>
      )}
      <div className="xp_vp-story-tags">
        {story.story.tags.map((el) => <p key={el}>{el}</p>)}
      </div>
      <div className="xp_vp-story-title" onClick={onClick}>
        <h1>{story.story.title}</h1>
      </div>
      <div
        className="xp_vp-story-content"
        onClick={onClick}
        dangerouslySetInnerHTML={{
          __html: story.story.content.length > 150
            ? `${story.story.content.slice(0, 150)} ... <span class="xp-read_more">Read more</span>`
            : story.story.content,
        }}
      />
      <div className="xp_vp-story-footer">
        <p className="my-auto"><i className="bx bxs-like my-auto" /><span className="my-auto"> {story.likes.length}</span></p>
        <p className="show my-auto"><i className="bx bxs-show my-auto" /><span className="my-auto"> {story.views}</span></p>
        <p className="my-auto"><i className="bx bxs-comment my-auto" /><span className="my-auto"> {story.comments.length}</span></p>
        {isProfile && (
          <div className="my-auto ml-auto delete">
            <p className="my-auto ml-auto" onClick={() => setDoConfirmation(true)}>
              <i className="bx bxs-trash-alt" /><span className="my-auto">Delete story</span>
            </p>
            <p className="my-auto ml-auto" onClick={() => navigate(`/publish/editStory/${story._id}`)}>
              <i className="bx bxs-edit" /><span className="my-auto">Edit story</span>
            </p>
          </div>
        )}
      </div>
      {doConfirmation && (
        <Modal
          text="Are you sure to delete?"
          pri="Delete"
          secHandler={() => setDoConfirmation(false)}
          priHandler={() => dispatch(deleteMyStory(story._id))}
          backDropHandler={() => setDoConfirmation(false)}
        />
      )}
    </div>
  );
};

export default VTStoryView;
