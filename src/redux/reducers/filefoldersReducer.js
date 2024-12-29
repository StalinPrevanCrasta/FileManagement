// src/reducers/filefoldersReducer.js
import * as types from '../actionsTypes/filefolderActionTypes';
const initialState = {
    isLoading: false,
    currentFolder: "root",
    userFolders: [],
    userFiles: [],
    adminFolders: [],
    adminFiles: [],
};

const filefoldersReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.CREATE_FOLDER:
            return{
                ...state,
                userFolders: [...state.userFolders, action.payload]
            };
           
        default:
            return state;
    }
};


export default filefoldersReducer;
