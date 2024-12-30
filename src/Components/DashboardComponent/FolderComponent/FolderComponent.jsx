import { useParams } from "react-router-dom";

const FolderComponent = () => {
  const { folderId } = useParams(); // Get folderId from the URL

  console.log("Folder ID from URL:", folderId); // Debugging folder ID

  return (
    <div>
      Folder Component: {folderId} {/* Display folderId */}
    </div>
  );
};

export default FolderComponent;
