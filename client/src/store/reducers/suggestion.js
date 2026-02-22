const initialState = {
  suggestionStories: "",
  errorOnSuggestion: false,
};

const suggestReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SUGGESTION_STORIES":
      return {
        ...state,
        suggestionStories: action.payload,
      };
    case "SUGGESTION_ERROR":
      return {
        ...state,
        suggestionStories: false,
      };
      default: return state;
  }
};

export default suggestReducer;
