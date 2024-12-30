import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { createFolder } from "../../../redux/actionCreators/filefolderActionCreator";
import { current } from "@reduxjs/toolkit";

const CreateFolder = ({ setIsCreateFolderModalOpen }) => {
  const [folderName, setFolderName] = useState("");

  // Access user folders from Redux store
  const { userFolders = [], user, currentFolder = "root" } = useSelector(
    (state) => ({
      userFolders: state.filefolder?.userFolders || [],
      user: state.auth?.user,
      currentFolder: state.filefolder?.currentFolder || "root",
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  // Check if the folder already exists
  const checkFolderAlreadyPresent = (name) => {
    const folderPresent = userFolders.filter(
      (folder) => folder.parent === currentFolder
    ).find((folder) => folder.name === name);
    if (folderPresent !== undefined || folderPresent !== null) {
      return true;

    } else {
      return false;
    }
      
     
    };

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedFolderName = folderName.trim(); // Remove extra spaces

    if (trimmedFolderName) {
      if (trimmedFolderName.length > 3) {
        if (!checkFolderAlreadyPresent(trimmedFolderName)) {
          // Folder doesn't exist; proceed with creation
          const data = {
            createsAt: new Date(),
            name: trimmedFolderName,
            userId: user.uid,
            createdBy: user.displayName,
            path: currentFolder === "root" ? [] : ["parent folder path!"],
            parent: currentFolder,
            lastAccessed: null,
            updatedAt: new Date(),
          };
          dispatch(createFolder(data)); // Dispatch action to create folder
          alert(`Folder "${trimmedFolderName}" created successfully.`); // Success message
          setFolderName(""); // Clear input field
          setIsCreateFolderModalOpen(false); // Close modal
        } else {
          alert(`Folder "${trimmedFolderName}" already exists!`); // Alert for duplicate folder
        }
      } else {
        alert("Folder name must be at least 4 characters long."); // Minimum length validation
      }
    } else {
      alert("Folder name cannot be empty!"); // Empty input validation
    }
  };

  return (
    <div
      className="col-md-12 position-fixed top-0 left-0 w-100 h-100"
      style={{ background: "rgba(0,0,0,0.4)", zIndex: 9999 }}
    >
      <div className="row align-items-center justify-content-center">
        <div className="col-md-4 mt-5 bg-white p-4">
          <div className="d-flex justify-content-between">
            <h4>Create Folder</h4>
            <button
              className="btn"
              onClick={() => setIsCreateFolderModalOpen(false)}
            >
              <FontAwesomeIcon icon={faTimes} className="text-black" size="sm" />
            </button>
          </div>
          <hr />
          <div className="d-flex flex-column align-items-center">
            <form className="mt-3 w-100" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="folderName"
                  placeholder="Folder Name"
                  value={folderName}
                  onChange={(e) => setFolderName(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary mt-5 form-control"
              >
                Create Folder
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateFolder;
