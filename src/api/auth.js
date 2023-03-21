import {
  AuthErrorCodes,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';

export const getAuthErrorMessages = (errorCode) => {
  switch (errorCode) {
    case AuthErrorCodes.USER_DELETED:
      return 'cannot found user.';
    case AuthErrorCodes.INVALID_EMAIL:
      return 'Invalid Email.';
    case AuthErrorCodes.INVALID_PASSWORD:
      return 'Invalid Password.';
    default:
      return 'Failed';
  }
};

export const signIn = async ({ email, password }) => {
  const { user } = await signInWithEmailAndPassword(getAuth(), email, password);
  return user;
};
