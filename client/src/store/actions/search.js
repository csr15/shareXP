import Axios from "axios";
import { config } from "../../utilities/constants/constants";

Axios.defaults.withCredentials = true;
export const fetchTopTagsHandler = () => {
  return async (dispatch) => {
    try {
      const { data } = await Axios.get(`${config.server_url}/search/topTags`);

      dispatch({ type: "TOP_TAGS", payload: data });
    } catch (error) {
      dispatch({ type: "TOP_TAGS_ERROR" });

      setTimeout(() => {
        dispatch({ type: "RESET_TOP_TAGS_ERROR" });
      }, 3000);
    }
  };
};

export const fetchTagStories = (tagName) => {
  return async (dispatch) => {
    try {
      const { data } = await Axios.get(
        `${config.server_url}/search/tagStories/${tagName}`
      );

      dispatch({ type: "TOP_TAG_STORIES", payload: data, tagName: tagName });
    } catch (error) {
      dispatch({ type: "TOP_TAGS_ERROR" });

      setTimeout(() => {
        dispatch({ type: "RESET_TOP_TAGS_ERROR" });
      }, 3000);
    }
  };
};
