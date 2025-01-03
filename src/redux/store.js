import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer.js';
import fileFolderReducer from './reducers/fileFolderReducer.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    filefolders: fileFolderReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export default store;
