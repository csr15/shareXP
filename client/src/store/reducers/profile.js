const initialState = {
  myStories: "",
  userDetails: "",
  didStoryDeleted: "",
  updatedProfile: "",
  unfollowedTag: [],
  errorOnUnfollow: false,
  didUserAuth: false,
  notifications: ""
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case "MY_STORIES":
      return {
        ...state,
        myStories: action.payload.stories,
        userDetails: action.payload.userDetails,
        didUserAuth: true
      };
    case "STORY_DELETED":
      return {
        ...state,
        didStoryDeleted: action.payload,
        myStories: "",
      };
    case "FETCH_STORIES_STORY_PUBLISHED":
      return {
        ...state,
        myStories: "",
      };
    case "RESET_DELETE":
      return {
        ...state,
        didStoryDeleted: "",
      };
    case "PROFILE_UPDATED":
      return {
        ...state,
        updatedProfile: action.payload,
      };
    case "RESET_PROFILE_UPDATION":
      return {
        ...state,
        updatedProfile: "",
      };
    case "UNFOLLOWED":
      return {
        ...state,
        unfollowedTag: state.unfollowedTag.concat(action.payload),
      };
    case "ERROR_ON_UNFOLLOWED":
      return {
        ...state,
        errorOnUnfollow: true,
      };
    case "RESET_UNFOLLOWED":
      return {
        ...state,
        errorOnUnfollow: false,
      };
    case "STORY_LIKED":
      return {
        ...state,
        myStories: state.myStories.map((story) =>
          story._id === action.payload.id ? action.payload : story
        ),
      };
    case "NOTIFICATIONS":
      return {
        ...state,
        notifications: action.payload
      }
    default:
      return state;
  }
};

export default profileReducer;
