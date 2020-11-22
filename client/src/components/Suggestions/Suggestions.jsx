import React from "react";

import "./Suggestions.css";
import ShareXpImg from "../../Assets/shareXP-draw.svg";
import { config } from "../../utilities/constants/constants";

export default function Suggestions({ title, img, clickHandler }) {
  return (
    <div className="col-md-4" onClick={clickHandler}>
      <div className="xp-sugg-card">
        <div className="row">
          <div className="col-md-12">
            <div className="xp-sugg-img">
              <img src={img ? img : ShareXpImg} alt={config.server_url} />
            </div>
            <div className="col-md-12 xp-sugg-title">
              <h6>{title}</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
