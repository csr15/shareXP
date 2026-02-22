import React, { useState } from 'react';
import moment from 'moment';
import { useAppSelector } from '../../store/hooks';
import CustomAvatar from '../common/CustomAvatar';
import { Comment } from '../../types/story.types';
import './comments.scss';

interface CommentsProps {
  comments: Comment[];
  addCommentHandler: (comment: string) => void;
  loader: boolean;
}

const Comments: React.FC<CommentsProps> = ({ comments, addCommentHandler, loader }) => {
  const [newComment, setNewComment] = useState('');
  const authState = useAppSelector((s) => s.auth.authState);

  return (
    <div className="xp-comments">
      <div className="xp-comment-input">
        <h6>Add your comment</h6>
        <textarea
          placeholder="Really inspiring!"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          disabled={!authState}
        />
        <div className="text-center d-block">
          <button
            className="xp-btn-secondary"
            onClick={() => { addCommentHandler(newComment); setNewComment(''); }}
            disabled={newComment === '' || loader}
          >
            {loader ? 'Posting comment..!' : 'Add comment'}
          </button>
        </div>
      </div>
      <div className="xp-all-comments">
        {comments.length > 0 ? (
          comments.map((el) => (
            <div className="xp-comment-card" key={el._id}>
              <div className="xp-comment-img">
                {el.avatar ? (
                  <img src={el.avatar} alt="avatar" className="img-responsive" />
                ) : (
                  <CustomAvatar width="50px" height="50px" />
                )}
              </div>
              <div className="xp-comment-body my-auto">
                <div className="xp-comment-details">
                  <h6 className="my-auto">{el.userName}</h6>
                  <p className="my-auto xp-comment-date">{moment(el.commentedAt).fromNow()}</p>
                </div>
                <p className="xp-comment-body-text">{el.comment}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center mt-1 mb-4">
            <strong>No comments</strong>, Be the first to add comment
          </p>
        )}
      </div>
    </div>
  );
};

export default React.memo(Comments);
