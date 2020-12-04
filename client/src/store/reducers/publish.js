const initialState = {
  story: "",
  didStoryUpdated: false,
  errorOnPublishing: false,
};

const publishReducer = (state = initialState, action) => {
  switch (action.type) {
    case "STORY_PUBLISHED":
      return {
        ...state,
        story: action.story,
      };
    case "RESET_STORY_PUBLISHED":
      return {
        ...state,
        story: "",
      };
    case "UPDATED_STORY":
      return {
        ...state,
        didStoryUpdated: true,
      };
    case "ERROR_ON_UPDATE_STORY":
      return {
        ...state,
        errorOnPublishing: true,
      };
    case "RESET_UPDATE_STORY":
      return {
        ...state,
        errorOnPublishing: false,
        didStoryUpdated: false,
      };
    default:
      return state;
  }
};

export default publishReducer;
