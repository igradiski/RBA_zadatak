import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { UserData } from "../types/userTypes";
import { PersonService, UserService } from "../http";
import { TokenType } from "../types/TokenType";
import { PersonData } from "../types/PersonTypes";
import { PageableSpring } from "../types/Pageable";
import { SpringPageableType } from "../types/SpringPageableType";

const initialState = {
  pageableData: {
    content: [],
    pageable: {
      pageSize: 10,
    },
    totalElements: 0,
  } as SpringPageableType,
  content: [],
};

export const addPersonThunk = createAsyncThunk(
  "person/add",
  async (data: PersonData) => {
    await PersonService.createPerson(data);
  }
);

export const fetchPersonsThunk = createAsyncThunk(
  "person/get",
  async (data: PageableSpring) => {
    return PersonService.getPersons(data);
  }
);
const personSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<{}>) => {
    builder.addCase(
      fetchPersonsThunk.fulfilled,
      (state, action: PayloadAction<SpringPageableType>) => {
        console.log(action);
        return {
          ...state,
          pageableData: action.payload as SpringPageableType,
          content: action.payload.content,
        };
      }
    );
  },
});

const { actions, reducer } = personSlice;
export const {} = actions;
export { reducer as personReducer };
