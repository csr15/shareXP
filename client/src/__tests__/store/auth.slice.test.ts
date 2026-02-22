import authReducer, {
  logout,
  resetSignup,
  resetSignin,
  resetGoogleAuthError,
  checkUserName,
  checkMail,
  signup,
  signin,
  googleAuthThunk,
  checkAuthState,
  deleteAccount,
} from '../../store/slices/auth.slice';

describe('auth slice', () => {
  const originalLocation = window.location;

  beforeEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(window, 'location', {
      value: { ...originalLocation, reload: jest.fn() },
      writable: true,
    });
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn(),
      },
      writable: true,
    });
  });

  describe('initial state', () => {
    it('returns the initial state when given undefined', () => {
      const state = authReducer(undefined, { type: 'unknown' });
      expect(state).toEqual({
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
      });
    });
  });

  describe('synchronous reducers', () => {
    it('handles logout', () => {
      const previousState = {
        isUserNameValid: null,
        isMailValid: null,
        didSignedUp: '',
        signupError: false,
        didSignedIn: '',
        signinError: false,
        isErrorOnGoogleAuth: false,
        googleAuth: 'user-123',
        authState: true,
        errorOnAccountDeletion: false,
      };
      const state = authReducer(previousState, logout());
      expect(state.authState).toBe(false);
      expect(state.googleAuth).toBe('');
    });

    it('handles resetSignup', () => {
      const previousState = {
        isUserNameValid: [true],
        isMailValid: [false],
        didSignedUp: 'success',
        signupError: true,
        didSignedIn: '',
        signinError: false,
        isErrorOnGoogleAuth: false,
        googleAuth: '',
        authState: false,
        errorOnAccountDeletion: false,
      };
      const state = authReducer(previousState, resetSignup());
      expect(state.didSignedUp).toBe('');
      expect(state.signupError).toBe(false);
      expect(state.isUserNameValid).toBe(null);
      expect(state.isMailValid).toBe(null);
    });

    it('handles resetSignin', () => {
      const previousState = {
        isUserNameValid: null,
        isMailValid: null,
        didSignedUp: '',
        signupError: false,
        didSignedIn: 'success',
        signinError: true,
        isErrorOnGoogleAuth: false,
        googleAuth: '',
        authState: false,
        errorOnAccountDeletion: false,
      };
      const state = authReducer(previousState, resetSignin());
      expect(state.didSignedIn).toBe('');
      expect(state.signinError).toBe(false);
    });

    it('handles resetGoogleAuthError', () => {
      const previousState = {
        isUserNameValid: null,
        isMailValid: null,
        didSignedUp: '',
        signupError: false,
        didSignedIn: '',
        signinError: false,
        isErrorOnGoogleAuth: true,
        googleAuth: '',
        authState: false,
        errorOnAccountDeletion: false,
      };
      const state = authReducer(previousState, resetGoogleAuthError());
      expect(state.isErrorOnGoogleAuth).toBe(false);
    });
  });

  describe('extraReducers (async thunks)', () => {
    it('handles checkUserName.fulfilled', () => {
      const action = { type: checkUserName.fulfilled.type, payload: [true] };
      const state = authReducer(undefined, action);
      expect(state.isUserNameValid).toEqual([true]);
    });

    it('handles checkMail.fulfilled', () => {
      const action = { type: checkMail.fulfilled.type, payload: [false] };
      const state = authReducer(undefined, action);
      expect(state.isMailValid).toEqual([false]);
    });

    it('handles signup.fulfilled', () => {
      const action = { type: signup.fulfilled.type, payload: 'Story created' };
      const state = authReducer(undefined, action);
      expect(state.didSignedUp).toBe('Story created');
    });

    it('handles signup.rejected', () => {
      const state = authReducer(undefined, { type: signup.rejected.type });
      expect(state.signupError).toBe(true);
    });

    it('handles signin.fulfilled', () => {
      const action = { type: signin.fulfilled.type, payload: 'success' };
      const state = authReducer(undefined, action);
      expect(state.didSignedIn).toBe('success');
      expect(state.authState).toBe(true);
    });

    it('handles signin.rejected', () => {
      const state = authReducer(undefined, { type: signin.rejected.type });
      expect(state.signinError).toBe(true);
    });

    it('handles googleAuthThunk.fulfilled', () => {
      const payload = { _id: 'user-1', userName: 'test' };
      const action = { type: googleAuthThunk.fulfilled.type, payload };
      const state = authReducer(undefined, action);
      expect(state.googleAuth).toEqual(payload);
      expect(state.authState).toBe(true);
    });

    it('handles googleAuthThunk.rejected', () => {
      const state = authReducer(undefined, { type: googleAuthThunk.rejected.type });
      expect(state.isErrorOnGoogleAuth).toBe(true);
    });

    it('handles checkAuthState.fulfilled with true', () => {
      const action = { type: checkAuthState.fulfilled.type, payload: true };
      const state = authReducer(undefined, action);
      expect(state.authState).toBe(true);
    });

    it('handles checkAuthState.fulfilled with false', () => {
      const action = { type: checkAuthState.fulfilled.type, payload: false };
      const state = authReducer(undefined, action);
      expect(state.authState).toBe(false);
    });

    it('handles deleteAccount.rejected', () => {
      const state = authReducer(undefined, { type: deleteAccount.rejected.type });
      expect(state.errorOnAccountDeletion).toBe(true);
    });
  });
});
