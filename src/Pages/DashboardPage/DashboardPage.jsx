import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFolders, getFiles } from "../../redux/actionCreators/filefolderActionCreator"; // Single valid import for getFolders and getFiles
import { Route, Routes } from "react-router-dom";
import Navbar from "../../Components/DashboardComponent/Navbar/Navbar";
import SubBar from "../../Components/DashboardComponent/Subbar/SubBar";
import HomeComponents from "../../Components/DashboardComponent/HomeComponents/HomeComponents";
import FolderComponent from "../../Components/DashboardComponent/FolderComponent/FolderComponent";
import CreateFolder from "../../Components/DashboardComponent/CreateFolder/CreateFolder"; // Import CreateFolder if not already
import CreateFile from "../../Components/DashboardComponent/CreateFile/CreateFile"; // Import CreateFile if not already

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [isCreateFileModalOpen, setIsCreateFileModalOpen] = useState(false); // Initialize state
  const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false); // Initialize state

  useEffect(() => {
    if (isAuthenticated && user?.uid) {
      dispatch(getFolders(user.uid));
      dispatch(getFiles(user.uid));
    }
  }, [dispatch, isAuthenticated, user]);

  return (
    <>
      {isCreateFolderModalOpen && (
        <CreateFolder
          setIsCreateFolderModalOpen={setIsCreateFolderModalOpen}
        />
      )}
      {isCreateFileModalOpen && (
        <CreateFile setIsCreateFileModalOpen={setIsCreateFileModalOpen} />
      )}

      <Navbar />
      <SubBar setIsCreateFileModalOpen={setIsCreateFileModalOpen} />
      <div className="container-fluid">
        <Routes>
          <Route path="" element={<HomeComponents />} />
          <Route path="folder/:folderId" element={<FolderComponent />} />
        </Routes>
      </div>
    </>
  );
};

export default DashboardPage;
