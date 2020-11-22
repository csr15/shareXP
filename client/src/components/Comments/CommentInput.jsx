import React from "react";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { config } from "../../utilities/constants/constants";
import Popup from "../Popup/Popup";
import * as actions from "../../store";

export default function CommentInput({ storyId, setDoOpenComment, author }) {
  const [comment, setComment] = React.useState("");
  const [isErrorOnUpdateComment, setIsErrorOnUpdateComment] = React.useState(
    ""
  );
  const [didCommentUpdated, setDidCommentUpdated] = React.useState(false);
  const [loader, setLoader] = React.useState(false);

  const userDetails = useSelector((state) => {
    return state.profile.userDetails;
  });

  const authState = useSelector((state) => {
    return state.auth.authState;
  });

  const dispatch = useDispatch();
  React.useEffect(() => {
    if (userDetails === "") {
      dispatch(actions.profileHandler());
    }
  }, []);

  const addCommenthandler = async () => {
    setLoader(true);
    try {
      await Axios.post(
        `${config.server_url}/publish/comment/${storyId}`,
        {
          userName: userDetails.userName,
          uid: userDetails._id,
          comment: comment,
          commentedAt: new Date(),
          avatar: userDetails.avatar,
        },
        { withCredentials: true }
      );

      setLoader(false);
      setDidCommentUpdated(true);
      setTimeout(() => {
        setDidCommentUpdated(false);
      }, 3000);
    } catch (error) {
      setIsErrorOnUpdateComment(error.message);
      setLoader(false);
      setTimeout(() => {
        setIsErrorOnUpdateComment("");
      }, 3000);
    }
  };
  return (
    <React.Fragment>
      <div className="xp-viewstory-comment-web">
        <div className="xp-mobile-comments-input">
          <h5>Add your comments</h5>
          <i className="bx bx-x" onClick={setDoOpenComment}></i>
        </div>
        <div className="xp-viewstory-input">
          <input
            type="text"
            name="comments"
            placeholder="Really inspired!"
            autoComplete="off"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={!authState}
          />
          {loader ? (
            <i className="bx bx-loader-alt bx-spin"></i>
          ) : (
            <button
              className="xp-btn-secondary"
              onClick={addCommenthandler}
              disabled={comment === ""}
            >
              Add
            </button>
          )}
        </div>
      </div>

      {isErrorOnUpdateComment && (
        <Popup type="alert-danger" text={isErrorOnUpdateComment} />
      )}
      {didCommentUpdated && (
        <Popup
          type="alert-success"
          text="Your comment has been added!, refresh page!"
        />
      )}
    </React.Fragment>
  );
}
