import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import "./SubBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt, faFileUpload, faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

const SubBar = () => {
  const location = useLocation();
  const { folderId } = useParams();
  
  // Determine if we're in the root folder or a subfolder
  const isRoot = location.pathname === "/dashboard";

  // Create the correct path for folder creation
  const createFolderPath = folderId 
    ? `/dashboard/folder/${folderId}/create-folder`
    : "/dashboard/create-folder";

  return (
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
          <Link 
            to={createFolderPath}
            className="btn btn-outline-dark"
          >
            <FontAwesomeIcon icon={faFolderPlus} />
            &nbsp; Create Folder
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default SubBar;
