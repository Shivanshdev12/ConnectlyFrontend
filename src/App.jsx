import * as React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register/Register';
import Profile from "./components/Profile/Profile";
import Layout from "./components/Layout/Layout";
import Header from "./components/Header/Header";
import Login from './components/Login/Login';
import Feed from "./components/Feed/Feed";
import Cookies from 'js-cookie';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import SavedPost from "./components/SavedPost/SavedPost";

const ProtectedRoute = ({ element }) => {
  const token = Cookies.get('accessToken');
  return token ? element : <Navigate to="/login" />;
};

function App() {
  const [isLoggedIn, setLoggedIn] = React.useState(false);

  const handleLogout = () => {
    Cookies.remove('accessToken');  
    setLoggedIn(false); 
  };

  const handleLogIn=()=>{
    setLoggedIn(true);
  }

  React.useEffect(() => {
    const token = Cookies.get('accessToken');
    setLoggedIn(!!token);
  }, []);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route element={<Layout />}>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/login' element={<Login isLoggedIn={isLoggedIn} handleLogIn={handleLogIn} />}></Route>
          <Route path='/feed' element={<ProtectedRoute element={<Feed/>}/>}></Route>
          <Route path="/profile" element={<ProtectedRoute element={<Profile/>}/>}></Route>
          <Route path="/saved" element={<ProtectedRoute element={<SavedPost/>}/>}></Route>
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
