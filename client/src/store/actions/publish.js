import axios from "axios";
import { config } from "../../utilities/constants/constants";

export const publishStoryHandler = (story) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        `${config.server_url}/publish/${localStorage.getItem("uid")}`,
        {
          uid: localStorage.getItem("uid"),
          userName: story.userName,
          story: { ...story },
        }
      );
      dispatch({ type: "STORY_PUBLISHED", payload: data });
      dispatch({ type: "FETCH_STORIES_STORY_PUBLISHED", payload: data });

      setTimeout(() => {
        dispatch({ type: "RESET_STORY_PUBLISHED" });
      }, 3000);
    } catch {
      dispatch({ type: "ERROR" });
    }
  };
};

export const updateStoryHandler = (storyData) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.patch(
        `${config.server_url}/publish/updateStory/${storyData.storyId}`,
        {
          story: storyData.story,
        }
      );

      dispatch({ type: "UPDATED_STORY" });
      setTimeout(() => {
        dispatch({ type: "RESET_UPDATE_STORY" });
      }, 3000);
    } catch (error) {
      dispatch({ type: "ERROR_ON_UPDATE_STORY" });

      setTimeout(() => {
        dispatch({ type: "RESET_UPDATE_STORY" });
      }, 3000);
    }
  };
};
