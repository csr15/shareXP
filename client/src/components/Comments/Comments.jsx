import React from "react";
import moment from "moment";

import "./Comments.css";
import dummyAvatar from "../../Assets/icons/xp-avatar.svg";
import { config } from "../../utilities/constants/constants";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import CustomAvatar from "../CustomAvatar/CustomAvatar";

const Comments = React.memo(({ comments, addCommentHandler, loader }) => {
  const [newComment, setNewComment] = React.useState("");

  const authState = useSelector((state) => state.auth.authState);
  //Comment card
  const CommentCard = ({ avatar, userName, commentedAt, comment }) => (
    <div className="xp-comment-card" id="comment">
      <div className="xp-comment-img">
        {avatar ? (
          <img src={avatar} alt={config.imgAlt} className="img-responsive" />
        ) : (
          <div className="xp-comment_custom_avatar">
            <CustomAvatar width="50px" height="50px" />
          </div>
        )}
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
          autoCorrect="off"
          autoComplete="off"
          autoCapitalize="off"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          disabled={!authState}
        />
        <div className="text-center d-block">
          <button
            className="xp-btn-secondary"
            onClick={addCommentHandler.bind(this, newComment)}
            disabled={newComment === "" || loader}
          >
            {loader ? "Posting comment..!" : "Add comment"}
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
            <p className="text-center mt-1 mb-4">
              {" "}
              <strong>No comments</strong>, Be the first to add comment{" "}
              <span>😄</span>
            </p>
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
