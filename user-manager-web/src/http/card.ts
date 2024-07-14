import { PersonData } from '../types/PersonTypes';
import axiosInstance from './axiosInstance';

export const createCard = async (person: PersonData) => {
  var response = await axiosInstance.post('/manager/api/card', person);
  return response.data;
};
