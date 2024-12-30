import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeFolder } from "../../../redux/actionCreators/filefolderActionCreator";
import ShowItems from "../ShowItems/ShowItems";

const FolderComponent = () => {
  const { folderId } = useParams();
  const dispatch = useDispatch();
  const [currentFolderName, setCurrentFolderName] = useState("Root");
  const [loading, setLoading] = useState(true);
  const [breadcrumb, setBreadcrumb] = useState([]);

  const { userFolders, userFiles } = useSelector((state) => state.filefolders);

  useEffect(() => {
    if (folderId) {
      const decodedFolderName = decodeURIComponent(folderId);
      const currentFolder = userFolders.find(folder => folder.data.name === decodedFolderName);
      if (currentFolder) {
        dispatch(changeFolder(currentFolder.docId));
      }
    }
  }, [folderId, dispatch, userFolders]);

  useEffect(() => {
    if (userFolders.length > 0) {
      setLoading(false);
      if (folderId) {
        const decodedFolderName = decodeURIComponent(folderId);
        const currentFolder = userFolders.find(folder => folder.data.name === decodedFolderName);
        setCurrentFolderName(currentFolder ? currentFolder.data.name : "Unnamed Folder");
        // Generate breadcrumb
        const path = [];
        let parentId = currentFolder ? currentFolder.docId : null;
        while (parentId) {
          const folder = userFolders.find(f => f.docId === parentId);
          if (folder) {
            path.unshift({ name: folder.data.name, id: encodeURIComponent(folder.data.name) });
            parentId = folder.data.parent;
          } else {
            parentId = null;
          }
        }
        setBreadcrumb(path);
      } else {
        setCurrentFolderName("Root");
        setBreadcrumb([]);
      }
    }
  }, [folderId, userFolders]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Get only the folders that belong to the current folder
  const childFolders = userFolders.filter(folder => {
    return folder.data && folder.data.parent === (folderId || "root");
  });

  // Get only the files that belong to the current folder
  const childFiles = userFiles.filter(
    file => file.data && file.data.parent === (folderId || "root")
  ) || [];

  return (
    <div className="col-md-12 w-100">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/dashboard">Root</Link></li>
          {breadcrumb.map((crumb, index) => (
            <li key={index} className="breadcrumb-item">
              <Link to={`/dashboard/folder/${crumb.id}`}>{crumb.name}</Link>
            </li>
          ))}
        </ol>
      </nav>
      <h4 className="text-center border-bottom py-2">{currentFolderName}</h4>
      <ShowItems
        title={"Folders"}
        type={"folder"}
        items={childFolders}
      />
      <ShowItems
        title={"Files"}
        type={"file"}
        items={childFiles}
      />
      <Link to={`/dashboard/folder/${folderId}/create-folder`} className="btn btn-primary">Create Folder</Link>
    </div>
  );
};

export default FolderComponent;
