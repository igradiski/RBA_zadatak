import axios from 'axios';
import { store } from '../store';
import { TokenType } from '../types/TokenType';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import {
  clearAuthenticationState,
  handleTokenRefresh,
  saveTokens,
} from '../store/user';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8085', // or your actual API URL
  headers: {
    'Content-Type': 'application/json', // other headers if needed
  },
});

// Authorization interceptor
axiosInstance.interceptors.request.use(async request => {
  if (
    request.url === '/manager/api/auth/signin' ||
    request.url === '/manager/api/auth/signup'
  ) {
    return request;
  }
  const accessToken = store.getState().user.data.accessToken;
  if (accessToken !== undefined) {
    request.headers!['Authorization'] = `Bearer ${accessToken}`;
  }
  return request;
});

// Jwt refresh interceptor
const authRefreshCallback = async (failedRequest: any) => {
  try {
    var refreshToken: string = store.getState().user.data.refreshToken;
    const tokens: TokenType = await store
      .dispatch(handleTokenRefresh(refreshToken))
      .unwrap();
    failedRequest.response.config.headers[
      'Authorization'
    ] = `Bearer ${tokens.accessToken}`;
    store.dispatch(saveTokens(tokens));
    return Promise.resolve();
  } catch (error) {
    store.dispatch(clearAuthenticationState());
    return Promise.reject(failedRequest);
  }
};

createAuthRefreshInterceptor(axiosInstance, authRefreshCallback, {
  pauseInstanceWhileRefreshing: true,
  statusCodes: [401, 403],
});

export default axiosInstance;
