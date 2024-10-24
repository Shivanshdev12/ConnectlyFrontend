import React from 'react';
import { IoIosNotifications } from "react-icons/io";
import { AiFillProfile } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { IoIosLogOut } from "react-icons/io";
import "./Header.css";


const Header = ({isLoggedIn, onLogout}) => {
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
