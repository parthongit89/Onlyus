import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../shared/types';

interface AuthSliceState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
}

const initialAuthState: AuthSliceState = {
  user: null,
  isAuthenticated: false,
  token: localStorage.getItem('onlyus_token'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem('onlyus_token', action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('onlyus_token');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
