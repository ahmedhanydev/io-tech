import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

export interface UiState {
  language: 'en' | 'ar';
  isSearchOpen: boolean;
}

const initialState: UiState = {
  language: 'en',
  isSearchOpen: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<'en' | 'ar'>) => {
      state.language = action.payload;
    },
    setSearchOpen: (state, action: PayloadAction<boolean>) => {
        state.isSearchOpen = action.payload;
    }
  },
});

export const { setLanguage, setSearchOpen } = uiSlice.actions;

export const selectLanguage = (state: RootState) => state.ui.language;
export const selectIsSearchOpen = (state: RootState) => state.ui.isSearchOpen;

export default uiSlice.reducer;