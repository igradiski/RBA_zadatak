import { PersonData } from '../types/PersonTypes';
import axiosInstance from './axiosInstance';

export const createPerson = async (person: PersonData) => {
  var response = await axiosInstance.post('/manager/api/person', person);
  return response.data;
};
