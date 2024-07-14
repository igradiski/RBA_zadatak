import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { PersonService, UserService } from '../http';
import { PersonData } from '../types/PersonTypes';
import { PageableSpring } from '../types/Pageable';
import { SpringPageableType } from '../types/SpringPageableType';

const initialState = {
  pageableData: {
    content: [],
    pageable: {
      pageSize: 10,
    },
    totalElements: 0,
  } as SpringPageableType,
  content: [],
  foundPerson: {},
};

export const addPersonThunk = createAsyncThunk(
  'person/add',
  async (data: PersonData) => {
    await PersonService.createPerson(data);
  },
);

export const fetchPersonsThunk = createAsyncThunk(
  'person/get',
  async (data: PageableSpring) => {
    return PersonService.getPersons(data);
  },
);

export const fetchPersonByOibThunk = createAsyncThunk(
  'person/getByOib',
  async (oib: String) => {
    return PersonService.getPersonByOib(oib);
  },
);

export const deletePersonByOibThunk = createAsyncThunk(
  'person/deleteByOib',
  async (oib: String) => {
    return await PersonService.deletePersonByOib(oib);
  },
);

const personSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<{}>) => {
    builder.addCase(
      fetchPersonsThunk.fulfilled,
      (state, action: PayloadAction<SpringPageableType>) => {
        return {
          ...state,
          pageableData: action.payload as SpringPageableType,
          content: action.payload.content,
        };
      },
    );
    builder.addCase(fetchPersonByOibThunk.rejected, state => {
      return {
        ...state,
        foundPerson: {},
      };
    });
    builder.addCase(
      fetchPersonByOibThunk.fulfilled,
      (state, action: PayloadAction<SpringPageableType>) => {
        return {
          ...state,
          foundPerson: action.payload as PersonData,
        };
      },
    );
  },
});

const { actions, reducer } = personSlice;
export const {} = actions;
export { reducer as personReducer };
