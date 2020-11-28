import React, { useEffect, useState } from "react";

import "./CategoriesCard.css";
import { useHistory, withRouter } from "react-router";

function CategoriesCard(props) {
  const [randomColor, setRandomColor] = useState("");
  useEffect(() => {
    const color = "hsl(" + Math.random() * 360 + ", 30%, 50%)";
    setRandomColor(color);
  }, []);

  const history = useHistory();
  return (
    <div
      className="col-md-3 col-12"
      onClick={() => history.push(`/tagStories/${props.tagTitle.substr(1)}`)}
    >
      <div
        className="xp-search-categories-card"
        style={{
          borderColor: randomColor,
        }}
      >
        <h5 style={{ color: randomColor }}>{props.tagTitle}</h5>
        <p>{props.totalStories} Stories</p>
      </div>
    </div>
  );
}

export default withRouter(CategoriesCard);
