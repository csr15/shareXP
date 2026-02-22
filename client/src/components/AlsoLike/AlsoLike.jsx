import React from "react";

import "./AlsoLike.css";
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
      <div className="xp-also_like-left">
        <div className="xp-also-like_left-body">
          <span className="xp-also-like_user">
            From <span className="highlight">{story.userName}</span>
          </span>
          <h6>{story.story.title}</h6>
          <div className="xp-also-like-details">
            <p>
              {((text) => {
                text = text.trim();
                const totalWords =
                  text.length > 0 ? text.split(/\s+/).length : 0;
                const totalMinutes = totalWords / 200;
                return Math.floor(totalMinutes);
              })(story.story.content)}{" "}
              mins read
            </p>
          </div>
        </div>
      </div>
      <div className="xp-also_like-right">
        <img
          src={story.story.img ? story.story.img : sharexpImg}
          alt={
            config.imgAlt ||
            story.story.title ||
            story.story.tags.map((el) => el.substr(1))
          }
          className="img-responsive mt-0"
        />
      </div>
    </div>
  );
}
