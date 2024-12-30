import * as types from "../actionsTypes/filefolderActionTypes";
import fire from "../../config/firebase";

// Set Loading
const setLoading = (status) => ({
  type: types.SET_LOADING,
  payload: status,
});

// Add File to Redux
const addFile = (payload) => ({
  type: types.CREATE_FILE,
  payload,
});

// Add Files to Redux
const addFiles = (payload) => ({
  type: types.ADD_FILE,
  payload,
});

// Get Files
export const getFiles = (userId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const filesRef = fire.firestore().collection("files");
    const files = await filesRef.where("userId", "==", userId).get();

    const filesData = files.docs.map((file) => ({
      data: file.data(),
      docId: file.id,
    }));

    dispatch({
      type: types.GET_FILES,
      payload: filesData,
    });
    dispatch(setLoading(false));
  } catch (error) {
    console.error("Error getting files:", error);
    
    dispatch(addFiles(filesData));
  }
};

// Create File
export const createFile = (data, setSuccess) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const filesRef = fire.firestore().collection("files");

    // Check if the file already exists in the same folder for the user
    const existingFiles = await filesRef
      .where("name", "==", data.name)
      .where("parent", "==", data.parent)
      .where("userId", "==", data.userId)
      .get();

    if (!existingFiles.empty) {
      alert("A file with this name already exists in the current folder.");
      dispatch(setLoading(false));
      setSuccess(false);
      return;
    }

    // Add the file to Firebase
    const fileRef = await filesRef.add(data);

    // Fetch the newly created file data from Firebase
    const fileData = await fileRef.get();

    const newFile = {
      data: fileData.data(),
      docId: fileRef.id,
    };

    // Dispatch to Redux store
    dispatch(addFile(newFile));

    alert("File created successfully!");
    setSuccess(true);
    dispatch(setLoading(false));
  } catch (error) {
    console.error("Error creating file:", error);
    alert("Error creating file. Please try again.");
    setSuccess(false);
    dispatch(setLoading(false));
  }
};
