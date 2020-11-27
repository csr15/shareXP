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
      <div className="xp-comment-card_header">
        <img
          src={avatar ? avatar : dummyAvatar}
          alt={config.server_url}
          className="my-auto img-responsive"
        />
        <h6 className="my-auto">{userName}</h6>
        <p className="my-auto xp-comment-date">
          {moment(commentedAt).fromNow()}
        </p>
      </div>
      <div className="xp-comment-card_body">
        <p>{comment}</p>
      </div>
    </div>
  );

  return (
    <div className="xp-comments">
      <div className="xp-comment-input_wrapper">
        <label htmlFor="comment">Add your comment</label>
        <div className="xp-comment-input">
          <input
            type="text"
            name="comment"
            id="comment"
            placeholder="Really inspiring!"
            autoCorrect="off"
            autoComplete="off"
            autoCapitalize="off"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            className="btn xp-btn-primary"
            onClick={addCommentHandler.bind(this, newComment)}
          >
            Add
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
