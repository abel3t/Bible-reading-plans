import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../settings/store';

export type SettingsState = {
  settings: {
    startDate: number | Date
  }
};

const initialState: SettingsState = {
  settings: {
    startDate: new Date()
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
    }
  }
});

export const { updateSettings } = settingsSlice.actions;
export const getSettings = (state: RootState) => state.settings.settings;
export default settingsSlice.reducer;