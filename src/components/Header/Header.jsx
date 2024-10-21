import React from 'react';
import { Link } from 'react-router-dom';
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
                  <input type="text" placeholder="Search here..."/>
                </div>
              </li>
              <li><Link to={"/profile"}>Profile</Link></li>
              <li><button onClick={onLogout}>Logout</button></li>
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
