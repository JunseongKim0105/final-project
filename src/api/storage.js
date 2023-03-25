import { getAuth } from 'firebase/auth';
import { getDownloadURL, getStorage, uploadBytes, ref } from 'firebase/storage';

export const uploadPhoto = async (uri) => {
  try {
    // If the URI starts with "https", assume it's already a remote URL and return it as is
    if (uri.startsWith('https')) {
      return uri;
    }

    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log('blob error:', e);
        reject(new Error('Failed to upload picture'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });

    const filename = uri.split('/').pop();
    const storageRef = ref(
      getStorage(),
      `/${getAuth().currentUser.uid}/${filename}`
    );
    await uploadBytes(storageRef, blob);

    blob.close();

    const downloadURL = await getDownloadURL(storageRef);

    return downloadURL;
  } catch (e) {
    throw new Error('Failed to upload picture');
  }
};
