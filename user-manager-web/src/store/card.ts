import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { CardService, PersonService, UserService } from '../http';
import { PersonData } from '../types/PersonTypes';
import { PageableSpring } from '../types/Pageable';
import { SpringPageableType } from '../types/SpringPageableType';

const initialState = {};

export const addCardThunk = createAsyncThunk(
  'card/add',
  async (data: PersonData) => {
    await CardService.createCard(data);
  },
);
const cardSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<{}>) => {},
});

const { actions, reducer } = cardSlice;
export const {} = actions;
export { reducer as cardReducer };
