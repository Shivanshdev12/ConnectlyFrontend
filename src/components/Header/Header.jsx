import React from 'react';
import { IoIosNotifications } from "react-icons/io";
import { AiFillProfile } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { IoIosLogOut } from "react-icons/io";
import "./Header.css";
import useNotifications from '../../hooks/useNotifications';


const Header = ({isLoggedIn, onLogout}) => {
  const {notifications} = useNotifications();
  if(isLoggedIn){
    return (
      <>
        <header>
          <h1>Connectly</h1>
          <nav>
            <ul>
              <li>
                <div className="search">
                  <input type="text" placeholder="🔍 Search here..."/>
                </div>
              </li>
              <li className="notifications">
                <IoIosNotifications/>
                {notifications.length > 0 && (
                  <div className="notification-dropdown">
                    {notifications.map((notification, index) => (
                      <div key={index} className="notification-item">
                        {notification.message}
                      </div>
                    ))}
                  </div>
                )}
              </li>
              <li><Link to={"/profile"}>
                <AiFillProfile/>
              </Link></li>
              <li><button onClick={onLogout}>
                <IoIosLogOut/>  
              </button></li>
            </ul>
          </nav>
        </header>
      </>
    );
  }else{
    return null;
  }
};

export default Header;
