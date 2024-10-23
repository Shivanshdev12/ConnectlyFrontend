import * as React from "react";
import apiClient from "../../axiosConfig";
import routes from "../../routes";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import "./Register.css";

const Register = () => {
    const router = useNavigate();
    const [avatar, setAvatar] = React.useState(null);
    const [login, setLogin] = React.useState({
        fname: "",
        lname: "",
        email: "",
        password: ""
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLogin({
            ...login,
            [name]: value
        })
    }
    const handleFileChange=(e)=>{
        setAvatar(e.target.files[0]);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        const data = {
            firstName: login.fname,
            lastName: login.lname,
            email: login.email,
            password: login.password
        }
        if(avatar){
            formData.append("avatar", avatar);
        }
        formData.append("firstName", data.firstName);
        formData.append("lastName", data.lastName);
        formData.append("email", data.email);
        formData.append("password", data.password);
        apiClient.post(`${routes.AUTH.REGISTER}`, formData, {
            headers:{
                "Content-Type":"multipart/form-data"
            }
        })
            .then((res) => {
                if (res.data.status === "success") {
                    toast.success(res.data.message);
                    router("/login");
                }
            })
            .catch((err)=>{
                toast.error(err.response.data);
            });
    }
    return <>
        <div className="container register">
            <div className="col-md-4">
                <h3>New User? Create an account here!</h3>
                <form>
                    <div className="form-control">
                        <label htmlFor="fname">First Name <span className="error">*</span></label>
                        <input type="text" name="fname" id="fname" value={login.fname} onChange={handleChange} />
                    </div>
                    <div className="form-control">
                        <label htmlFor="lname">Last Name <span className="error">*</span></label>
                        <input type="text" name="lname" id="lname" value={login.lname} onChange={handleChange} />
                    </div>
                    <div className="form-control">
                        <label htmlFor="email">Email <span className="error">*</span></label>
                        <input type="email" name="email" id="email" value={login.email} onChange={handleChange} />
                    </div>
                    <div className="form-control">
                        <label htmlFor="password">Password <span className="error">*</span></label>
                        <input type="password" name="password" id="password" value={login.password} onChange={handleChange} />
                    </div>
                    <div className="form-control">
                        <label htmlFor="avatar">Avatar</label>
                        <input type="file" name="avatar" placeholder="Add avatar" onChange={handleFileChange}  />
                    </div>
                    <div className="form-control">
                        <button className="btn btn-primary" onClick={handleSubmit}>Register</button>
                    </div>
                </form>
                <p className="text-desc">Already have an account ? <Link to={"/login"}>Login</Link></p>
            </div>
        </div>
    </>
}

export default Register;