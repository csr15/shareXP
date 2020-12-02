import React from "react";
import ReactHtmlParser from "react-html-parser";
import { useDispatch } from "react-redux";

import "./VTStoryView.css";
import { config } from "../../utilities/constants/constants";
import Modal from "../Modal/Modal";
import * as actions from "../../store/";

const VTStoryView = ({ story, isProfile, onClick }) => {
  const [doConfirmation, setDoConfirmation] = React.useState(false);

  const dispatch = useDispatch();
  const deletepostHandler = (storyData) => {
    dispatch(actions.onDeletemyStoryHandler(storyData));
  };

  return (
    <div className="xp_vt-story">
      <div className="xp_vp-story-header" onClick={onClick}>
        <div className="xp_vp-story-header-author">
          <h5>
            From <span>{story.userName}</span>{" "}
          </h5>
          <h6>
            {((createdAt) => {
              const date = new Date(createdAt);
              const options = {
                year: "numeric",
                day: "numeric",
                month: "short",
              };
              return date.toLocaleDateString("en-US", options);
            })(story.createdAt)}
          </h6>
        </div>
        <div className="xp_vp-story-header-read">
          <h6>
            {((text) => {
              text = text.trim();
              const totalWords = text.length > 0 ? text.split(/\s+/).length : 0;
              const totalMinutes = totalWords / 200;
              return Math.floor(totalMinutes);
            })(story.story.content)}{" "}
            mins read
          </h6>
        </div>
      </div>
      {story.story.img && (
        <div className="xp_vp-story-img" onClick={onClick}>
          <img
            src={story.story.img}
            alt={config.imgAlt}
            className="img-responsive"
          />
        </div>
      )}
      <div className="xp_vp-story-tags">
        {story.story.tags.map((el) => (
          <p key={el}>{el}</p>
        ))}
      </div>
      <div className="xp_vp-story-title" onClick={onClick}>
        <h1>{story.story.title}</h1>
      </div>
      <div className="xp_vp-story-content" onClick={onClick}>
        {story.story.content.length > 150 ? (
          <React.Fragment>
            {ReactHtmlParser(`${story.story.content.slice(0, 150)} ...`)}{" "}
            <span className="xp-read_more">Read more</span>
          </React.Fragment>
        ) : (
          ReactHtmlParser(story.story.content)
        )}
      </div>
      <div className="xp_vp-story-footer">
        <p className="my-auto">
          <i className="bx bxs-like my-auto"></i>
          <span className="my-auto"> {story.likes.length}</span>
        </p>
        <p className="show my-auto">
          <i className="bx bxs-show my-auto"></i>
          <span className="my-auto"> {story.views}</span>
        </p>
        <p className="my-auto">
          <i className="bx bxs-comment my-auto"></i>
          <span className="my-auto"> {story.comments.length}</span>
        </p>
        {isProfile && (
          <p
            className="my-auto ml-auto delete"
            onClick={() => setDoConfirmation(true)}
          >
            <i className="bx bxs-trash-alt"></i>
            <span className="my-auto">Delete story</span>
          </p>
        )}
      </div>

      {doConfirmation && (
        <Modal
          text="Are you sure to delete?"
          pri="Delete"
          secHandler={() => setDoConfirmation(false)}
          priHandler={deletepostHandler.bind(this, story)}
        />
      )}
    </div>
  );
};

export default VTStoryView;
