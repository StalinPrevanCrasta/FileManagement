import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadFile } from "../../../redux/actionCreators/filefolderActionCreator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useParams, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';

const UploadFile = ({ setIsUploadFileModalOpen }) => {
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const { folderId } = useParams();
  const location = useLocation();

  const { user } = useSelector(state => state.auth);
  const { currentFolder } = useSelector(state => state.filefolders);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      const parent = location.pathname.includes('/folder/') ? currentFolder : "root";
      dispatch(uploadFile(file, parent, user.uid, (success) => {
        if (success) {
          setFile(null);
          setIsUploadFileModalOpen(false);
        }
      }));
    } else {
      alert("Please select a file to upload");
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
            <h4 className="mb-0">Upload File</h4>
            <button 
              className="btn"
              onClick={() => setIsUploadFileModalOpen(false)}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="file"
                className="form-control"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <div className="d-flex justify-content-end mt-3">
              <button type="submit" className="btn btn-primary me-2">
                Upload File
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setIsUploadFileModalOpen(false)}
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

UploadFile.propTypes = {
  setIsUploadFileModalOpen: PropTypes.func.isRequired,
};

export default UploadFile;
