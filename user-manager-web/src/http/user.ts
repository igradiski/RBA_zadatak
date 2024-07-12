import { UserData } from '../types/userTypes';
import axiosInstance from './axiosInstance';

export const loginUser = async (data: UserData) => {
  var response = await axiosInstance.post('/manager/api/auth/signin', data);
  return response.data;
};

export const registerUser = async (data: UserData) => {
  var response = await axiosInstance.post('/manager/api/auth/signup', data);
  return response.data;
};

export const reissueTokens = async (refToken: any) => {
  var response = await axiosInstance.post(
    `/manager/api/auth/refreshToken/${refToken}`,
  );
  return response.data;
};
