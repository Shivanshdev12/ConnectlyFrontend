import * as React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register/Register';
import Profile from "./components/Profile/Profile";
import Layout from "./components/Layout/Layout";
import Header from "./components/Header/Header";
import Login from './components/Login/Login';
import Feed from "./components/Feed/Feed";
import Cookies from 'js-cookie';
import SavedPost from "./components/SavedPost/SavedPost";
import FollowList from "./components/FollowList/FollowList";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import apiClient from "./axiosConfig";
import routes from "./routes";
import { useDispatch } from "react-redux";
import { userActions } from "./features/userSlice";

const ProtectedRoute = ({ element }) => {
  const token = Cookies.get('accessToken');
  return token ? element : <Navigate to="/login" />;
};

function App() {
  const dispatch = useDispatch();
  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    apiClient.post(`${routes.AUTH.LOGOUT}`,{},{withCredentials:true})
    .then((res)=>{
      if(res.data.success){
        Cookies.remove("accessToken");
        dispatch(userActions.clearUserState());
        toast.success(res.data.message);
        navigate("/login");
      }
    })
    .catch((err)=>{
      toast.error(err.response.data);
    })
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
          <Route path="/following" element={<ProtectedRoute element={<FollowList/>}></ProtectedRoute>}></Route>
          <Route path="*" element={<Navigate to="/feed" replace />} />
        </Route>
      </Routes>
      <ToastContainer autoClose={5000} position="bottom-left" />
    </>
  );
}

export default App;
