import React from "react";

import "./AlsoLike.css";
import viewImg from "../../Assets/icons/xp-view.svg";
import { config } from "../../utilities/constants/constants";
import { useHistory } from "react-router";
import sharexpImg from "../../Assets/shareXP-draw.svg";

export default function AlsoLike({ story }) {
  const history = useHistory();
  return (
    <div
      className="also_like"
      onClick={() => history.push(`/viewstory/${story._id}/${story.uid}`)}
    >
      <div className=" xp-also_like-left">
        <div className="xp-also-like_left-body">
          <p>{story.story.title}</p>
          <div className="xp-also_like-reaction">
            <div className="xp-also_like-salute">
              <div className="xp-also_like-img">
                <i className="bx bxs-like"></i>
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
      </div>
      <div
        className="xp-also_like-right"
        style={{
          backgroundImage: `url(${
            story.story.img ? story.story.img : sharexpImg
          })`,
        }}
      >
<p>sharexp</p>
      </div>
    </div>
  );
}
