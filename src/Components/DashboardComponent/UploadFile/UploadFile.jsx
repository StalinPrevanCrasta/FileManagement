import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadFile } from "../../../redux/actionCreators/filefolderActionCreator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faFileUpload, faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";

const UploadFile = ({ setIsUploadFileModalOpen }) => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);
  const folderInputRef = useRef(null);
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
        let completed = 0;
        const totalFiles = files.length;

        // Upload files sequentially to show proper progress
        for (const file of Array.from(files)) {
          const path = file.webkitRelativePath || file.name;
          await dispatch(uploadFile(file, parent, user.uid, path));
          completed++;
          setUploadProgress((completed / totalFiles) * 100);
        }

        setFiles([]);
        setIsUploadFileModalOpen(false);
      } catch (error) {
        console.error("Upload error:", error);
        alert("Error uploading files. Please try again.");
      } finally {
        setUploading(false);
        setUploadProgress(0);
      }
    } else {
      alert("Please select files to upload");
    }
  };

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    if (selectedFiles?.length > 0) {
      setFiles(selectedFiles);
    }
  };

  const handleFolderSelect = () => {
    folderInputRef.current?.click();
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div 
      className="col-md-12 position-fixed top-0 left-0 w-100 h-100"
      style={{ background: "rgba(0,0,0,0.4)", zIndex: 9999 }}
    >
      <div className="row align-items-center justify-content-center">
        <div className="col-md-4 mt-5 bg-white rounded p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="mb-0">Upload Files or Folders</h4>
            <button 
              className="btn"
              onClick={() => setIsUploadFileModalOpen(false)}
              disabled={uploading}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="d-flex gap-2 mb-3">
              <button
                type="button"
                className="btn btn-outline-primary flex-grow-1"
                onClick={handleFileSelect}
                disabled={uploading}
              >
                <FontAwesomeIcon icon={faFileUpload} className="me-2" />
                Select Files
              </button>
              <button
                type="button"
                className="btn btn-outline-primary flex-grow-1"
                onClick={handleFolderSelect}
                disabled={uploading}
              >
                <FontAwesomeIcon icon={faFolderOpen} className="me-2" />
                Select Folder
              </button>
            </div>
            
            <input
              type="file"
              className="d-none"
              ref={fileInputRef}
              onChange={handleFileChange}
              disabled={uploading}
              multiple
            />
            
            <input
              type="file"
              className="d-none"
              ref={folderInputRef}
              onChange={handleFileChange}
              webkitdirectory=""
              directory=""
              disabled={uploading}
            />

            {files.length > 0 && (
              <div className="mb-3">
                <h6>Selected Items ({files.length}):</h6>
                <div className="list-group" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                  {Array.from(files).map((file, index) => (
                    <div key={index} className="list-group-item small">
                      {file.webkitRelativePath || file.name}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {uploading && (
              <div className="mb-3">
                <div className="progress">
                  <div 
                    className="progress-bar" 
                    role="progressbar" 
                    style={{ width: `${uploadProgress}%` }}
                    aria-valuenow={uploadProgress} 
                    aria-valuemin="0" 
                    aria-valuemax="100"
                  >
                    {Math.round(uploadProgress)}%
                  </div>
                </div>
              </div>
            )}

            <div className="d-flex justify-content-end mt-3">
              <button 
                type="submit" 
                className="btn btn-primary me-2"
                disabled={files.length === 0 || uploading}
              >
                {uploading ? 'Uploading...' : 'Upload'}
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
