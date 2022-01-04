import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../settings/store';

export type UserDataState = {
  userData: {
    streak: number,
    receivedStreak: Record<string, boolean>,
    completedDate: Record<string, boolean>,
    completedParts: Record<string, Record<string, boolean>>
  }
};

const initialState: UserDataState = {
  userData: {
    streak: 0,
    receivedStreak: {},
    completedParts: {},
    completedDate: {}
  }
};

export const UserDateSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    updateUserData: (state, action: PayloadAction<any>) => {
      state.userData = {
        ...action.payload
      };
    }
  }
});

export const { updateUserData } = UserDateSlice.actions;
export const getUserData = (state: RootState) => state.userData.userData;
export default UserDateSlice.reducer;