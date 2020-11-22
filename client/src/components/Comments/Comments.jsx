import React from "react";
import moment from "moment";

import "./comments.css";
import dummyImg from "../../Assets/icons/xp-avatar.svg";
import CommentInput from "./CommentInput";
import BackDrop from "../BackDrop/BackDrop";
import { config } from "../../utilities/constants/constants";

export default function Comments({
  storyData,
  author,
  doOpenComment,
  setDoOpenCommentProp,
}) {
  const CommentCard = ({ userName, commentedAt, comment, avatar }) => (
    <div className="xp-viewstory-comments-card">
      <div className="xp-viewstory-comments-card_header">
        <img src={avatar ? avatar : dummyImg} alt={config.imgAlt} />
        <h6>
          {userName}
          <span>{moment(commentedAt).fromNow()}</span>{" "}
        </h6>
      </div>
      <div className="xp-viewstory-comments-card_text">
        <p>{comment}</p>
      </div>
    </div>
  );
  return (
    <div className="xp-viewstory-comments">
      <div className="xp-viewstory-comments-web">
        <CommentInput author={author} storyId={storyData._id} />
        {storyData ? (
          storyData.comments.length !== 0 ? (
            storyData.comments.map((el, index) => {
              return (
                <CommentCard
                  key={index}
                  userName={el.userName}
                  commentedAt={el.commentedAt}
                  comment={el.comment}
                  avatar={el.avatar}
                />
              );
            })
          ) : (
            <p className="text-center m-3 p-2">No comments!</p>
          )
        ) : (
          <p className="text-center m-3 p-2">
            <i className="bx bx-loader-alt bx-spin"></i>Loading..!
          </p>
        )}
      </div>
      <div className="xp-viewstory-comments-mobile">
        {doOpenComment && (
          <React.Fragment>
            <BackDrop />
            <div className="xp-mobile-comments-wrapper">
              <CommentInput
                author={author}
                storyId={storyData._id}
                setDoOpenComment={setDoOpenCommentProp}
              />
              <div className="xp-all-mobile-comments">
                {storyData ? (
                  storyData.comments.length !== 0 ? (
                    storyData.comments.map((el, index) => {
                      return (
                        <CommentCard
                          key={index}
                          userName={el.userName}
                          commentedAt={el.commentedAt}
                          comment={el.comment}
                          avatar={el.avatar}
                        />
                      );
                    })
                  ) : (
                    <p className="text-center m-3 p-2">No comments</p>
                  )
                ) : (
                  <p className="text-center m-3 p-2">
                    <i className="bx bx-loader-alt bx-spin"></i>Loading..!
                  </p>
                )}
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}
