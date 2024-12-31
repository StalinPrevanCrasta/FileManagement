import * as types from "../actionsTypes/filefolderActionTypes";
import fire from "../../config/firebase";
import "firebase/compat/storage"; // Add this import
import { MOVE_FILE } from "../actionsTypes/filefolderActionTypes";

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

// Upload File
export const uploadFile = (file, parentId, userId, path = '') => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    // Create a reference to Firebase Storage
    const storageRef = fire.storage().ref();
    
    // Use the full path if it's a folder upload, otherwise just the filename
    const storagePath = path || file.name;
    const fileRef = storageRef.child(`files/${userId}/${storagePath}`);
    
    // Set metadata
    const metadata = {
      contentType: file.type,
      customMetadata: {
        parent: parentId,
        userId: userId
      }
    };

    // Upload the file with metadata
    const snapshot = await fileRef.put(file, metadata);
    
    // Get the download URL
    const url = await snapshot.ref.getDownloadURL();

    // Add file data to Firestore
    const fileData = {
      name: file.name,
      url: url,
      userId: userId,
      parent: parentId,
      createdAt: new Date(),
      type: file.type,
      path: storagePath
    };

    const fileRef2 = await fire.firestore().collection("files").add(fileData);

    // Create file object for Redux
    const newFile = {
      data: fileData,
      docId: fileRef2.id
    };

    // Dispatch to Redux store
    dispatch({
      type: types.CREATE_FILE,
      payload: newFile
    });

    dispatch(setLoading(false));
    return true;
  } catch (error) {
    console.error("Error uploading file:", error);
    dispatch(setLoading(false));
    return false;
  }
};

// Add this function to handle moving folders
export const moveFolder = (folderId, targetParentId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const foldersRef = fire.firestore().collection("folders");

    // Update the parent of the folder
    await foldersRef.doc(folderId).update({ parent: targetParentId });

    // Dispatch an action to update the state
    dispatch({
      type: types.MOVE_FOLDER,
      payload: { folderId, targetParentId },
    });

    alert("Folder moved successfully!");
    dispatch(setLoading(false));
  } catch (error) {
    console.error("Error moving folder:", error);
    alert("Error moving folder. Please try again.");
    dispatch(setLoading(false));
  }
};

export const moveFile = (fileId, targetFolderId) => async (dispatch, getState) => {
  try {
    const state = getState();
    const file = state.filefolders.userFiles.find(file => file.docId === fileId);
    if (!file) throw new Error("File not found");

    console.log(`Moving file with ID: ${fileId} to folder with ID: ${targetFolderId}`);

    await fire.firestore().collection("files").doc(fileId).update({
      parent: targetFolderId
    });

    dispatch({
      type: MOVE_FILE,
      payload: { fileId, targetFolderId }
    });

    console.log(`File with ID: ${fileId} successfully moved to folder with ID: ${targetFolderId}`);
  } catch (error) {
    console.error("Error moving file:", error);
  }
};

// Delete Folder
export const deleteFolder = (folderId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    // Delete from Firestore
    await fire.firestore().collection("folders").doc(folderId).delete();

    // Update Redux state
    dispatch({
      type: types.DELETE_FOLDER,
      payload: folderId,
    });

    dispatch(setLoading(false));
    alert("Folder deleted successfully!");
  } catch (error) {
    console.error("Error deleting folder:", error);
    alert("Error deleting folder. Please try again.");
    dispatch(setLoading(false));
  }
};

// Delete File
export const deleteFile = (fileId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    // Get file data first to get the storage URL
    const fileDoc = await fire.firestore().collection("files").doc(fileId).get();
    const fileData = fileDoc.data();

    if (fileData && fileData.url) {
      // Delete from Storage
      const fileRef = fire.storage().refFromURL(fileData.url);
      await fileRef.delete();
    }

    // Delete from Firestore
    await fire.firestore().collection("files").doc(fileId).delete();

    // Update Redux state
    dispatch({
      type: types.DELETE_FILE,
      payload: fileId,
    });

    dispatch(setLoading(false));
    alert("File deleted successfully!");
  } catch (error) {
    console.error("Error deleting file:", error);
    alert("Error deleting file. Please try again.");
    dispatch(setLoading(false));
  }
};
