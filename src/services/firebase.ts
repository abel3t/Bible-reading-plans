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

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const auth = initializeAuth(firebaseApp, {
  persistence: [indexedDBLocalPersistence, browserLocalPersistence]
});

export const signInWithGoogle = () => {
  return signInWithPopup(auth, new GoogleAuthProvider(), browserPopupRedirectResolver)
      .then(async (result) => {
        const startOfDayUnix = unixLocalTimeStartDate();
        const startOfYesterdayUnix = startOfDayUnix - 86400;
        const userId = result.user.uid;
        const userInfo: any = await getPathValue(`users/${userId}`);
        const yesterdayReceivedStreak: any = await getPathValue(`receivedStreaks/${userId}/${startOfDayUnix}`);
        const todayReceivedStreak: any = await getPathValue(`receivedStreaks/${userId}/${startOfYesterdayUnix}`);

        const receivedStreaks = {
          [startOfYesterdayUnix]: yesterdayReceivedStreak || false,
          [startOfDayUnix]: todayReceivedStreak || false
        };

        if (yesterdayReceivedStreak === null) {
          setPathValue(`receivedStreaks/${userId}/${startOfYesterdayUnix}`, false).then(() => true);
        }

        if (todayReceivedStreak === null) {
          await setPathValue(`receivedStreaks/${userId}/${startOfDayUnix}`, false).then(() => true);
        }

        if (!userInfo) {
          setPathValue(`users/${userId}`, { streak: 0 }).then(() => true);
        }

        return {
          userId,
          userData: {
            streak: 0,
            completedParts: {},
            completedDate: {},
            ...(userInfo || {})
          },
          receivedStreaks
        };
      })
      .catch(error => {
        console.log(error);
        return {};
      });
};

// region Database Realtime
const database = getDatabase(firebaseApp);
const dbRef = ref(database);

export const getPathValue = (path: string) => {
  return get(child(dbRef, path)).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null;
    }
  }).catch((error) => error);
};

export const setPathValue = (path: string, value: number | string | boolean | Record<string, any>) => {
  return set(ref(database, path), value)
      .then(() => true)
      .catch((error) => error);
};

// endregion