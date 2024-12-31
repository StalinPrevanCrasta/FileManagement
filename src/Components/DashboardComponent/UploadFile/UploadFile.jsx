import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadFile } from "../../../redux/actionCreators/filefolderActionCreator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faFileUpload } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";

const UploadFile = ({ setIsUploadFileModalOpen }) => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();

  const { user } = useSelector(state => state.auth);
  const { currentFolder } = useSelector(state => state.filefolders);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length > 0) {
      setUploading(true);
      const parent = location.pathname.includes('/folder/') ? currentFolder : "root";
      
      try {
        // Upload all files
        const uploadPromises = Array.from(files).map(file => 
          dispatch(uploadFile(file, parent, user.uid))
        );

        const results = await Promise.all(uploadPromises);
        
        if (results.every(success => success)) {
          setFiles([]);
          setIsUploadFileModalOpen(false);
        }
      } catch (error) {
        console.error("Upload error:", error);
      } finally {
        setUploading(false);
      }
    } else {
      alert("Please select files to upload");
    }
  };

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    if (selectedFiles.length > 0) {
      setFiles(selectedFiles);
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
            <h4 className="mb-0">Upload Files</h4>
            <button 
              className="btn"
              onClick={() => setIsUploadFileModalOpen(false)}
              disabled={uploading}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="file" className="btn btn-outline-secondary w-100">
                <FontAwesomeIcon icon={faFileUpload} className="me-2" />
                {files.length > 0 
                  ? `${files.length} file(s) selected` 
                  : "Choose Files"}
              </label>
              <input
                type="file"
                className="form-control d-none"
                id="file"
                onChange={handleFileChange}
                disabled={uploading}
                multiple // Allow multiple file selection
              />
            </div>
            {files.length > 0 && (
              <div className="mb-3">
                <h6>Selected Files:</h6>
                <ul className="list-group">
                  {Array.from(files).map((file, index) => (
                    <li key={index} className="list-group-item">
                      {file.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="d-flex justify-content-end mt-3">
              <button 
                type="submit" 
                className="btn btn-primary me-2"
                disabled={files.length === 0 || uploading}
              >
                {uploading ? `Uploading ${files.length} file(s)...` : 'Upload'}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setIsUploadFileModalOpen(false)}
                disabled={uploading}
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

export default UploadFile;
