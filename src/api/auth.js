import {
  AuthErrorCodes,
  getAuth,
  createUserWithEmailAndPassword,
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
    case AuthErrorCodes.EMAIL_EXISTS:
      return 'email already in use';
    case AuthErrorCodes.WEAK_PASSWORD:
      return 'Please set the password more than 6 characters';
    default:
      return 'Failed';
  }
};

export const signIn = async ({ email, password }) => {
  const { user } = await signInWithEmailAndPassword(getAuth(), email, password);
  return user;
};

export const signUp = async ({ email, password }) => {
  const { user } = await createUserWithEmailAndPassword(
    getAuth(),
    email,
    password
  );
  return user;
};
