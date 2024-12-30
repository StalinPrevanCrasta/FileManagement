// CreateFile.jsx

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createFile } from "../../../redux/actionCreators/filefolderActionCreator"; // Correct import

const CreateFile = ({ setIsCreateFileModalOpen }) => {
  const [fileName, setFileName] = useState("");
  const [success, setSuccess] = useState(false);

  // Initialize navigate
  const navigate = useNavigate();

  // Get current user and file information from Redux state
  const { userFiles, user, currentFolder, currentFolderData } = useSelector(
    (state) => ({
      userFiles: state.filefolders.userFiles,
      user: state.auth.user,
      currentFolder: state.filefolders.currentFolder,
      currentFolderData: state.filefolders.userFolders.find(
        (folder) => folder.docId === state.filefolders.currentFolder
      ),
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      setFileName("");
      setSuccess(false);
      setIsCreateFileModalOpen(false);
    }
  }, [success, setIsCreateFileModalOpen]);

  const checkFileAlreadyPresent = (name) => {
    const filePresent = userFiles
      .filter((file) => file.data.parent === currentFolder)
      .find((file) => file.data.name === name);
    return !!filePresent;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fileName) {
      if (fileName.length > 3) {
        // Check file extension
        const extension =
          fileName.includes(".") && fileName.split(".").pop()
            ? true
            : false;

        if (!checkFileAlreadyPresent(fileName)) {
          // Create file data with the correct parent
          const data = {
            name: extension ? fileName : `${fileName}.txt`,
            userId: user.uid,
            createdBy: user.displayName,
            path:
              currentFolder === "root"
                ? []
                : [...(currentFolderData?.data.path || []), currentFolder],
            parent: currentFolder,
            createdAt: new Date(),
            lastAccessed: null,
            updatedAt: new Date(),
            extension: extension ? fileName.split(".").pop() : "txt",
            data: "",
            url: null,
          };

          // Dispatch createFile action
          dispatch(createFile(data, setSuccess));
        } else {
          alert("File with the same name already exists.");
        }
      } else {
        alert("File name should be at least 4 characters long.");
      }
    } else {
      alert("File name cannot be empty.");
    }
  };

  return (
    <div
      className="col-md-12 position-fixed top-0 left-0 w-100 h-100"
      style={{ background: "rgba(0,0,0,0.4)", zIndex: 9999 }}
    >
      <div className="row align-items-center justify-content-center">
        <div className="col-md-4 mt-5 bg-white rounded p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4>Create File</h4>
            <button
              className="btn"
              onClick={() => setIsCreateFileModalOpen(false)}
            >
              <FontAwesomeIcon
                icon={faTimes}
                className="text-black"
                size="sm"
              />
            </button>
          </div>
          <hr />
          <div className="d-flex flex-column align-items-center">
            <form onSubmit={handleSubmit} className="mt-3 w-100">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="fileName"
                  placeholder="Enter file name e.g., file.txt, index.html, index.php"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                />
              </div>
              <div className="text-center mt-3">
                <button type="submit" className="btn btn-primary mx-2">
                  Create File
                </button>
                <button
                  type="button"
                  className="btn btn-secondary mx-2"
                  onClick={() => navigate(-1)} // Go back to the previous page
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateFile;
