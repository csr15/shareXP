import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Skeleton from "react-loading-skeleton";

import "./Categories.css";
import * as actions from "../../store";

export default function Categories() {
  const topTags = useSelector((state) => {
    return state.search.topTags;
  });
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (topTags === "") {
      dispatch(actions.fetchTopTagsHandler());
    }
  }, []);

  const CaegoriesCard = ({ tagName }) => {
    return (
      <p onClick={() => history.push(`/tagStories/${tagName._id.substr(1)}`)}>
        {tagName._id}
      </p>
    );
  };

  const history = useHistory();

  return (
    <div className="xp-categories">
      <div className="xp-categories-list">
        {topTags ? (
          topTags.map((tag, index) => {
            return <CaegoriesCard key={index} tagName={tag} />;
          })
        ) : (
          <>
            <Skeleton width={70} height={20} style={{ margin: "3px 3px" }} />
            <Skeleton width={70} height={20} style={{ margin: "3px 3px" }} />
            <Skeleton width={70} height={20} style={{ margin: "3px 3px" }} />
            <Skeleton width={70} height={20} style={{ margin: "3px 3px" }} />
            <Skeleton width={70} height={20} style={{ margin: "3px 3px" }} />
          </>
        )}
      </div>
    </div>
  );
}
