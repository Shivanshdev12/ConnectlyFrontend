import React from 'react';
import "./Header.css";


const Header = ({isLoggedIn, onLogout}) => {
  if(isLoggedIn){
    return (
      <>
        <header>
          <h1>Facebook</h1>
          <nav>
            <ul>
              <li>
                <div className="search">
                  <input type="text" placeholder="Search here..."/>
                </div>
              </li>
              <li><a href="/profile">Profile</a></li>
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
