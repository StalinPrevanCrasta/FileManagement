import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createFolder } from "../../../redux/actionCreators/filefolderActionCreator";

const CreateFolder = ({setIsCreateFolderModalOpen}) => {
  const [folderName, setFolderName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { folderId } = useParams(); // Get the folderId from params

  // Get current user from Redux state
  const { user } = useSelector(state => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (folderName.trim()) {
      // Create folder data with the correct parent
      const data = {
        name: folderName.trim(),
        userId: user.uid,
        parent: folderId || "root", // Ensure the parent is set to the correct folderId
        createdAt: new Date(),
      };

      console.log("Creating folder with data:", data); // Debug log

      try {
        const success = dispatch(createFolder(data));
        if (success) {
          setFolderName("");
          // Navigate to the current folder (or back to root if no folderId)
          if (folderId) {
            navigate(`/dashboard/folder/${folderId}`);
          } else {
            navigate("/dashboard"); // If no folderId, go to the root dashboard
          }
        }
      } catch (error) {
        console.error("Error creating folder:", error);
        alert("Error creating folder. Please try again.");
      }
    } else {
      alert("Please enter a folder name");
    }
  };

  return (
    <div className="col-md-12 position-fixed top-0 left-0 w-100 h-100"
    style={{background:"rgba(0,0,0,0.4)",zIndex:9999}}
    >
      <div className="row align-items-center justify-content-center">
        <div className="col-md-4 mt-5 bg-white rounded p-4">
          <div className="d-flex justify-content-between">
            <h4>
              Create New Folder
            </h4>
            <form onSubmit={handleSubmit} className="w-50 mx-auto">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="folderName"
                  placeholder="Enter Folder Name"
                  value={folderName}
                  onChange={(e) => setFolderName(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="text-center mt-3">
                <button type="submit" className="btn btn-primary mx-2">
                  Create Folder
                </button>
                <button
                  type="button"
                  className="btn btn-secondary mx-2"
                  onClick={() => navigate(-1)} // Go back to previous page
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateFolder;
