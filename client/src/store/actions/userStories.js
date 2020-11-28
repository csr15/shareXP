import Axios from "axios";
import { config } from "../../utilities/constants/constants";

Axios.defaults.withCredentials = true;
export const followingTagStories = () => {
  return async (dispatch) => {
    try {
      const { data } = await Axios.get(
        `${
          config.server_url
        }/userStories/stories/followingTagStories/${localStorage.getItem(
          "uid"
        )}`
      );
      dispatch({ type: "FOLLOWING_STORIES", payload: data[0].docs });
    } catch (error) {
      dispatch({ type: "ERROR_FOLLOWING_STORIES" });

      setTimeout(() => {
        dispatch({ type: "RESET_FOLLOWING_STORIES" });
      }, 3000);
    }
  };
};

export const topTagStories = () => {
  return async (dispatch) => {
    try {
      const {
        data,
      } = await Axios.get(
        `${config.server_url}/userStories/stories/topStories`,
      );

      dispatch({ type: "TOP_STORIES", payload: data });
    } catch (error) {
      dispatch({ type: "ERROR_TOP_STORIES" });

      setTimeout(() => {
        dispatch({ type: "RESET_ERROR_TOP_STORIES" });
      }, 3000);
    }
  };
};

export const latestStories = () => {
  return async (dispatch) => {
    try {
      const { data } = await Axios.get(
        `${config.server_url}/userStories/stories/latestStories`
      );

      dispatch({ type: "LATEST_STORIES", payload: data });
    } catch (error) {
      dispatch({ type: "ERROR_LATEST_STORIES" });

      setTimeout(() => {
        dispatch({ type: "RESET_ERROR_LATEST_STORIES" });
      }, 3000);
    }
  };
};
