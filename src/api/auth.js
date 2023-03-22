import {
  AuthErrorCodes,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged as onAuthStateChangedFirebase,
  signOut as signOutFirebase,
  updateProfile,
} from 'firebase/auth';

const PHOTO_URL =
  'https://firebasestorage.googleapis.com/v0/b/final-project-2e1ae.appspot.com/o/profile.png?alt=media';

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

export const onAuthStateChanged = (callback) => {
  return onAuthStateChangedFirebase(getAuth(), callback);
};

export const signOut = async () => {
  await signOutFirebase(getAuth());
};

export const updateUserInfo = async (userInfo) => {
  try {
    await updateProfile(getAuth().currentUser, userInfo);
  } catch (e) {
    throw new Error('profile update is failed.');
  }
};
