import * as types from "../actionsTypes/filefolderActionTypes";

const initialState = {
  userFolders: [],
  userFiles: [],
  currentFolder: "root",
  loading: false,
};

const filefolderReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.MOVE_FILE:
      return {
        ...state,
        userFiles: state.userFiles.map(file =>
          file.docId === action.payload.fileId
            ? { ...file, data: { ...file.data, parent: action.payload.targetFolderId } }
            : file
        ),
      };
    default:
      return state;
  }
};

export default filefolderReducer;
