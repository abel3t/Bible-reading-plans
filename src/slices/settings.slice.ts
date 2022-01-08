import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'settings/store';
import { unixStartDate } from '../utils/datetime';

export type SettingsState = {
  settings: {
    startDate: number | Date
  }
};

const initialState: SettingsState = {
  settings: {
    startDate: unixStartDate()
  }
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateSettings: (state, action: PayloadAction<any>) => {
      state.settings = {
        ...action.payload
      };
    },
    resetSettings: (state) => {
      state = initialState;
    }
  }
});

export const { updateSettings, resetSettings } = settingsSlice.actions;
export const getSettings = (state: RootState) => state.settings.settings;
export default settingsSlice.reducer;