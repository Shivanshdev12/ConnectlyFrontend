import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useNotifications from '../../hooks/useNotifications';
import { Link } from 'react-router-dom';
import { menuActions } from '../../features/menuSlice';
import { PiBell, PiListBold, PiMagnifyingGlass, PiSignOut, PiXBold } from 'react-icons/pi';
import "./Header.css";



const Header = ({ isLoggedIn, onLogout }) => {
  const dispatch = useDispatch();
  const user = useSelector((state)=>state.users.userId);
  const [isOpen, setIsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const notifications = useNotifications();

  const menuHandler=()=>{
    setIsOpen(!isOpen);
    dispatch(menuActions.openMenuState(!isOpen));
  }

  const notificationsHandler=()=>{
    setNotificationsOpen(!notificationsOpen);
  }

  if (isLoggedIn) {
    return (
      <>
        <header>
          <div className="header__menu" onClick={menuHandler}>
            <PiListBold />
          </div>
          <h1>Connectly</h1>
          <nav>
            <ul>
              <li>
                <div className="search">
                  <input type="text" placeholder="Search here..." />
                  <span className="search__icon">
                    <PiMagnifyingGlass />
                  </span>
                </div>
              </li>
              <li className="notifications" onClick={notificationsHandler}>
                <PiBell  />
                {notificationsOpen && <div className="notifications-menu">
                  <ul>
                    {Array.isArray(notifications.notifications) && 
                    notifications.notifications.length>0 ? notifications.notifications.map((notification)=>{
                      return <li className="notification-menu__child">
                        <span>{notification.message}</span>
                        <span><PiXBold/></span>
                      </li>
                    }) : <li><b>No new notifications!</b></li>}
                  </ul>
                </div>}
              </li>
              <li className="avatar">
                <Link to={"/profile"}>
                  <img src={user?.avatar} />
                </Link>
              </li>
              <li className="header__logout">
                <button onClick={onLogout}>
                  <PiSignOut />
                </button>
              </li>
            </ul>
          </nav>
        </header>
      </>
    );
  } else {
    return null;
  }
};

export default Header;
