import { configureStore } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/lib/persistReducer';
import { combineReducers } from 'redux';
import { useDispatch } from 'react-redux';
import logger from 'redux-logger';
import storageSession from 'reduxjs-toolkit-persist/lib/storage/session';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistStore,
} from 'redux-persist';
import { userReducer } from './user';
import { personReducer } from './person';
import { cardReducer } from './card';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: storageSession,
  whitelist: ['user'],
};

const userPersistConfig = {
  key: 'user',
  storage: storageSession,
};

const rootReducer = persistReducer(
  persistConfig,
  combineReducers({
    user: persistReducer(userPersistConfig, userReducer),
    person: personReducer,
    card: cardReducer,
  }),
);

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logger as any),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
export const useAppDispatch = () => useDispatch<AppDispatch>(); // Export a hook that can be reused to resolve types
