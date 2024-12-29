import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/DashboardComponent/Navbar/Navbar";
import SubBar from "../../Components/DashboardComponent/Subbar/SubBar";
import HomeComponents from "../../Components/DashboardComponent/HomeComponents/HomeComponents";
import CreateFolder from "../../Components/DashboardComponent/CreateFolder/CreateFolder";

const DashboardPage = () => {
  const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);
  const [folderName, setFolderName] = useState(""); // State to hold folder name

  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, []);

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
      <HomeComponents />

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
