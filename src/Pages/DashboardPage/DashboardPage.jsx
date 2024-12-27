import {useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../Components/DashboardComponent/Navbar/Navbar';
const DashboardPage = () => {
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
    </>
    
  )
}

export default DashboardPage
