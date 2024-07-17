import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import { CardService } from '../http';
import { PersonData } from '../types/PersonTypes';

const initialState = {};

export const addCardThunk = createAsyncThunk(
  'card/add',
  async (data: PersonData) => {
    await CardService.createCard(data);
  },
);
const cardSlice = createSlice({
  name: 'card',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<{}>) => {},
});

const { actions, reducer } = cardSlice;
export const {} = actions;
export { reducer as cardReducer };
