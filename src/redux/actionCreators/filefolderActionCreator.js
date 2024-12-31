import * as types from "../actionsTypes/filefolderActionTypes";
import fire from "../../config/firebase";

// Set Loading
const setLoading = (status) => ({
  type: types.SET_LOADING,
  payload: status,
});

// Add Folder to Redux
const addFolder = (payload) => ({
  type: types.CREATE_FOLDER,
  payload,
});

// Change Folder
export const changeFolder = (folderId) => ({
  type: types.CHANGE_FOLDER,
  payload: folderId,
});

// Create File
export const createFile = (data, setSuccess) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const filesRef = fire.firestore().collection("files");

    // Check if a file with the same name exists in the same parent directory
    const existingFiles = await filesRef
      .where("name", "==", data.name)
      .where("parent", "==", data.parent)
      .where("userId", "==", data.userId)
      .get();

    if (!existingFiles.empty) {
      alert("A file with this name already exists in the current directory.");
      dispatch(setLoading(false));
      setSuccess(false);
      return;
    }

    // Add the file to Firebase with the correct parent
    const fileRef = await filesRef.add({
      ...data,
      url: null,
      createdAt: new Date(),
      parent: data.parent || "root" // Ensure parent is set correctly
    });

    // Create the file data structure
    const newFile = {
      data: {
        ...data,
        url: null,
        createdAt: new Date(),
        parent: data.parent || "root" // Ensure parent is set correctly
      },
      docId: fileRef.id,
    };

    // Dispatch to Redux store
    dispatch({
      type: types.CREATE_FILE,
      payload: newFile,
    });

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

// Create Folder
export const createFolder = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const foldersRef = fire.firestore().collection("folders");

    // Check if a folder with the same name exists in the same parent directory for the user
    const existingFolders = await foldersRef
      .where("name", "==", data.name)
      .where("parent", "==", data.parent)
      .where("userId", "==", data.userId)
      .get();

    if (!existingFolders.empty) {
      alert("A folder with this name already exists in the current directory.");
      dispatch(setLoading(false));
      return;
    }

    // Add the folder to Firebase
    const folderRef = await foldersRef.add(data);

    // Fetch the newly created folder data from Firebase
    const folderData = await folderRef.get();

    const newFolder = {
      data: folderData.data(),
      docId: folderRef.id,
    };

    // Dispatch the new folder to Redux
    dispatch(addFolder(newFolder));

    alert("Folder created successfully!");
    dispatch(setLoading(false));
  } catch (error) {
    console.error("Error creating folder:", error);
    alert("Error creating folder. Please try again.");
    dispatch(setLoading(false));
  }
};

// Get Folders
export const getFolders = (userId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const folders = await fire
      .firestore()
      .collection("folders")
      .where("userId", "==", userId)
      .get();

    const foldersData = folders.docs.map(folder => ({
      data: folder.data(),
      docId: folder.id,
    }));

    dispatch({
      type: types.GET_FOLDERS,
      payload: foldersData,
    });
    dispatch(setLoading(false));
  } catch (error) {
    console.error("Error getting folders:", error);
    dispatch(setLoading(false));
  }
};

// Get Files
export const getFiles = (userId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const files = await fire
      .firestore()
      .collection("files")
      .where("userId", "==", userId)
      .get();

    const filesData = files.docs.map(file => ({
      data: file.data(),
      docId: file.id,
    }));

    dispatch({
      type: types.ADD_FILE,
      payload: filesData,
    });
    dispatch(setLoading(false));
  } catch (error) {
    console.error("Error getting files:", error);
    dispatch(setLoading(false));
  }
};
