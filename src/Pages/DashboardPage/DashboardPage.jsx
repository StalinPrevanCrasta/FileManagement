import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
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

const GlobalStyle = createGlobalStyle`
  body {
    background: #121212;
    color: #ffffff;
    font-family: 'Poppins', sans-serif;
    margin: 0;
    padding: 0;
  }
`;

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`;

const NavbarWrapper = styled.div`
  background: linear-gradient(45deg, #1e1e2f, #343a40);
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.6);
`;

const SubBarWrapper = styled.div`
  background: #1c1c28;
  border-bottom: 1px solid #333;
  padding: 10px;
`;

const HeaderText = styled.h1`
  font-size: 28px;
  font-weight: 800;
  text-align: center;
  color: #ff6a00;
  margin: 20px 0;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const MovingText = styled.h1`
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  margin: 20px 0;
  background: linear-gradient(90deg, #ff6a00, #ee0979);
  background-size: 200% 200%;
  animation: ${gradientAnimation} 5s ease infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ContentWrapper = styled.div`
  flex: 1;
  background: #1a1a24;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.7);
  overflow-y: auto;
  padding: 20px;
  margin: 20px;
`;

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
    setShowSubBar(!pathname.includes("/file/"));
  }, [pathname]);

  return (
    <>
      <GlobalStyle />
      {isCreateFolderModalOpen && (
        <CreateFolder
          setIsCreateFolderModalOpen={setIsCreateFolderModalOpen}
        />
      )}
      {isCreateFileModalOpen && (
        <CreateFile setIsCreateFileModalOpen={setIsCreateFileModalOpen} />
      )}

      <Container>
        <HeaderText>DOCUSPHERE</HeaderText>
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
        {showSubBar && (
          <SubBarWrapper>
            <SubBar
              setIsCreateFileModalOpen={setIsCreateFileModalOpen}
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
            />
          </SubBarWrapper>
        )}

        <MovingText>Welcome to Your Dashboard</MovingText>
        <ContentWrapper>
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
        </ContentWrapper>
      </Container>
    </>
  );
};

export default DashboardPage;
