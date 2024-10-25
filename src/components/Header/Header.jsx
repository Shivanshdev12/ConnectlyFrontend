import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IoIosNotifications, IoMdMenu, IoIosLogOut, IoIosSearch } from "react-icons/io";
import { Link } from 'react-router-dom';
import "./Header.css";
import useNotifications from '../../hooks/useNotifications';
import { menuActions } from '../../features/menuSlice';
import { AiFillProfile } from 'react-icons/ai';


const Header = ({ isLoggedIn, onLogout }) => {
  const dispatch = useDispatch();
  const user = useSelector((state)=>state.users.userId);
  const [isOpen, setIsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

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
            <IoMdMenu/>
          </div>
          <h1>Connectly</h1>
          <nav>
            <ul>
              <li>
                <div className="search">
                  <input type="text" placeholder="Search here..." />
                  <span className="search__icon">
                    <IoIosSearch/>
                  </span>
                </div>
              </li>
              <li className="notifications" onClick={notificationsHandler}>
                <IoIosNotifications  />
              </li>
              <li className="avatar">
                <Link to={"/profile"}>
                  <img src={user?.avatar} />
                </Link>
              </li>
              <li className="header__logout">
                <button onClick={onLogout}>
                  <IoIosLogOut />
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
