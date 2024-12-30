import * as types from "../actionsTypes/filefolderActionTypes"; // Corrected spelling from 'tyoes' to 'types'
import fire from "../../config/firebase";

// Action to add a folder
const addFolder = (payload) => ({
  type: types.CREATE_FOLDER, // Using the correct action type from the action types file
  payload,
});

const addFolders = (payload) => ({
  type: types.ADD_FOLDER, // Using the correct action type from the action types file
  payload,
});

const setLoading = (payload) => ({
  type: types.SET_LOADING, // Using the correct action type from the action types file
  payload,
});
const setchangeFolder = (payload) => ({
  type: types.CHANGE_FOLDER, // Using the correct action type from the action types file
  payload,
});


// Action creator to create a folder
export const createFolder = (data) => (dispatch) => {
  dispatch(setLoading(true)); // Optional: Set loading state for folder creation

  fire
    .firestore()
    .collection("folders")
    .add(data)
    .then((folder) => {
      folder.get().then((doc) => {
        const folderData = doc.data();
        dispatch(addFolder(folderData)); // Dispatch action after successful folder creation
        dispatch(setLoading(false)); // End loading after folder creation
        alert("Folder created successfully!");
      });
    })
    .catch((error) => {
      console.error("Error creating folder: ", error);
      dispatch(setLoading(false)); // End loading in case of error
      alert("Failed to create folder. Please try again.");
    });
};

// Action creator to fetch folders
export const getFolders = (userId) => (dispatch) => {
  dispatch(setLoading(true)); // Set loading state when fetching folders

  fire
    .firestore()
    .collection("folders")
    .where("userId", "==", userId)
    .get()
    .then((folders) => {
      const foldersData = folders.docs.map((folder) => folder.data());
      dispatch(addFolders(foldersData)); // Dispatch action with fetched folder data
      dispatch(setLoading(false)); // End loading after data is fetched
    })
    .catch((error) => {
      console.error("Error fetching folders: ", error);
      dispatch(setLoading(false)); // End loading in case of error
      alert("Failed to fetch folders. Please try again.");
    });
};
export const changeFolder = (folder) => (dispatch) => {
  dispatch(setchangeFolder(folder)); // Dispatch action to change folder
}
