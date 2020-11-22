import React from "react";
import { Link } from "react-router-dom";

import Story from "../Story/Story";
import StorySkeleton from "../StorySkeleton/StorySkeleton";

export default function MyStories({ myStories, onClick }) {
  return (
    <div className="xp-profile-story">
      <div className="xp-profile-story-items">
        {myStories !== "" ? (
          myStories.length > 0 ? (
            myStories.map((storyData, index) => {
              return (
                <Story
                  key={index}
                  data={storyData}
                  isProfile={true}
                  onClick={onClick.bind(this, storyData._id)}
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
            <StorySkeleton />
            <StorySkeleton />
          </>
        )}
      </div>
    </div>
  );
}
