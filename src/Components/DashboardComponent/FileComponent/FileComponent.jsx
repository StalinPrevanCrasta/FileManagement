import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const FileComponent = () => {
  const { fileId } = useParams();
  const { userFiles } = useSelector((state) => state.filefolders);

  // Find the current file
  const currentFile = userFiles.find(file => file.docId === fileId);

  if (!currentFile) {
    return <div>File not found</div>;
  }

  return (
    <div className="col-md-12 px-3 py-2">
      <div className="card">
        <div className="card-header">
          <h3>{currentFile.data.name}</h3>
        </div>
        <div className="card-body">
          <div className="file-content">
            {/* Add file content display logic here */}
            <p>File content will be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileComponent;
