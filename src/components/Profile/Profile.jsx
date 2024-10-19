import * as React from "react";
import apiClient from "../../axiosConfig";
import routes from "../../routes";
import "./Profile.css";


const Profile=()=>{
    const [user, setUser] = React.useState({});
    const getUserDetails=()=>{
        apiClient.get(`${routes.AUTH.GET_USER}`)
        .then((res)=>{
            const {user} = res.data.data;
            setUser(user);
        })
        .catch((err)=>{
            // toast.error(err);
            console.log(err);
        })
    }
    React.useEffect(()=>{
        getUserDetails();
    },[]);
    return <React.Fragment>
        <div className="container">
            <div className="col-sm-7 m-auto">
                <div className="profile">
                    <div className="profile_img">
                        <img src={user.avatar} alt={user.firstName} />
                    </div>
                    <div className="profile_desc">
                        <div>
                            <span>{user.firstName} {user.lastName}</span>
                            <button className="btn btn-trans">Edit Profile</button>
                        </div>
                        <div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>
}

export default Profile;