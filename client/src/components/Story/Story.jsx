import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactHtmlParser from "react-html-parser";

import "./Story.css";
import ShareXpImg from "../../Assets/shareXP-draw.svg";
import { config } from "../../utilities/constants/constants";
import * as actions from "../../store";

const Story = React.memo(({ data, onClick }) => {
  const [doConfirmation, setDoConfirmation] = useState(false);

  //mapDispatchToProps
  const dispatch = useDispatch();
  const deletepostHandler = (storyData) => {
    dispatch(actions.onDeletemyStoryHandler(storyData));
  };

  //mapStateToProps
  const didStoryDeleted = useSelector((state) => {
    return state.profile.didStoryDeleted;
  });

  if (didStoryDeleted && doConfirmation) setDoConfirmation(false);

  return (
    <div className="xp-story" onClick={onClick}>
      <div className="xp-story-wrapper">
        <div className="xp-story-body">
          <div className="xp-story-body_title">
            <h6>
              From <span>{data.userName}</span>
            </h6>
            <h1>{data.story.title}</h1>
          </div>
          <div className="xp-story-body_content">
            {data.story.content.length > 150 ? (
              <React.Fragment>
                {ReactHtmlParser(`${data.story.content.slice(0, 100)} ...`)}
              </React.Fragment>
            ) : (
              ReactHtmlParser(data.story.content)
            )}
          </div>
          <div className="xp-story-body_details">
            <p className="my-auto">
              {((createdAt) => {
                const date = new Date(createdAt);
                const options = {
                  year: "2-digit",
                  day: "numeric",
                  month: "short",
                };
                return date.toLocaleDateString("en-US", options);
              })(data.createdAt)}
            </p>
            <div className="spacer my-auto"></div>
            <p className="my-auto">
              {((text) => {
                text = text.trim();
                const totalWords =
                  text.length > 0 ? text.split(/\s+/).length : 0;
                const totalMinutes = totalWords / 200;
                return Math.floor(totalMinutes);
              })(data.story.content)}{" "}
              mins read
            </p>
            <div className="spacer my-auto"></div>
            <p className="my-auto">{data.views} views</p>
          </div>
        </div>
        <div className="xp-story-img">
          <img
            src={data.story.img ? data.story.img : ShareXpImg}
            alt={`${config.imgAlt} || ${
              data.story.title
            } || ${data.story.tags.map((el) => el)}`}
          />
        </div>
      </div>
    </div>
  );
});

export default Story;
