import { shallowEqual, useSelector } from "react-redux";
import { createSelector } from "reselect";
import  { useMemo } from "react"; 
import ShowItems from "../ShowItems/ShowItems";

// Memoized selector for folders and files
const selectFileFolders = (state) => state.filefolders;

const makeSelectDerivedData = createSelector(
  [selectFileFolders],
  (filefolders) => ({
    isLoading: filefolders.isLoading,
    userFolders: filefolders.userFolders.filter(
      (folder) => folder.data && folder.data.parent === "root"
    ),
    userFiles: filefolders.userFiles.filter(
      (file) => file.data && file.data.parent === "root"
    ),
  })
);

const HomeComponents = () => {
  const { isLoading, userFolders, userFiles } = useSelector(
    makeSelectDerivedData,
    shallowEqual
  );

  // Mapping uniqueFolders, memoized to avoid recomputation
  const uniqueFolders = useMemo(
    () =>
      userFolders.map((folder) => ({
        docId: folder.docId,
        data: folder.data,
        name: folder.data.name,
        userId: folder.data.userId,
        createdAt: folder.data.createdAt,
        parent: folder.data.parent,
      })),
    [userFolders]
  );

  return (
    <div className="col-md-12 w-100">
      {isLoading ? (
        <h1 className="display-1 my-5 text-center">Loading.....</h1>
      ) : (
        <>
          <ShowItems title={"Created Folders"} type={"folder"} items={uniqueFolders} />
          <ShowItems title={"Created Files"} type={"file"} items={userFiles} />
        </>
      )}
    </div>
  );
};

export default HomeComponents;
