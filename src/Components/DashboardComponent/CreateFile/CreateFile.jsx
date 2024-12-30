import React, { useState } from "react";
import {FontAwsomeIcon} from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector,shallowEqual } from "react-redux";
//import { createFolder } from "../../../redux/actionCreators/filefolderActionCreator";

const CreateFile = ({setIsCreateFileModalOpen}) => {
  const [fileName, setFileName] = useState("");
 

  // Get current user from Redux state
  const { user,userFile,currentFile,currentFileData } = useSelector
  (state => ({
    userFiles:state.filefolders.userFiles,
    user:state.auth.user,
    currentFolder:state.filefolders.currentFolder,
    currentFolderData:state.filefolders.userFolders.find
    (folder => folder.docId === state.filefolders.currentFolder),


  }),
  shallowEqual
);
const dispatch = useDispatch();
const checkFileAlreadyPresent = (name)=>{
  const filePresent =userFiles
  .filter((file)=>file.data.parent === currentFolder)
  .find((fldr)=>fldr.data.name === name);
  if (filePresent){
    return true;
  }else{
    return false;
  }
}

const handleSubmit = (e) => {
  e.preventDefault();
  if(fileName){
  if (fileName.length>3) {
    //check file extensions
    let extension= true;
    if(fileName.split(".").length>1){
       extension = "txt";
    }
    if(!checkFolderAlreadyPresent(fileName)){
    // Create folder data with the correct parent
      const data = {
      name: extension? fileName:`${fileName}`+".txt",
      userId: user.uid,
      createdBy:user.displayName,
      path:
      currentFolder ==="root"
      ?[]
      :[...currentFolderData?.data.path,currentFolder],

      parent: currentFolder, 
      createdAt: new Date(),
      lastAccessed:null,
      updatedAt :new Date(),
    };
    //dispatch(createFolder(data));
    console.log("data",data);
  }else{
    alert("File with the same name already exists");
  }
}else{
  alert("File name should be atleast 4 characters long");
}
} else {
    alert("File name cannot be empty");
  }
};
       

  return (
    <div className="col-md-12 p-3">
      <h4 className="text-center mb-4">
        Create New Folder {folderId ? `in Folder ${folderId}` : "in Root"}
      </h4>
      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="folderName"
            placeholder="Enter Folder Name"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            autoFocus
          />
        </div>
        <div className="text-center mt-3">
          <button type="submit" className="btn btn-primary mx-2">
            Create Folder
          </button>
          <button 
            type="button" 
            className="btn btn-secondary mx-2"
            onClick={() => navigate(-1)} // Go back to previous page
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateFile;
