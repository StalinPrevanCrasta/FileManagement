// src/reducers/filefoldersReducer.js
const initialState = {
    isLoading: false,
    currentFolder: "",
    userFolders: [],
    userFiles: [],
    adminFolders: [],
    adminFiles: [],
};

const filefoldersReducer = (state = initialState, action) => {
    switch (action.type) {
        case "TEST_ACTION":
            return {
                ...state,
                currentFolder: action.payload,
            };
        default:
            return state;
    }
};


export default filefoldersReducer;
