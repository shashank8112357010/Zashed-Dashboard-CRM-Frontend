import React, { Fragment, useEffect } from 'react'
import { useNavigate, useLocation, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Wrapper from './layouts/Wrapper';
import { ToastContainer } from 'react-toastify';
// Toaster css 
import 'react-toastify/dist/ReactToastify.css';
import { getTermsAndCondition, getToken } from './helper/token.helper';
import ForgotPassword from './pages/ForgotPassword';
import { calculatebrandPerfomance } from './GraphData/allGraph';
import Toast from './common/Toast';
// Login module routes check over here
const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // checking while component is being mounted weather it is auth check or not
    if (location.pathname === "" || location.pathname === "/") {
      navigate("/login");
    } 
    else if(!getTermsAndCondition()){
      navigate("/login");
    }else if (!getToken()) {
      navigate("/login");
    } 
  }, []);

  const gotoLogin = () => {
    return (
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/forgotpassword" element={<ForgotPassword />} />
      </Routes>
    );
  };

  useEffect(()=>{
    calculatebrandPerfomance()
  },[])

  return (
    <Fragment>
      <ToastContainer />
      {
        location.pathname === "" ||
          location.pathname === "/login" ||
          location.pathname === "/forgotpassword" ||
          location.pathname === "/" ? (
          gotoLogin()
        ) :
          <Wrapper/>
      }
    </Fragment>
  );
}

export default App