import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createFolder } from "../../../redux/actionCreators/filefolderActionCreator";
import { useNavigate, useParams } from "react-router-dom";

const CreateFolder = () => {
  const [folderName, setFolderName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { folderId } = useParams(); 
  const { user } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (folderName.trim()) {
      const data = {
        name: folderName.trim(),
        userId: user.uid,
        parent: folderId || "root", // Ensure parent is set to folderId if available
        createdAt: new Date(),
      };

      console.log("Creating folder with data:", data);

      try {
        const success = dispatch(createFolder(data));
        if (success) {
          setFolderName("");
          // Navigate back to the current folder
          navigate(folderId ? `/dashboard/folder/${folderId}` : "/dashboard");
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
    <div className="col-md-12 p-3">
      <h4 className="text-center mb-4">
        Create New Folder {folderId ? `in Folder ${folderId}` : "in Root"}
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
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateFolder;
