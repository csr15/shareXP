import React from "react";

import { config } from "../../../utilities/constants/constants";
import xpAvatar from "../../../Assets/icons/xp-avatar.svg";

export default function UserCard({ data }) {
  return (
    <div className="xp-viewstory-user-card">
      <div className="xp-viewstory-user-img">
        <img src={data.avatar ? data.avatar : xpAvatar} alt={config.imgAlt} />
      </div>
      <div className="xp-viewstory-user-name">
        <h5>{data.userName}</h5>
      </div>
      <div className="xp-viewstory-user-social_media">
        {data.facebook && (
          <a href={data.facebook} target="_blank" rel="noopener noreferrer">
            <i className="bx bxl-facebook bx-md"></i>
          </a>
        )}
        {data.linkedIn && (
          <a href={data.linkedIn} target="_blank" rel="noopener noreferrer">
            <i className="bx bxl-linkedin bx-md"></i>
          </a>
        )}
        {data.link && (
          <a href={data.link} target="_blank" rel="noopener noreferrer">
            <i className="bx bx-link-external bx-md"></i>
          </a>
        )}
        <a href={`mailto:${data.mail}`} target="_blank" rel="noopener noreferrer">
          <i className="bx bx-envelope"></i>
        </a>
      </div>
      <div className="xp-viewstory-author">
        <p>Author</p>
      </div>
    </div>
  );
}
