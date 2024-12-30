import React from "react";
import { Link } from "react-router-dom"; // Import Link component from react-router-dom
import "./SubBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt, faFileUpload, faFolderPlus } from "@fortawesome/free-solid-svg-icons";

const SubBar = ({ setIsCreateFolderModalOpen }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white py-2">
      <nav className="ms-5" aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/dashboard">Root</Link> {/* Use 'to' instead of 'href' for Link */}
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            New Folder
          </li>
        </ol>
      </nav>

      <ul className="navbar-nav ms-auto me-5">
        <li className="nav-items mx-2">
          <button className="btn btn-outline-dark">
            <FontAwesomeIcon icon={faFileUpload} />
            &nbsp; Upload Files
          </button>
        </li>
        <li className="nav-items mx-2">
          <button className="btn btn-outline-dark">
            <FontAwesomeIcon icon={faFileAlt} />
            &nbsp; Create File
          </button>
        </li>
        <li className="nav-items ms-2">
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
  );
};

export default SubBar;
