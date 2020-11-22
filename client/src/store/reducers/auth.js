const initialState = {
  isUserNameValid: null,
  isMailValid: null,

  didSignedUp: "",
  signupError: false,

  didSignedIn: "",
  signinError: false,

  isErrorOnGoogleAuth: false,
  googleAuth: "",

  authState: false,

  errorOnAccountDeletion: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USERNAME":
      return {
        ...state,
        isUserNameValid: action.payload,
      };
    case "MAIL":
      return {
        ...state,
        isMailValid: action.payload,
      };
    case "SIGNUP":
      return {
        ...state,
        didSignedUp: action.payload,
      };
    case "RESET_SIGNUP":
      return {
        ...state,
        didSignedUp: "",
        signinError: false,
      };
    case "SIGNUP_ERROR":
      return {
        ...state,
        signinError: true,
      };
    case "SIGNIN":
      return {
        ...state,
        didSignedIn: action.payload,
        authState: true,
      };
    case "RESET_SIGNIN":
      return {
        ...state,
        didSignedIn: "",
        signinError: false,
      };
    case "SIGNIN_ERROR":
      return {
        ...state,
        signinError: true,
      };
    case "GOOGLE_AUTH":
      return {
        ...state,
        googleAuth: action.payload,
        authState: true,
      };
    case "GOOGLE_AUTH_ERROR":
      return {
        ...state,
        isErrorOnGoogleAuth: true,
      };
    case "RESET_GOOGLE_AUTH_ERROR":
      return {
        ...state,
        isErrorOnGoogleAuth: false,
      };
    case "RESET_GOOGLE_AUTH":
      return {
        ...state,
        googleAuth: "",
      };
    case "USER_AUTHENTICATED":
      return {
        ...state,
        authState: true,
      };
    case "USER_UN_AUTHENTICATED":
      return {
        ...state,
        authState: false,
      };
    case "ERROR_ON_DELETE_ACCOUNT":
      return {
        ...state,
        errorOnAccountDeletion: true,
      };
    default:
      return state;
  }
};

export default authReducer;
