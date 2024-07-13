import { PageableSpring } from '../types/Pageable';
import { PersonData } from '../types/PersonTypes';
import axiosInstance from './axiosInstance';

export const createPerson = async (person: PersonData) => {
  var response = await axiosInstance.post('/manager/api/person', person);
  return response.data;
};

export const getPersons = async (data: PageableSpring) => {
  var response = await axiosInstance.get('/manager/api/person/all', {
    params: data,
  });
  return response.data;
};

export const getPersonByOib = async (oib: String) => {
  var response = await axiosInstance.get(`/manager/api/person/${oib}`);
  return response.data;
};

export const deletePersonByOib = async (oib: String) => {
  var response = await axiosInstance.delete(`/manager/api/person/${oib}`);
  return response.data;
};
