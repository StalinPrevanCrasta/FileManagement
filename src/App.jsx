import './App.css';
import { useEffect } from 'react';

import { Route, Routes } from "react-router-dom";
import  {Login, Register, Homepage, DashboardPage} from './Pages';
import { useDispatch } from 'react-redux';
import { checkIsLoggedIn } from './redux/actionCreators/authActionCreator';


const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkIsLoggedIn());

  }, []);
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard/*" element={<DashboardPage/>}/>
      </Routes>
    </div>
  );
};

export default App;
