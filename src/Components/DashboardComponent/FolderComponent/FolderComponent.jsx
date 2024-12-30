import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeFolder } from "../../../redux/actionCreators/filefolderActionCreator";
import ShowItems from "../ShowItems/ShowItems";

const FolderComponent = () => {
  const { folderId } = useParams();
  const dispatch = useDispatch();

  const { userFolders, userFiles } = useSelector((state) => state.filefolders);

  useEffect(() => {
    if (folderId) {
      dispatch(changeFolder(folderId));
    }
  }, [folderId, dispatch]);

  // Get only the folders that belong to the current folder
  const childFolders = userFolders.filter(folder => {
    return folder.data && folder.data.parent === folderId;
  });

  // Get only the files that belong to the current folder
  const childFiles = userFiles.filter(
    file => file.data && file.data.parent === folderId
  ) || [];

  return (
    <div className="col-md-12 w-100">
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
    </div>
  );
};

export default FolderComponent;
