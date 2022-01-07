import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, set, get } from 'firebase/database';

import {
  signInWithPopup,
  browserPopupRedirectResolver,
  indexedDBLocalPersistence,
  browserLocalPersistence,
  initializeAuth,
  GoogleAuthProvider
} from 'firebase/auth';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/firestore';
import { firebaseConfig } from '../utils/firebaseConfig';
import { unixLocalTimeStartDate } from '../utils/datetime';
import { updateUserData } from '../slices/user-data.slice';

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const auth = initializeAuth(firebaseApp, {
  persistence: [indexedDBLocalPersistence, browserLocalPersistence]
});

export const signInWithGoogle = () => {
  return signInWithPopup(auth, new GoogleAuthProvider(), browserPopupRedirectResolver)
      .then(async (result) => {
        const userId = result.user.uid;
        const userInfo: any = await getPathValue(userId);
        if (!userInfo) {
          await setPathValue(userId, '', {
            streak: 0
          });
        }

        return {
          userId,
          userData: {
            streak: 0,
            receivedStreak: {},
            completedParts: {},
            completedDate: {},
            ...(userInfo || {})
          }
        };
      })
      .catch(error => error);
};

// region Database Realtime
const database = getDatabase(firebaseApp);
const dbRef = ref(database);

export const getPathValue = (userId: string, path?: string) => {
  return get(child(dbRef, `users/${userId}/${path || ''}`)).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null;
    }
  }).catch((error) => error);
};

export const setPathValue = (userId: string, path: string, value: number | string | Record<string, any>) => {
  return set(ref(database, `users/${userId}/${path || ''}`), value)
      .then(() => true)
      .catch((error) => error);
};

// endregion