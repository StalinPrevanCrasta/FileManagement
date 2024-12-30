import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFolders } from "../../redux/actionCreators/filefolderActionCreator";
import { Route, Routes } from "react-router-dom";
import Navbar from "../../Components/DashboardComponent/Navbar/Navbar";
import SubBar from "../../Components/DashboardComponent/Subbar/SubBar";
import HomeComponents from "../../Components/DashboardComponent/HomeComponents/HomeComponents";
import FolderComponent from "../../Components/DashboardComponent/FolderComponent/FolderComponent";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated && user?.uid) {
      dispatch(getFolders(user.uid));
    }
  }, [dispatch, isAuthenticated, user]);

  return (
    <>
      <Navbar />
      <SubBar />
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
