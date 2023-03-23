import { getAuth } from 'firebase/auth';
import { getDownloadURL, getStorage, uploadBytes, ref } from 'firebase/storage';

export const uploadPhoto = async (uri) => {
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
      reject(new Error('Picture upload is failed'));
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

  await getDownloadURL(storageRef);

  return uri;
};
