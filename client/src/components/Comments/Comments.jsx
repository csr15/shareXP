import React from "react";
import moment from "moment";

import "./Comments.css";
import dummyAvatar from "../../Assets/icons/xp-avatar.svg";
import { config } from "../../utilities/constants/constants";
import Skeleton from "react-loading-skeleton";

const Comments = React.memo(({ comments, addCommentHandler }) => {
  const [newComment, setNewComment] = React.useState("");
  //Comment card
  const CommentCard = ({ avatar, userName, commentedAt, comment }) => (
    <div className="xp-comment-card">
      <div className="xp-comment-img my-auto">
        <img
          src={avatar ? avatar : dummyAvatar}
          alt={config.server_url}
          className="my-auto img-responsive"
        />
      </div>
      <div className="xp-comment-body my-auto">
        <div className="xp-comment-details">
          <h6 className="my-auto">{userName}</h6>
          <div className="spacer"></div>
          <p className="my-auto xp-comment-date">
            {moment(commentedAt).fromNow()}
          </p>
        </div>
        <p className="xp-comment-body-text">{comment}</p>
      </div>
    </div>
  );

  return (
    <div className="xp-comments">
      <div className="xp-comment-input">
        <h6>Add your comment</h6>
        <textarea
          placeholder="Really inspiring!"
          value={newComment}
          autoCorrect={false}
          autoComplete="off"
          autoCapitalize="off"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <div className="text-center d-block">
          <button
            className="xp-btn-secondary"
            onClick={addCommentHandler.bind(this, newComment)}
          >
            Add comment
          </button>
        </div>
      </div>
      <div className="xp-all-comments">
        {comments ? (
          comments.length > 0 ? (
            comments.map((el) => (
              <CommentCard
                key={el._id}
                avatar={el.hasOwnProperty("avatar") ? el.avatar : ""}
                commentedAt={el.commentedAt}
                userName={el.userName}
                comment={el.comment}
              />
            ))
          ) : (
            <p className="text-center">No comments </p>
          )
        ) : (
          <Skeleton
            width={200}
            height={50}
            count={2}
            style={{ marginTop: "10px" }}
          />
        )}
      </div>
    </div>
  );
});

export default Comments;
