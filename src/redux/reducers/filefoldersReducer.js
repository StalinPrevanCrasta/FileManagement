// src/reducers/filefoldersReducer.js
import * as types from '../actionsTypes/filefolderActionTypes';
const initialState = {
    isLoading: true,
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
        case types.ADD_FOLDER:
            return{
                ...state,
                userFolders: action.payload,
            };
        case types.SET_LOADING:
                return{
                    ...state,
                    isLoading: action.payload
                };
        case types.CHANGE_FOLDER:
            return{
                ...state,
                currentFolder: action.payload,
            };
           
        default:
            return state;
    }
};


export default filefoldersReducer;
