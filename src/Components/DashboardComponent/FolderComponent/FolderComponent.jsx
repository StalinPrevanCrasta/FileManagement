import { shallowEqual, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const FolderComponent = () => {
  const { folderId } = useParams(); // Get folderId from the URL

  // Fetch currentFolderData and childFolders using useSelector
  const { currentFolderData, childFolders } = useSelector(
    (state) => ({
      currentFolderData: state.filefolders.userFolders.find(
        (folder) => folder.userId === folderId // Find the folder with the matching folderId
      ),
      childFolders: state.filefolders.userFolders.filter(
        (folder) => folder.parent === folderId // Get child folders with matching parent folderId
      ),
    }),
    shallowEqual
  );

  console.log("Folder ID from URL:", folderId); // Debugging folder ID

  return (
    <div>
      {childFolders.length > 0 ? (
        <p>
          {JSON.stringify(childFolders)}
        </p>
      ) : (
        <p className="text-center my-5">Empty Folder</p>
      )}
      {/* Display folder details */}
      )
    </div>
  );
};

export default FolderComponent;
