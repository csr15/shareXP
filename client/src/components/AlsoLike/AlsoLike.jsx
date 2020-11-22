import React from "react";

import "./AlsoLike.css";
import saluteImg from "../../Assets/icons/xp-like.svg";
import viewImg from "../../Assets/icons/xp-view.svg";
import { config } from "../../utilities/constants/constants";
import { useHistory } from "react-router";

export default function AlsoLike({ story, indexValue }) {
  const history = useHistory();
  return (
    <div
      className="also_like"
      onClick={() => history.push(`/view-story/mostPopular/${story._id}`)}
    >
      <p>{story.story.title}</p>
      <div className="xp-also_like-reaction">
        <div className="xp-also_like-salute">
          <div className="xp-also_like-img">
            <img src={saluteImg} alt={config.imgAlt} />
            <span>{story.likes.length}</span>
          </div>
        </div>
        <div className="xp-also_like-views">
          <div className="xp-also_view-img">
            <img src={viewImg} alt={config.imgAlt} />
            <span>{story.views}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
