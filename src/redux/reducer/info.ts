import { createSlice } from '@reduxjs/toolkit';
import { AppState } from 'redux/store';
import { HYDRATE } from 'next-redux-wrapper';
import { InfoStateType, LoginStatus } from 'redux/types/reducerTypes';
import { WalletType } from 'types';

const initialState: InfoStateType = {
  isMobile: false,
  baseInfo: {
    rpcUrl: '',
  },
  theme: 'light',
  walletInfo: null,
  walletType: WalletType.unknown,
  accountInfoSync: null,
  loginStatus: LoginStatus.UNLOGIN,
};

// Actual Slice
export const infoSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {
    setIsMobile(state, action) {
      state.isMobile = action.payload;
    },
    setWalletInfo(state, action) {
      state.walletInfo = action.payload;
    },
    setWalletType(state, action) {
      state.walletType = action.payload;
    },
    setLoginStatus(state, action) {
      state.loginStatus = action.payload;
    },
    setAccountInfoSync(state, action) {
      state.accountInfoSync = action.payload;
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.info,
      };
    },
  },
});

export const { setIsMobile, setLoginStatus, setWalletInfo, setAccountInfoSync } = infoSlice.actions;
export const selectInfo = (state: AppState) => state.info;
export default infoSlice.reducer;
