import { useParams } from "react-router-dom";

const FolderComponent = () => {
  const { folderId } = useParams(); // Fetch folderId from the URL

  return (
    <div>
      Folder Component: {folderId} {/* Display folderId */}
    </div>
  );
};

export default FolderComponent;
