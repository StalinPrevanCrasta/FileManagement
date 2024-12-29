import React from "react";
import "./SubBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileAlt,
  faFileUpload,
  faFolderPlus,
} from "@fortawesome/free-solid-svg-icons";

const SubBar = ({ setIsCreateFolderModalOpen }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white py-2">
      <p className="ms-4">Root</p>
       
      <ul className="navbar-nav ms-auto me-5 ">
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
