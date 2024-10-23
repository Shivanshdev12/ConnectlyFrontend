import * as React from "react";
import routes from "../../routes";
import apiClient from "../../axiosConfig";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import "./Login.css";

const Login=({isLoggedIn, handleLogIn})=>{
    const navigate = useNavigate();
    const [login, setLogin] = React.useState({
        email:"",
        password:""
    });
    
    const handleChange=(e)=>{
        const {name, value} = e.target;
        setLogin({
            ...login,
            [name]:value
        })
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        const data = {
            email: login.email,
            password: login.password
        }
        apiClient.post(`${routes.AUTH.LOGIN}`, data,{
            withCredentials:true
        })
        .then((res)=>{
            if(res.data.status === "success"){
                toast.success(res.data.message);
                handleLogIn();
                navigate("/feed");
            }
        })
        .catch((err)=>console.error(err));
    }

    React.useEffect(()=>{
        const accessToken = Cookies.get('accessToken');
        if(accessToken){
            navigate("/feed");
        }
    },[]);

    return <>
        <div className="container login">
            <div className="col-md-4">
                <h3 className="text-center">Login here!</h3>
                <form>
                    <div className="form-control">
                        <label htmlFor="email">Email <span className="error">*</span></label>
                        <input type="email" name="email" id="email" value={login.email} onChange={handleChange} />
                    </div>
                    <div className="form-control">
                        <label htmlFor="password">Password <span className="error">*</span></label>
                        <input type="password" name="password" id="password" value={login.password} onChange={handleChange} />
                    </div>
                    <div className="form-control">
                        <Link>Forgot Password?</Link>
                    </div>
                    <div className="form-control">
                        <button className="btn btn-primary" onClick={handleSubmit}>Login</button>
                    </div>
                </form>
                <p className="text-desc">New User ? <Link to={"/register"}>Create a new account</Link></p>
            </div>
        </div>
    </>
}

export default Login;