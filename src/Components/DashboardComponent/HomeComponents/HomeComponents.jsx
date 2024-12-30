import { shallowEqual, useSelector } from "react-redux";
import ShowItems from "../ShowItems/ShowItems";

const HomeComponents = () => {
  const { isLoading, userFolders, userFiles } = useSelector(
    (state) => ({
      isLoading: state.filefolders.isLoading,
      userFolders: state.filefolders.userFolders.filter(
        (folder) => folder.data && folder.data.parent === "root"
      ),
      userFiles: state.filefolders.userFiles.filter(
        (file) => file.data && file.data.parent === "root"
      ),
    }),
    shallowEqual
  );

  const uniqueFolders = userFolders
    ? userFolders.map(folder => ({
        docId: folder.docId,
        data: folder.data,
        name: folder.data.name,
        userId: folder.data.userId,
        createdAt: folder.data.createdAt,
        parent: folder.data.parent
      }))
    : [];

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
