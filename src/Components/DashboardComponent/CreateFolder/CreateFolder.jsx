import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { createFolder } from "../../../redux/actionCreators/filefolderActionCreator";
import PropTypes from 'prop-types';
import fire from "../../../config/firebase";

const CreateFolder = ({ setIsCreateFolderModalOpen }) => {
  const [folderName, setFolderName] = useState("");

  const { user, currentFolder = "root", currentFolderData } = useSelector(
    (state) => ({
      user: state.auth?.user,
      currentFolder: state.filefolder?.currentFolder || "root",
      currentFolderData: state.filefolder?.userFolders?.find(
        (folder) => folder.docId === state.filefolder?.currentFolder
      ),
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  const checkFolderAlreadyPresentInFirebase = async (name) => {
    const foldersRef = fire.firestore().collection('folders');
    const querySnapshot = await foldersRef
      .where('userId', '==', user.uid)
      .where('name', '==', name)
      .where('parent', '==', currentFolder)
      .get();

    return !querySnapshot.empty;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedFolderName = folderName.trim();

    if (trimmedFolderName) {
      if (trimmedFolderName.length > 3) {
        const folderExists = await checkFolderAlreadyPresentInFirebase(trimmedFolderName);
        if (!folderExists) {
          const data = {
            createsAt: new Date(),
            name: trimmedFolderName,
            userId: user.uid,
            createdBy: user.displayName,
            path:
              currentFolder === "root"
                ? []
                : [...(currentFolderData?.data.path || []), currentFolder],
            parent: currentFolder,
            lastAccessed: null,
            updatedAt: new Date(),
          };
          dispatch(createFolder(data));
          alert(`Folder "${trimmedFolderName}" created successfully.`);
          setFolderName("");
          setIsCreateFolderModalOpen(false);
        } else {
          alert(`Folder "${trimmedFolderName}" already exists!`);
        }
      } else {
        alert("Folder name must be at least 4 characters long.");
      }
    } else {
      alert("Folder name cannot be empty!");
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

CreateFolder.propTypes = {
  setIsCreateFolderModalOpen: PropTypes.func.isRequired,
};

export default CreateFolder;
