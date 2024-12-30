import { shallowEqual, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useMemo } from "react";

const FolderComponent = () => {
  const { folderId } = useParams(); // Get folderId from the URL

  // Fetch userFolders using useSelector
  const userFolders = useSelector(
    (state) => state.filefolders.userFolders,
    shallowEqual
  );

  // Memoize childFolders to prevent unnecessary re-renders
  const childFolders = useMemo(() => {
    return userFolders.filter((folder) => folder.parent === folderId);
  }, [userFolders, folderId]);

  console.log("Folder ID from URL:", folderId); // Debugging folder ID

  return (
    <div>
      {childFolders.length > 0 ? (
        <div>
          <p>{JSON.stringify(childFolders)}</p>
        </div>
      ) : (
        <p className="text-center my-5">Empty Folder</p>
      )}
      {/* Display folder details */}
    </div>
  );
};

export default FolderComponent;
