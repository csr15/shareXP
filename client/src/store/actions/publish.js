import Axios from "axios";
import { config } from "../../utilities/constants/constants";

Axios.defaults.withCredentials = true;
export const publishStoryHandler = (story) => {
  return async (dispatch) => {
    try {
      const { data } = await Axios.post(
        `${config.server_url}/publish/${localStorage.getItem("uid")}`,
        { uid: localStorage.getItem("uid"), userName: story.userName, story: { ...story } }
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
