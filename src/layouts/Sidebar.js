import React from 'react';
import {  NavLink } from 'react-router-dom';
import { sideBarData } from '../helper/sideBarData';
import { getUserRole } from '../helper/token.helper';
import { useEffect } from 'react';
import { useState } from 'react';

const Sidebar = () => {
    const [routeProtect , setRouteProtect] = useState([]);
    useEffect(()=>{
        let userRole = getUserRole();
        setRouteProtect(userRole === "Client"  ?  sideBarData.filter((user) => user.name != 'Production') :  sideBarData  )
        
    },[])
    return (
        <>
            <div className='vertical-menu'>
                <div data-simplebar className="h-100">
                    <div id="sidebar-menu">
                        {console.log(routeProtect)}
                        <ul className="metismenu list-unstyled" id="side-menu">
                             {routeProtect?.map((item)=>{
                                return (
                                    <li key={item.name.toString()}>
                                    <NavLink to={item.path} className="has-arrow waves-effect">
                                        <i className={item.icon}></i>
                                        <span className='d-inline'>{item.name}</span>
                                    </NavLink>
                                </li>
                                )
                             })}
                            {/* <li className="menu-title mt-5" key="t-menu">Menu</li> */}

                        </ul>
                    </div>
                </div>
            </div>
      

        </>
    )
}

export default Sidebar