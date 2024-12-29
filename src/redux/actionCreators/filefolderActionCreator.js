import * as types from "../actionsTypes/filefolderActionTypes"; // Corrected spelling from 'tyoes' to 'types'
import fire from "../../config/firebase";

// Action to add a folder
const addFolder = (payload) => ({
  type: types.CREATE_FOLDER, // Using the correct action type from the action types file
  payload,
});

// Action creator to create a folder
export const createFolder = (data) => (dispatch) => {
  fire
    .firestore()
    .collection("folders")
    .add(data)
    .then(async(folder) => {
        const folderData = await ( await folder.get()).data();
      dispatch(addFolder(folderData)); // Dispatch action after successful folder creation
      alert("Folder created successfully!");
    })
    .catch((error) => {
      console.error("Error creating folder: ", error);
      // Optionally dispatch a failure action to handle errors
    });
};
