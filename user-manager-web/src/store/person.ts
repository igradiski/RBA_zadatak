import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { UserData } from '../types/userTypes';
import { PersonService, UserService } from '../http';
import { TokenType } from '../types/TokenType';
import { PersonData } from '../types/PersonTypes';
const initialState = {};

export const addPerson = createAsyncThunk(
  'person/add',
  async (data: PersonData) => {
    await PersonService.createPerson(data);
  },
);

const personSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<{}>) => {},
});

const { actions, reducer } = personSlice;
export const {} = actions;
export { reducer as personReducer };
