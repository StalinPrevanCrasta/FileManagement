import { shallowEqual, useSelector } from "react-redux";
import ShowItems from "../ShowItems/ShowItems";

const HomeComponents = () => {
  const { isLoading, userFolders } = useSelector(
    (state) => ({
      isLoading: state.filefolders.isLoading,
      userFolders: state.filefolders.userFolders,
    }),
    shallowEqual
  );

  // Extract unique folder objects based on folder name
  const uniqueFolders = userFolders
    ? [...new Map(userFolders.map((folder) => [folder.name, folder])).values()]
    : []; // Use Map to ensure unique folder names

  // Example files data
  const files = [
    { name: "New File", userId: "1" },
    { name: "New File 2", userId: "2" }
  ];

  return (
    <div className="col-md-12 w-100">
      {isLoading ? (
        <h1 className="display-1 my-5 text-center">Loading.....</h1>
      ) : (
        <>
          {/* Pass the complete unique folder objects to ShowItems */}
          <ShowItems
            title={"Created Folders"}
            type={"folder"}
            items={uniqueFolders}
          />
          <ShowItems title={"Created Files"} type={"file"} items={files} />
        </>
      )}
    </div>
  );
};

export default HomeComponents;
