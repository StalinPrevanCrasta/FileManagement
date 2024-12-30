import { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom"; // Corrected Routes and Route import
import Navbar from "../../Components/DashboardComponent/Navbar/Navbar";
import SubBar from "../../Components/DashboardComponent/Subbar/SubBar";
import HomeComponents from "../../Components/DashboardComponent/HomeComponents/HomeComponents";
import CreateFolder from "../../Components/DashboardComponent/CreateFolder/CreateFolder";
import FolderComponent from "../../Components/DashboardComponent/FolderComponent/FolderComponent"; // Imported FolderComponent
import { getFolders } from "../../redux/actionCreators/filefolderActionCreator"; // Corrected import

const DashboardPage = () => {
  const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);
  const [folderName, setFolderName] = useState(""); // State to hold folder name

  const { isLoggedIn, isLoading, userId } = useSelector(
    (state) => ({
      isLoggedIn: state.auth.isAuthenticated,
      isLoading: state.filefolders.isLoading,
      userId: state.auth.user?.uid,
    }),
    shallowEqual
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/"); // Redirect to login if not logged in
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (isLoading && userId) {
      dispatch(getFolders(userId)); // Dispatch getFolders when userId is available
    }
  }, [isLoading, userId, dispatch]);

  const handleCreateFolder = () => {
    if (folderName.trim()) {
      console.log(`Folder Created: ${folderName}`);
      setFolderName(""); // Reset folder name
      setIsCreateFolderModalOpen(false); // Close modal
    } else {
      alert("Folder name cannot be empty!");
    }
  };

  return (
    <>
      <Navbar />
      <SubBar setIsCreateFolderModalOpen={setIsCreateFolderModalOpen} />
      <Routes>
        <Route path="/" element={<HomeComponents />} />
        <Route path="folder/:folderId" element={<FolderComponent />} /> {/* Corrected Route */}
      </Routes>
      {isCreateFolderModalOpen && (
        <CreateFolder
          setIsCreateFolderModalOpen={setIsCreateFolderModalOpen}
          folderName={folderName}
          setFolderName={setFolderName}
          handleCreateFolder={handleCreateFolder}
        />
      )}
    </>
  );
};

export default DashboardPage;
