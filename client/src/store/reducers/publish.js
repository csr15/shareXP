const initialState = {
  story: "",
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
    default:
      return state;
  }
};

export default publishReducer;
