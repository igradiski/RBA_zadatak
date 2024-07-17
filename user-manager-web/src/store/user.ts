import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { UserData } from '../types/userTypes';
import { UserService } from '../http';
import { TokenType } from '../types/TokenType';

const initialState = {
  data: {
    email: '',
    refreshToken: '',
    role: [],
    accessToken: '',
    userName: '',
  },
  authenticated: false,
};

export const handleUserLogin = createAsyncThunk(
  'user/login',
  async (data: UserData) => {
    return UserService.loginUser(data);
  },
);

export const handleRegisterUser = createAsyncThunk(
  'user/register',
  async (data: UserData) => {
    await UserService.registerUser(data);
  },
);

export const handleTokenRefresh = createAsyncThunk(
  'user/refresh',
  async (refreshToken: string) => {
    const tokens: TokenType = await UserService.reissueTokens(refreshToken);
    return tokens;
  },
);

export const clearAuthenticationState = createAsyncThunk(
  'jwt/clearAuthenticationState',
  async (args, { dispatch }) => {
    dispatch(clearUser());
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    clearUser: () => {
      return initialState;
    },
    saveTokens: (state, action) => {
      const { accessToken, refreshToken } = action.payload;
      state.data.accessToken = accessToken;
      state.data.refreshToken = refreshToken;
      return state;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<{}>) => {
    builder.addCase(
      handleUserLogin.fulfilled,
      (state, action: PayloadAction<UserData>) => {
        return {
          ...state,
          data: action.payload,
          authenticated: true,
        };
      },
    );
    builder.addCase(handleUserLogin.pending, state => {
      return {
        authenticated: false,
      };
    });
    builder.addCase(handleUserLogin.rejected, state => {
      return {
        authenticated: false,
      };
    });
  },
});

const { actions, reducer } = userSlice;
export const { clearUser, saveTokens } = actions;
export { reducer as userReducer };
