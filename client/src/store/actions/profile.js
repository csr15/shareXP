import Axios from "axios";
import { config } from "../../utilities/constants/constants";
import firebase from "../../firebase/base";

Axios.defaults.withCredentials = true;
export const profileHandler = () => {
  return async (dispatch) => {
    try {
      const { data } = await Axios.get(
        `${config.server_url}/profile/${localStorage.getItem("uid")}`
      );

      dispatch({ type: "MY_STORIES", payload: data[0] });
    } catch {
      dispatch({ type: "ERROR" });
    }
  };
};

export const onDeletemyStoryHandler = (storyData) => {
  return async (dispatch) => {
    try {
      const storage = firebase.storage();
      if (storyData.story.img) {
        storage
          .ref(
            `/stories/${localStorage.getItem("uid")}/${storyData.story.title}`
          )
          .delete()
          .then(async () => {
            try {
              const { data } = await Axios.delete(
                `${config.server_url}/profile/deleteStory/${storyData._id}`
              );
              dispatch({ type: "STORY_DELETED", payload: data });
              setTimeout(() => {
                dispatch({ type: "RESET_DELETE" });
              }, 3000);
            } catch (error) {
              console.log(error);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        (async () => {
          try {
            const { data } = await Axios.delete(
              `${config.server_url}/profile/deleteStory/${storyData._id}`
            );
            dispatch({ type: "STORY_DELETED", payload: data });
            setTimeout(() => {
              dispatch({ type: "RESET_DELETE" });
            }, 3000);
          } catch (error) {
            console.log(error);
          }
        })();
      }
    } catch {
      dispatch({ type: "ERROR" });
    }
  };
};

export const updateViewHandler = (storyId) => {
  return async (dispatch) => {
    try {
      await Axios.get(`${config.server_url}/profile/updateView/${storyId}`);
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateProfileHandler = (profileData) => {
  return async (dispatch) => {
    try {
      const { data } = await Axios.post(
        `${config.server_url}/profile/updateProfile/${localStorage.getItem(
          "uid"
        )}`,
        {
          ...profileData,
        }
      );
      dispatch({ type: "PROFILE_UPDATED", payload: data });
      setTimeout(() => {
        dispatch({ type: "RESET_PROFILE_UPDATION" });
      }, 3000);
    } catch (error) {
      dispatch({ type: "ERROR" });
    }
  };
};

export const unFollowTagHandler = (tagName) => {
  return async (dispatch) => {
    try {
      const { data } = await Axios.post(
        `${config.server_url}/profile/unFollowTag/${localStorage.getItem(
          "uid"
        )}`,
        {
          tagName: tagName,
        }
      );

      dispatch({ type: "UNFOLLOWED", payload: data });
    } catch (error) {
      dispatch({ type: "ERROR_ON_UNFOLLOWED" });

      setTimeout(() => {
        dispatch({ type: "RESET_UNFOLLOWED" });
      }, 3000);
    }
  };
};

export const likeStoryHandler = (storyId) => {
  return async (dispatch) => {
    try {
      const { data } = await Axios.patch(
        `${
          config.server_url
        }/profile/likeStory/${storyId}/${localStorage.getItem("uid")}`
      );
      
      console.log(data)
      dispatch({ type: "STORY_LIKED", payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getNotifications = () => {
  return async (dispatch) => {
    try {
      const { data } = await Axios.get(
        `${config.server_url}/profile/notifications/${localStorage.getItem(
          "uid"
        )}`
      );
          
      dispatch({ type: "NOTIFICATIONS", payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};
