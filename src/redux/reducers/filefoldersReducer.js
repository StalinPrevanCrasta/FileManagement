// src/reducers/filefoldersReducer.js
import * as types from '../actionsTypes/filefolderActionTypes';

const initialState = {
    isLoading: false,
    currentFolder: "root",
    userFolders: [],
    userFiles: [],
};

const filefoldersReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.CREATE_FOLDER:
            return {
                ...state,
                userFolders: [...state.userFolders, action.payload],
            };
            
        case types.GET_FOLDERS:
            return {
                ...state,
                userFolders: action.payload,
                isLoading: false,
            };
            
        case types.CHANGE_FOLDER:
            return {
                ...state,
                currentFolder: action.payload,
            };
            
        case types.SET_LOADING:
            return {
                ...state,
                isLoading: action.payload,
            };
        case types.ADD_FILE:
            return {
                ...state,
                userFiles: action.payload,
            };
        case types.CREATE_FILE:
            return {
                ...state,
                userFiles: [...state.userFiles, action.payload],
            };
        case types.MOVE_FOLDER:
            const { folderId, targetParentId } = action.payload;
            return {
                ...state,
                userFolders: state.userFolders.map(folder =>
                    folder.docId === folderId ? { ...folder, data: { ...folder.data, parent: targetParentId } } : folder
                ),
            };
        case types.MOVE_FILE:
            return {
                ...state,
                userFiles: state.userFiles.map(file =>
                    file.docId === action.payload.fileId
                        ? { ...file, data: { ...file.data, parent: action.payload.targetFolderId } }
                        : file
                ),
            };
        case types.DELETE_FOLDER:
            return {
                ...state,
                userFolders: state.userFolders.filter(
                    folder => folder.docId !== action.payload
                ),
            };
        case types.DELETE_FILE:
            return {
                ...state,
                userFiles: state.userFiles.filter(
                    file => file.docId !== action.payload
                ),
            };
        case types.UPDATE_FILE:
            return {
                ...state,
                userFiles: state.userFiles.map(file =>
                    file.docId === action.payload.docId
                        ? { ...file, data: action.payload.data }
                        : file
                ),
            };
            
        default:
            return state;
    }
};

export default filefoldersReducer;
