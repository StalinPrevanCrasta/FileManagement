import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import fileFolderReducer from './reducers/fileFolderReducer';

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
