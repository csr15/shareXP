import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import "./ViewStory.css";
import * as actions from "../../store";
import StoryCard from "./StoryCard";
import Axios from "axios";
import { config } from "../../utilities/constants/constants";
import Suggestions from "../Suggestions/Suggestions";

function ViewStory() {
  const [suggestions, setSuggestions] = React.useState("");
  //mapStateToProps
  const state = useSelector((state) => {
    return {
      myStories: state.profile.myStories,
      tagStories: state.search.tagStories,
      followingStories: state.user.followingStories,
      topStories: state.user.topStories,
      latestStories: state.user.latestStories,
    };
  });

  let storyData = "";

  const {
    storyId,
    tagName,
    popularStoryId,
    latestStoryId,
    followingStoryId,
    suggestStoryId,
  } = useParams();

  if (storyId && state.myStories) {
    storyData = state.myStories.filter((story) => story._id === storyId);
  } else if (tagName && state.tagStories) {
    storyData = state.tagStories.filter((story) => story._id === tagName);
  } else if (state.topStories && popularStoryId) {
    storyData = state.topStories.filter(
      (story) => story._id === popularStoryId
    );
  } else if (latestStoryId && state.latestStories) {
    storyData = state.latestStories.filter(
      (story) => story._id === latestStoryId
    );
  } else if (state.followingStories && followingStoryId) {
    storyData = state.followingStories.filter(
      (story) => story._id === followingStoryId
    );
  } else if (suggestStoryId && suggestions !== "") {
    storyData = suggestions.filter((story) => story._id === suggestStoryId);
  }

  React.useEffect(() => {
    if (storyData && suggestions === "") {
      (async (tags) => {
        try {
          const { data } = await Axios.post(
            `${config.server_url}/suggestions`,
            {
              tags,
            }
          );

          setSuggestions(data);
        } catch (error) {
          console.log(error);
        }
      })(storyData[0].story.tags);
    }
  }, [suggestStoryId, storyData, suggestions]);

  //mapDispatchToProps
  const dispatch = useDispatch();
  const mapDispatchToProps = {
    myStories: () => dispatch(actions.profileHandler()),
    updateView: () =>
      dispatch(actions.updateViewHandler(localStorage.getItem("storyID"))),
    fetchTagStoriesHandler: () =>
      dispatch(actions.fetchTagStories(sessionStorage.getItem("currentTag"))),
    fetchFollowingStories: () => dispatch(actions.followingTagStories()),
    topStories: () => dispatch(actions.topTagStories()),
    latestStories: () => dispatch(actions.latestStories()),
  };

  useEffect(() => {
    if (state.myStories === "" && storyId) {
      mapDispatchToProps.myStories();
    }

    if (state.tagStories === "" && tagName) {
      mapDispatchToProps.fetchTagStoriesHandler();
    }

    if (state.followingStories === "" && followingStoryId) {
      mapDispatchToProps.fetchFollowingStories();
    }

    if (state.topStories === "" && popularStoryId) {
      mapDispatchToProps.topStories();
    }

    if (state.latestStories === "" && latestStoryId) {
      mapDispatchToProps.latestStories();
    }

    return function cleanup() {
      mapDispatchToProps.updateView();
      localStorage.removeItem("storyId");
    };
  }, []);

  const history = useHistory();
  return (
    <div className="xp-viewstory">
      <StoryCard storyData={storyData[0]} />
      
      {/* {suggestions ? (
        <div className="xp-sugg">
          {suggestions.length > 0 ? (
            <>
              <h4>You might also like</h4>
              <div className="row">
                {suggestions.map(({ _id, story: { title, img } }) => {
                  if (_id !== storyData[0]._id) {
                    return (
                      <Suggestions
                        key={_id}
                        title={title}
                        img={img}
                        clickHandler={() =>
                          history.push(`/view-story/suggestion/${_id}`)
                        }
                      />
                    );
                  }
                })}
              </div>
            </>
          ) : null}
        </div>
      ) : null} */}
    </div>
  );
}

export default ViewStory;
