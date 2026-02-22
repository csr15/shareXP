export interface UserDetails {
  _id?: string;
  userName: string;
  sureName: string;
  mail?: string;
  following: string[];
  facebook: string;
  linkedIn: string;
  link: string;
  workingStatus: string;
  description: string;
  avatar: string;
  notifications: Notification[];
}

export interface Notification {
  _id: string;
  uid: string;
  userName: string;
  authorId: string;
  content: string;
  createdAt: string;
  storyId: string;
  storyTitle: string;
}

export interface AuthState {
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

export interface SigninPayload {
  data: {
    mail: string;
    password: string;
  };
}

export interface SignupPayload {
  data: {
    userName: string;
    sureName: string;
    mail: string;
    password: string;
  };
}
