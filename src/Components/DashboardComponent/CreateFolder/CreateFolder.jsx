import React, { useState } from "react";
import {FontAwsomeIcon} from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector,shallowEqual } from "react-redux";
import { createFolder } from "../../../redux/actionCreators/filefolderActionCreator";

const CreateFolder = ({setIsCreateFolderModalOpen}) => {
  const [folderName, setFolderName] = useState("");
 

  // Get current user from Redux state
  const { user,userFolders,currentFolder,currentFolderData } = useSelector
  (state => ({
    userFolders:state.filefolders.userFolders,
    user:state.auth.user,
    currentFolder:state.filefolders.currentFolder,
    currentFolderData:state.filefolders.userFolders.find
    (folder => folder.docId === state.filefolders.currentFolder),


  }),
  shallowEqual
);
const dispatch = useDispatch();
const checkFolderAlreadyPresent = (name)=>{
  const folderPresent =userFolders
  .filter((folders)=>folders.data.parent === currentFolder)
  .find((fldr)=>fldr.data.name === name);
  if (folderPresent){
    return true;
  }else{
    return false;
  }
}

  const handleSubmit = (e) => {
    e.preventDefault();
    if(folderName){
    if (folderName.length>3) {
      if(!checkFolderAlreadyPresent(folderName)){
      // Create folder data with the correct parent
        const data = {
        name: folderName,
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
      dispatch(createFolder(data));
    }else{
      alert("Folder already present");
    }
  }else{
    alert("Folder name should be atleast 4 characters long");
  }
}else{
  alert("Folder name cannot be empty");
}

};

  return (
    <div className="col-md-12 position-fixed top-0 left-0 w-100 h-100"
    style={{background:"rgba(0,0,0,0.4)",zIndex:9999}}
    >
      <div className="row align-items-center justify-content-center">
        <div className="col-md-4 mt-5 bg-white rounded p-4">
          <div className="d-flex justify-content-between">
      <h4 >
        Create New Folder 
      </h4>
      <button 
       className="btn"
        onClick={()=>setIsCreateFolderModalOpen(false)}>
        <FontAwsomeIcon icon={faTimes} />
      </button>
    </div>
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
</div>
    </div>
  );
};

export default CreateFolder;
