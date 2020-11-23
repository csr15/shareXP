import Axios from "axios";
import { config } from "../../utilities/constants/constants";

// Username Handler
export const userNameHandler = (user) => {
  return async (dispatch) => {
    try {
      const { data } = await Axios.post(
        `${config.server_url}/auth/checkUserName/${user.userName}`
      );
      dispatch({ type: "USERNAME", payload: data });
    } catch (error) {
      dispatch({ type: "ERROR" });
    }
  };
};

//Mail handler
export const mailHandler = (mail) => {
  return async (dispatch) => {
    try {
      const { data } = await Axios.post(
        `${config.server_url}/auth/mailValidation/${mail}`
      );
      dispatch({ type: "MAIL", payload: data });
    } catch (error) {
      dispatch({ type: "ERROR" });
    }
  };
};

export const signupHandler = (signupData) => {
  return async (dispatch) => {
    try {
      const { data } = await Axios.post(`${config.server_url}/auth/signup`, {
        ...signupData,
      });
      dispatch({ type: "SIGNUP", payload: data });

      setTimeout(() => {
        dispatch({ type: "RESET_SIGNUP" });
      }, 3000);
    } catch (error) {
      dispatch({ type: "SIGNUP_ERROR" });

      // (async () => {
      //   await setTimeout(() => {
      //     dispatch({ type: "RESET_SIGNUP" });
      //   }, 3000);
      // })();
    }
  };
};

// Signin
export const signinHandler = (signInData) => {
  return async (dispatch) => {
    try {
      const { data } = await Axios.post(`${config.server_url}/auth/signin`, {
        ...signInData,
      });

      localStorage.setItem("uid", data.userDetails.uid);
      dispatch({ type: "SIGNIN", payload: data });

      setTimeout(() => {
        dispatch({ type: "RESET_SIGNIN" });
      }, 3000);
    } catch (error) {
      dispatch({ type: "SIGNIN_ERROR" });

      // (async () => {
      //   await setTimeout(() => {
      //     dispatch({ type: "RESET_SIGNIN" });
      //   }, 3000);
      // })();
    }
  };
};

export const googleAuth = (response) => {
  return async (dispatch) => {
    try {
      const { data } = await Axios.post(
        `${config.server_url}/auth/googleAuth`,
        { tokenId: response.tokenId }
      );

      localStorage.setItem("uid", data.userDoc[0]._id);
      dispatch({ type: "GOOGLE_AUTH", payload: data.userDoc[0] });
    } catch (error) {
      dispatch({ type: "GOOGLE_AUTH_ERROR" });
      setTimeout(() => {
        dispatch({ type: "RESET_GOOGLE_AUTH_ERROR" });
      }, 3000);
    }
  };
};

export const checkAuthState = () => {
  return async (dispatch) => {
    const uid = localStorage.getItem("uid");
    if (uid) {
      try {
        await Axios.get(`${config.server_url}/auth/checkAuth`);

        dispatch({ type: "USER_AUTHENTICATED" });
      } catch (error) {
        console.log(error.message);
      }
    } else {
      logout();
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem("token");
    localStorage.removeItem("uid");
    window.location.reload(1)
  };
};

export const deleteAccount = () => {
  return async (dispatch) => {
    try {
      await Axios.delete(
        `${config.server_url}/auth/deleteAccount/${localStorage.getItem("uid")}`
      );
      dispatch(logout());
    } catch (error) {
      dispatch({ type: "ERROR_ON_DELETE_ACCOUNT" });
    }
  };
};
