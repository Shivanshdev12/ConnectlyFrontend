import * as React from "react";
import apiClient from "../../axiosConfig";
import { toast } from 'react-toastify';
import routes from "../../routes";
import "./FollowList.css";

const FollowList=({open, handleModalOpen, handleModalClose})=>{
    const [loader, setLoader] = React.useState(false);
    const [isClicked, setIsClicked] = React.useState(false);
    const [followingList, setFollowingList] = React.useState([]);

    const getFollowingforUser=()=>{
        apiClient.get(`${routes.AUTH.GET_FOLLOWING_USER}`,{withCredentials:true})
        .then((res)=>{
            if(res.data.success){
                const {followingList} = res.data.data;
                setLoader(false);
                setFollowingList(followingList.following);
            }
        })
        .catch((err)=>{
            toast.error(err.response.data);
        })
    }

    React.useEffect(()=>{
        getFollowingforUser();
    },[]);

    if(open){
        return <React.Fragment>
            <div className="backdrop">
                <div className="followList-modal">
                    <div className="modal__header">
                        <h3>Following</h3>
                        <button className="close-btn" onClick={handleModalClose}>X</button>
                    </div>
                    <div className="modal__body">
                        <input type="text" placeholder="Search"/>
                        {Array.isArray(followingList) && followingList.map((each)=>{
                            return <div className="modal__list">
                                <div className="dflex alignCenter">
                                    <img src={each.avatar}/>
                                    <p>{each.firstName} {each.lastName}</p>
                                </div>
                                <div>
                                    <button className="btn btn-trans">Remove</button>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </React.Fragment>
    }else{
        return null;
    }
}

export default FollowList;