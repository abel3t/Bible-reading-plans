import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../settings/store';

export type UserDataState = {
  userData: {
    streak: number,
    completedDate: Record<string, boolean>
  }
};

const initialState: UserDataState = {
  userData: {
    streak: 0,
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