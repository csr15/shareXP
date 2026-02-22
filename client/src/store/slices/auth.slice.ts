import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../../api/auth.api';

interface AuthState {
  isUserNameValid: unknown[] | null;
  isMailValid: unknown[] | null;
  didSignedUp: string;
  signupError: boolean;
  didSignedIn: string;
  signinError: boolean;
  isErrorOnGoogleAuth: boolean;
  googleAuth: string;
  authState: boolean;
  errorOnAccountDeletion: boolean;
}

const initialState: AuthState = {
  isUserNameValid: null,
  isMailValid: null,
  didSignedUp: '',
  signupError: false,
  didSignedIn: '',
  signinError: false,
  isErrorOnGoogleAuth: false,
  googleAuth: '',
  authState: false,
  errorOnAccountDeletion: false,
};

export const checkUserName = createAsyncThunk(
  'auth/checkUserName',
  async (userName: string) => {
    const { data } = await authApi.checkUserName(userName);
    return data;
  },
);

export const checkMail = createAsyncThunk(
  'auth/checkMail',
  async (mail: string) => {
    const { data } = await authApi.checkMail(mail);
    return data;
  },
);

export const signup = createAsyncThunk(
  'auth/signup',
  async (signupData: { data: { userName: string; sureName: string; mail: string; password: string } }) => {
    const { data } = await authApi.signup(signupData);
    return data;
  },
);

export const signin = createAsyncThunk(
  'auth/signin',
  async (signinData: { data: { mail: string; password: string } }) => {
    const { data } = await authApi.signin(signinData);
    localStorage.setItem('uid', data.userDetails.uid);
    return data;
  },
);

export const googleAuthThunk = createAsyncThunk(
  'auth/googleAuth',
  async (tokenId: string) => {
    const { data } = await authApi.googleAuth(tokenId);
    localStorage.setItem('uid', data.userDoc[0]._id);
    return data.userDoc[0];
  },
);

export const checkAuthState = createAsyncThunk(
  'auth/checkAuthState',
  async () => {
    const uid = localStorage.getItem('uid');
    if (uid) {
      await authApi.checkAuth();
      return true;
    }
    return false;
  },
);

export const deleteAccount = createAsyncThunk(
  'auth/deleteAccount',
  async () => {
    const uid = localStorage.getItem('uid');
    if (uid) {
      await authApi.deleteAccount(uid);
    }
    localStorage.removeItem('token');
    localStorage.removeItem('uid');
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('uid');
      state.authState = false;
      state.googleAuth = '';
      window.location.reload();
    },
    resetSignup: (state) => {
      state.didSignedUp = '';
      state.signupError = false;
      state.isUserNameValid = null;
      state.isMailValid = null;
    },
    resetSignin: (state) => {
      state.didSignedIn = '';
      state.signinError = false;
    },
    resetGoogleAuthError: (state) => {
      state.isErrorOnGoogleAuth = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkUserName.fulfilled, (state, action) => {
        state.isUserNameValid = action.payload;
      })
      .addCase(checkMail.fulfilled, (state, action) => {
        state.isMailValid = action.payload;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.didSignedUp = action.payload;
      })
      .addCase(signup.rejected, (state) => {
        state.signupError = true;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.didSignedIn = action.payload;
        state.authState = true;
      })
      .addCase(signin.rejected, (state) => {
        state.signinError = true;
      })
      .addCase(googleAuthThunk.fulfilled, (state, action) => {
        state.googleAuth = action.payload;
        state.authState = true;
      })
      .addCase(googleAuthThunk.rejected, (state) => {
        state.isErrorOnGoogleAuth = true;
      })
      .addCase(checkAuthState.fulfilled, (state, action) => {
        if (action.payload) {
          state.authState = true;
        }
      })
      .addCase(deleteAccount.rejected, (state) => {
        state.errorOnAccountDeletion = true;
      });
  },
});

export const { logout, resetSignup, resetSignin, resetGoogleAuthError } = authSlice.actions;
export default authSlice.reducer;
