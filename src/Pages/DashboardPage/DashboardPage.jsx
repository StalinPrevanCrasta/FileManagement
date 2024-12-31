import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFolders, getFiles } from "../../redux/actionCreators/filefolderActionCreator";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "../../Components/DashboardComponent/Navbar/Navbar";
import SubBar from "../../Components/DashboardComponent/Subbar/SubBar";
import HomeComponents from "../../Components/DashboardComponent/HomeComponents/HomeComponents";
import FolderComponent from "../../Components/DashboardComponent/FolderComponent/FolderComponent";
import CreateFolder from "../../Components/DashboardComponent/CreateFolder/CreateFolder";
import CreateFile from "../../Components/DashboardComponent/CreateFile/CreateFile";
import FileComponent from "../../Components/DashboardComponent/FileComponent/FileComponent";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [isCreateFileModalOpen, setIsCreateFileModalOpen] = useState(false);
  const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);
  const [showSubBar, setShowSubBar] = useState(true);
  const { pathname } = useLocation();
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    if (isAuthenticated && user?.uid) {
      dispatch(getFolders(user.uid));
      dispatch(getFiles(user.uid));
    }
  }, [dispatch, isAuthenticated, user]);

  useEffect(() => {
    if (pathname.includes('/file/')) {
      setShowSubBar(false);
    } else {
      setShowSubBar(true);
    }
  }, [pathname]);

  const handleMoveOperation = () => {
    if (isAuthenticated && user?.uid) {
      dispatch(getFolders(user.uid));
      dispatch(getFiles(user.uid));
    }
  };

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
      {showSubBar && (
        <SubBar 
          setIsCreateFileModalOpen={setIsCreateFileModalOpen}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
        />
      )}
      
      <div className="container-fluid">
        <Routes>
          <Route 
            path="" 
            element={
              <HomeComponents 
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
              />
            } 
          />
          <Route 
            path="folder/:folderId" 
            element={
              <FolderComponent 
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
              />
            } 
          />
          <Route path="file/:fileId" element={<FileComponent />} />
        </Routes>
      </div>
    </>
  );
};

export default DashboardPage;
