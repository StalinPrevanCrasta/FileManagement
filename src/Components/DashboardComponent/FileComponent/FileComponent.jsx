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

  // Handle the URL to avoid CORS issues
  const fileUrl = currentFile.data.url.replace(
    'https://firebasestorage.googleapis.com',
    '/storage'
  );

  return (
    <div className="col-md-12 px-3 py-2">
      <div className="card">
        <div className="card-header">
          <h3>{currentFile.data.name}</h3>
        </div>
        <div className="card-body">
          <div className="file-content">
            {currentFile.data.type.includes('image') ? (
              <img src={fileUrl} alt={currentFile.data.name} style={{ maxWidth: '100%' }} />
            ) : (
              <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Download {currentFile.data.name}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileComponent;
