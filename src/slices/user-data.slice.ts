import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'settings/store';

export type UserDataState = {
  userData: {
    streak: number,
    completedDate: Record<string, boolean>,
    completedParts: Record<string, Record<string, boolean>>
  },
  receivedStreaks: Record<string, boolean>,
  isAuthenticated: boolean
};

const initialState: UserDataState = {
  userData: {
    streak: 0,
    completedParts: {},
    completedDate: {}
  },
  receivedStreaks: {},
  isAuthenticated: false
};

export const UserDateSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    updateUserData: (state, action: PayloadAction<any>) => {
      state.userData = {
        ...action.payload
      };
    },
    updateReceivedStreaks: (state, action: PayloadAction<any>) => {
      state.receivedStreaks = {
        ...action.payload
      };
    },
    updateIsAuthenticated:  (state, action: PayloadAction<any>) => {
      state.isAuthenticated = action.payload;
    },
    resetUserData:  (state) => {
      state = initialState;
    }
  }
});

export const { updateUserData, updateReceivedStreaks, updateIsAuthenticated, resetUserData } = UserDateSlice.actions;
export const getUserData = (state: RootState) => state.userData.userData;
export const getReceivedStreaks = (state: RootState) => state.userData.receivedStreaks;
export const getIsAuthenticated = (state: RootState) => state.userData.isAuthenticated;
export default UserDateSlice.reducer;