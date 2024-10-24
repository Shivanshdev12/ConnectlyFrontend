import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IoIosNotifications, IoMdMenu, IoIosLogOut } from "react-icons/io";
import { AiFillProfile } from "react-icons/ai";
import { Link } from 'react-router-dom';
import "./Header.css";
import { menuActions } from '../../features/menuSlice';


const Header = ({ isLoggedIn, onLogout }) => {
  const dispatch = useDispatch();
  const user = useSelector((state)=>state.users.userId);
  const [isOpen, setIsOpen] = useState(false);

  const menuHandler=()=>{
    setIsOpen(!isOpen);
    dispatch(menuActions.openMenuState(!isOpen));
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
                  <span className="search__icon">🔍</span>
                </div>
              </li>
              <li className="notifications">
                <IoIosNotifications />
              </li>
              <li className="header__profile">
                <Link to={"/profile"}>
                  <AiFillProfile />
              </Link>
              </li>
              <li className="avatar">
                <img src={user?.avatar} />
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
