import {
  configureStore
} from '@reduxjs/toolkit';

import settingsReducer from 'slices/settings.slice';
import userDataReducer from 'slices/user-data.slice';

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    userData: userDataReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;