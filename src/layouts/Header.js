import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { clearStorage, getUserName, getUserRole, removeToken } from '../helper/token.helper';
import { useNavigate } from 'react-router-dom';
import Toast from "../common/Toast";
import Logo from "../assets/images/zashedlogo.png"
import Avatar from "../assets/images/avatar-1.jpg"
import Dropdown from 'react-bootstrap/Dropdown';
import "./layout.css"



const Header = ({
  setSideBarToggle,
  sideBarToggle,

}) => {
  const [profile, setprofile] = useState(false);
  const navigate = useNavigate();
  const userName = getUserName()


  const LogOut = () => {
    Toast(false, "Logout successfully");
    clearStorage();
    removeToken();
    navigate("/login")
  }
  const handleSideBarToggle = () => {
    setSideBarToggle(!sideBarToggle);
  }
  return (
    <>
      <header id="page-topbar"  >
        <div className="navbar-header">
          <div className="d-flex">
            <div className="navbar-brand-box">
              <Link to='#' href="#" className="logo logo-dark">
                <span className="logo-sm">
                  <img src={Logo} alt="Logo" className='ms-1 rotateLogo' height="22" width="20" />
                </span>
                <span className="logo-lg">
                  <img src={Logo} alt="Logo" className='rotateLogo' height="40" width="50" />
                </span>
              </Link>
              <span className="logo logo-light">
                <span className="logo-sm">
                  <img src="images/logo-light.svg" alt="Logo" height="22" />
                </span>
                <span className="logo-lg">
                  <img src="images/logo-light.png" alt="Logo" height="19" />
                </span>
              </span>
            </div>
            <button type="button" onClick={handleSideBarToggle} className="btn btn-sm px-3 font-size-16 header-item waves-effect" id="vertical-menu-btn">
              <i className="fa fa-fw fa-bars"></i>
            </button>
          </div>
          <Dropdown>
            <Dropdown.Toggle variant="transparent" className='border-0 d-flex align-items-center justify-content-center' id="dropdown-basic">
              <span className="d-none d-xl-inline-block" key="t-henry">{userName}</span>
              {/* <i className="mdi mdi-chevron-down  d-none d-xl-inline-block"  id="dropdown-basic"></i> */}
              <span className='rounded-circle ms-2 fs-20'><i className='bx bxs-user-circle ' style={{
                fontSize: '27px',
                background: 'transparent !important'
              }}></i></span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {
                getUserRole() === "Admin" && 
                <>
                 <Dropdown.Item ><i className="bx bx-upload font-size-16 align-middle me-1"></i> <span key="t-profile"><Link to="/uploadbrands" onClick={() => setprofile(false)}>Upload Brand</Link></span></Dropdown.Item>
                 <div className="dropdown-divider"></div>
                
                </>  
              }
             
              
              <Dropdown.Item onClick={LogOut}><i className="bx bx-power-off font-size-16 align-middle me-1 text-danger"></i> <span key="t-logout">Logout</span></Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </header>
    </>
  )
}

export default Header;



