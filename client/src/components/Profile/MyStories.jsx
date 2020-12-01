import React from "react";
import { Link } from "react-router-dom";

import StorySkeleton from "../StorySkeleton/StorySkeleton";
import VTScreenSkeleton from "../VTScreenSkeleton/VTScreenSkeleton";
import VTStoryView from "../VTStoryView/VTStoryView";

export default function MyStories({ myStories, onClick }) {
  return (
    <div className="xp-profile-story">
      <div className="xp-profile-story-items">
        {myStories !== "" ? (
          myStories.length > 0 ? (
            myStories.map((storyData, index) => {
              return (
                <VTStoryView
                  key={index}
                  story={storyData}
                  isProfile={true}
                  onClick={onClick.bind(this, storyData)}
                />
              );
            })
          ) : (
            <div className="xp-no_post">
              <h6>No post yet☹️</h6>
              <Link to="/publish">
                <button className="btn btn-primary-outline">Publish new</button>
              </Link>
            </div>
          )
        ) : (
          <>
            <VTScreenSkeleton />
            <VTScreenSkeleton />
          </>
        )}
      </div>
    </div>
  );
}
