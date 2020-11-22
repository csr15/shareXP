const initialState = {
  topTags: "",
  isErrorOnTopTags: false,
  tagStories: "",
  tagName: "",
  errorOntagStories: false,
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOP_TAGS":
      return {
        ...state,
        topTags: action.payload,
      };
    case "TOP_TAGS_ERROR":
      return {
        ...state,
        isErrorOnTopTags: true,
      };
    case "RESET_TOP_TAGS_ERROR":
      return {
        ...state,
        isErrorOnTopTags: false,
      };
    case "TOP_TAG_STORIES":
      console.log(action.tagName)
      return {
        ...state,
        tagStories: action.payload,
        tagName: action.tagName,
      };
    default:
      return state;
  }
};

export default searchReducer;
