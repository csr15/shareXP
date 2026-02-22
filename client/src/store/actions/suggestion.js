import Axios from "axios";
import { config } from "../../utilities/constants/constants";

export const fetchSuggestions = (storyData) => {
  return async (dispatch) => {
    try {
      const { data } = await Axios.post(
        `${config.server_url}/suggestions`,
        {
          tags: storyData.story.tags,
        },
      );

      dispatch({ type: "SUGGESTION_STORIES", payload: data });
    } catch (error) {
      dispatch({ type: "SUGGESTION_ERROR" });
    }
  };
};
