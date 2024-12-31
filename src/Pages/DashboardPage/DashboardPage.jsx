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

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
      color: '#fff',
      fontFamily: 'Poppins, sans-serif',
      padding: '1rem',
    },
    button: {
      backgroundColor: '#ff6f61',
      border: 'none',
      color: '#fff',
      padding: '0.8rem 1.5rem',
      borderRadius: '50px',
      cursor: 'pointer',
      fontSize: '1rem',
      transition: 'all 0.4s ease',
      boxShadow: '0 8px 15px rgba(255, 111, 97, 0.4)',
    },
    buttonHover: {
      transform: 'scale(1.15)',
      boxShadow: '0 10px 20px rgba(255, 111, 97, 0.6)',
    },
    navbar: {
      backgroundColor: '#16213e',
      padding: '1rem',
      boxShadow: '0 6px 15px rgba(0, 0, 0, 0.3)',
      marginBottom: '1.5rem',
    },
    subBar: {
      backgroundColor: '#1b1b2f',
      padding: '1rem',
      marginBottom: '1.5rem',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      animation: 'fadeIn 1s ease-in-out',
    },
    card: {
      backgroundColor: '#1e3a8a',
      borderRadius: '15px',
      padding: '2rem',
      marginBottom: '1rem',
      color: '#fff',
      transition: 'transform 0.4s ease, box-shadow 0.4s ease',
      boxShadow: '0 4px 15px rgba(30, 58, 138, 0.4)',
    },
    cardHover: {
      transform: 'scale(1.1)',
      boxShadow: '0 6px 20px rgba(30, 58, 138, 0.6)',
    },
    fadeIn: {
      animation: 'fadeIn 1s ease-in-out',
    },
    movingText: {
      fontSize: '2rem',
      fontWeight: 'bold',
      textAlign: 'center',
      margin: '2rem 0',
      color: '#ff6f61',
      animation: 'moveText 5s linear infinite',
    },
    '@keyframes moveText': {
      '0%': { transform: 'translateX(-100%)' },
      '50%': { transform: 'translateX(0)' },
      '100%': { transform: 'translateX(100%)' },
    },
    '@keyframes fadeIn': {
      from: {
        opacity: 0,
      },
      to: {
        opacity: 1,
      },
    },
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

      <div style={styles.navbar}>
        <Navbar />
      </div>
      {showSubBar && (
        <div style={styles.subBar}>
          <SubBar 
            setIsCreateFileModalOpen={setIsCreateFileModalOpen}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
          />
        </div>
      )}

      <div style={styles.container}>
        <div style={styles.movingText}>Welcome to Your Dashboard</div>
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
