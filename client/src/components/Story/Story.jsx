import React, { useState } from "react";
import { withRouter } from "react-router";
import ReactHtmlParser from "react-html-parser";
import { useDispatch, useSelector } from "react-redux";

import "./Story.css";
import viewImg from "../../Assets/icons/xp-view.svg";
import ShareXpImg from "../../Assets/shareXP-draw.svg";
import { config } from "../../utilities/constants/constants";
import * as actions from "../../store";
import Modal from "../Modal/Modal";

const Story = React.memo(({ data, onClick, isProfile }) => {
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

  let tags = "";
  if (data.story.tags.length > 5) {
    let slicedTags = data.story.data.tags.slice(0, 5);
    tags = (
      <React.Fragment>
        {slicedTags.map((tag, index) => {
          return <p key={index}>{tag}</p>;
        })}
        <span>+{data.tags.length - 5}</span>
      </React.Fragment>
    );
  } else {
    tags = data.story.tags.map((tag, index) => {
      return <p key={index}>{tag}</p>;
    });
  }

  return (
    <div className="xp-story">
      <div className="xp-story-card text-left" key={data._id}>
        <div className="row">
          <div className="col-md-4" onClick={onClick}>
            <div
              className="xp-story-card-img"
              style={{
                backgroundImage: `url(${
                  data.story.img ? data.story.img : ShareXpImg
                })`,
              }}
            >
              <p>shareXP</p>
            </div>
          </div>
          <div className="col-md-8 xp-story-card-text">
            <div className="xp-story-card-wrapper" onClick={onClick}>
              <div className="xp-story-card-title">
                <h3>{data.story.title}</h3>
              </div>
              <div className="xp-story-card-categories">{tags}</div>
              <div className="xp-story-card-content">
                {data.story.content.length > 150 ? (
                  <React.Fragment>
                    {ReactHtmlParser(
                      `${data.story.content.slice(0, 100)} ......`
                    )}
                  </React.Fragment>
                ) : (
                  ReactHtmlParser(data.story.content)
                )}
              </div>
            </div>
            <div className="xp-story-card-reaction">
              <div className="xp-story-card-salute">
                <div className="xp-card-img">
                  <i className="bx bxs-like"></i>
                  <span>{data.likes.length}</span>
                </div>
              </div>
              <div className="xp-story-card-views">
                <div className="xp-card-img">
                  <img src={viewImg} alt={config.imgAlt} />
                  <span>{data.views}</span>
                </div>
              </div>
              {isProfile && (
                <div className="xp-story-card-views ml-auto">
                  <div className="xp-card-img">
                    <span
                      className="xp-card-delete"
                      onClick={() => setDoConfirmation(true)}
                    >
                      Delete story
                    </span>
                  </div>
                </div>
              )}
              {doConfirmation && (
                <Modal
                  text="Are you sure to delete"
                  pri="Delete"
                  priHandler={deletepostHandler.bind(this, data)}
                  secHandler={() => setDoConfirmation(false)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default withRouter(Story);
