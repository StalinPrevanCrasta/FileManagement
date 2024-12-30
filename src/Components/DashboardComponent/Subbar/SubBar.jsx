import React, { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import "./SubBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt, faFileUpload, faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import CreateFolder from "../CreateFolder/CreateFolder";

const SubBar = () => {
  const location = useLocation();
  const { folderId } = useParams();
  const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);
  
  // Get current folder from Redux state
  const { currentFolder } = useSelector(state => state.filefolders);
  
  // Determine if we're in the root folder or a subfolder
  const isRoot = location.pathname === "/dashboard";

  return (
    <>
      <nav className="navbar navbar-expand-lg mt-2 navbar-light bg-white py-2 px-5">
        <nav className="ms-5" aria-label="breadcrumb">
          <ol className="breadcrumb d-flex align-items-center">
            <li className="breadcrumb-item">
              <Link to="/dashboard">Root</Link>
            </li>
            {!isRoot && (
              <li className="breadcrumb-item active" aria-current="page">
                {folderId}
              </li>
            )}
          </ol>
        </nav>

        <ul className="navbar-nav ms-auto me-5">
          <li className="nav-item mx-2">
            <button className="btn btn-outline-dark">
              <FontAwesomeIcon icon={faFileUpload} />
              &nbsp; Upload Files
            </button>
          </li>
          <li className="nav-item mx-2">
            <button className="btn btn-outline-dark">
              <FontAwesomeIcon icon={faFileAlt} />
              &nbsp; Create File
            </button>
          </li>
          <li className="nav-item ms-2">
            <button 
              className="btn btn-outline-dark"
              onClick={() => setIsCreateFolderModalOpen(true)}
            >
              <FontAwesomeIcon icon={faFolderPlus} />
              &nbsp; Create Folder
            </button>
          </li>
        </ul>
      </nav>

      {isCreateFolderModalOpen && (
        <CreateFolder 
          setIsCreateFolderModalOpen={setIsCreateFolderModalOpen}
          parentId={currentFolder} // Pass the current folder ID
        />
      )}
    </>
  );
};

export default SubBar;
