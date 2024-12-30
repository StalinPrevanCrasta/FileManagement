import * as types from "../actionsTypes/filefolderActionTypes";
import fire from "../../config/firebase";

// Set Loading
const setLoading = (status) => ({
  type: types.SET_LOADING,
  payload: status,
});
//files
const addFiles = (payload) => ({
  type:types.ADD_FILE,
  payload,

})
const addFile =(payload)=>({
  type:types.CREATE_FILE,
  payload,
})

// Create Folder
export const createFolder = (data) => {
  return async (dispatch) => {
    try {
      console.log("Dispatching createFolder with data:", data);
      dispatch(setLoading(true));

      // First check if folder exists
      const foldersRef = fire.firestore().collection("folders");
      const existingFolders = await foldersRef
        .where("name", "==", data.name)
        .where("parent", "==", data.parent)
        .where("userId", "==", data.userId)
        .get();

      if (!existingFolders.empty) {
        dispatch(setLoading(false));
        alert("Folder with this name already exists!");
        return false;
      }

      // Create the folder data to be saved
      const folderData = {
        name: data.name,
        userId: data.userId,
        parent: data.parent, // This should be the folderId or "root"
        createdAt: new Date(),
      };

      console.log("Saving folder with data:", folderData); // Debug log

      // Add the folder to Firebase
      const folderRef = await foldersRef.add(folderData);

      // Create the folder data structure for Redux
      const folderForRedux = {
        data: folderData,
        docId: folderRef.id,
      };

      // Dispatch to Redux store
      dispatch({
        type: types.CREATE_FOLDER,
        payload: folderForRedux,
      });

      // Refresh folders
      dispatch(getFolders(data.userId));
      
      dispatch(setLoading(false));
      alert("Folder created successfully!");
      dispatch({ type: "CREATE_FOLDER_SUCCESS", payload: folderForRedux });
      return true;
    } catch (error) {
      console.error("Error in createFolder action:", error);
      dispatch(setLoading(false));
      alert("Error creating folder!");
      dispatch({ type: "CREATE_FOLDER_FAILURE", payload: error });
      return false;
    }
  };
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

// Change Folder
export const changeFolder = (folderId) => ({
  type: types.CHANGE_FOLDER,
  payload: folderId,
});

//files
 export const getFiles = (userId) => (dispatch) =>{
  console.log,og(userId);
 }
 export const createFile =(data) => (dispatch) =>{
    console.log(data);
 }