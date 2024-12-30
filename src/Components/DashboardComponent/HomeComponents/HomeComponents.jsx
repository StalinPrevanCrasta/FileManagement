import { shallowEqual, useSelector } from "react-redux";
import ShowItems from "../ShowItems/ShowItems";
import { useMemo } from "react";

const HomeComponents = () => {
  const { isLoading, userFolders, userFiles } = useSelector(
    (state) => ({
      isLoading: state.filefolders.isLoading,
      userFolders: state.filefolders.userFolders,
      userFiles: state.filefolders.userFiles,
    }),
    shallowEqual
  );

  // Memoize the filtered folders and files
  const filteredFolders = useMemo(() => 
    userFolders.filter((folder) => folder.data && folder.data.parent === "root"),
    [userFolders]
  );

  const filteredFiles = useMemo(() => 
    userFiles.filter((file) => file.data && file.data.parent === "root"),
    [userFiles]
  );

  const uniqueFolders = filteredFolders.map((folder) => ({
    docId: folder.docId,
    data: folder.data,
    name: folder.data.name,
    userId: folder.data.userId,
    createdAt: folder.data.createdAt,
    parent: folder.data.parent,
  }));

  return (
    <div className="col-md-12 w-100">
      {isLoading ? (
        <h1 className="display-1 my-5 text-center">Loading.....</h1>
      ) : (
        <>
          <ShowItems title={"Created Folders"} type={"folder"} items={uniqueFolders} />
          <ShowItems title={"Created Files"} type={"file"} items={filteredFiles} />
        </>
      )}
    </div>
  );
};

export default HomeComponents;
