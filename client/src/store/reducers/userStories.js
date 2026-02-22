const initialState = {
  followingStories: "",
  topStories: "",
  latestStories: "",
  isErrorOnFollowingStories: false,
  isErrorOnTopStories: false,
  isErrorOnLatestStories: false,
};

const userStoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FOLLOWING_STORIES":
      return {
        ...state,
        followingStories: action.payload,
      };
    case "ERROR_FOLLOWING_STORIES":
      return {
        ...state,
        isErrorOnFollowingStories: true,
      };
    case "RESET_FOLLOWING_STORIES":
      return {
        ...state,
        isErrorOnFollowingStories: false,
      };
    case "TOP_STORIES":
      return {
        ...state,
        topStories: action.payload,
      };
    case "ERROR_TOP_STORIES":
      return {
        ...state,
        isErrorOnTopStories: true,
      };
    case "RESET_ERROR_TOP_STORIES":
      return {
        ...state,
        isErrorOnTopStories: false,
      };
    case "LATEST_STORIES":
      return {
        ...state,
        latestStories: action.payload,
      };
    case "ERROR_LATEST_STORIES":
      return {
        ...state,
        isErrorOnLatestStories: true,
      };
    case "RESET_ERROR_LATEST_STORIES":
      return {
        ...state,
        isErrorOnLatestStories: false,
      };
    default:
      return state;
  }
};

export default userStoriesReducer;
