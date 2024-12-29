import {useEffect,useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../Components/DashboardComponent/Navbar/Navbar';
import SubBar from '../../Components/DashboardComponent/Subbar/SubBar';
import HomeComponents from '../../Components/DashboardComponent/HomeComponents/HomeComponents';
const DashboardPage = () => {
  const [isCreateFolderModalOpen,setIsCreateFolderModalOpen]=useState(false);

  const isLoggedIn = useSelector(state => state.auth.isAuthenticated);
  const navigate = useNavigate();
  useEffect(() => {
    if(!isLoggedIn){
      navigate('/')
    }
  },[])
  return (
    <>
    <Navbar/>
    <SubBar />
    <HomeComponents/>
    </>
    
  )
}

export default DashboardPage
