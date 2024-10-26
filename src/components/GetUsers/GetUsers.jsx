import * as React from "react";
import apiClient from "../../axiosConfig";
import { toast } from "react-toastify";
import routes from "../../routes";
import { useSelector } from "react-redux";
import "./GetUsers.css";

const GetUsers=()=>{
    const [allUsers, setAllUsers] = React.useState([]);
    const user = useSelector((state)=>state.users.userId);
    const getAllUsers=()=>{
        apiClient.get(`${routes.AUTH.GET_ALL_USERS}`,{withCredentials:true})
        .then((res)=>{
            if(res.data.success){
                setAllUsers(res.data.data.users);
            }
        })
        .catch((err)=>{
            toast.error(err.response.data);
        })
    }
    React.useEffect(()=>{
        getAllUsers();
    },[]);
    return <React.Fragment>
        <span className="allUser-header">User suggestions</span>
        <div className="allUser-body">
            {allUsers.map((each)=>{
                if(each._id !== user._id){
                    return <div className="allUser-list" key={each._id}>
                        <div>
                            <img src={each.avatar} alt={each.firstName} />
                            <span>{each.firstName} {each.lastName}</span>
                        </div>
                        <div className="text-primary">
                            Follow
                        </div>
                    </div>
                }
            })}
        </div>
    </React.Fragment>
}

export default GetUsers;