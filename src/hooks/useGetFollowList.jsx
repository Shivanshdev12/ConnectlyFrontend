import React from "react";
import apiClient from "../axiosConfig";
import routes from "../routes/index";
import { toast } from "react-toastify";

const useGetFollowList = () => {
    const [followingList, setFollowingList] = React.useState([]);
    function getFollowList() {
        apiClient.get(`${routes.AUTH.GET_FOLLOWING_USER}`, { withCredentials: true })
            .then((res) => {
                if (res.data.success) {
                    const { followingList } = res.data.data;
                    setFollowingList(followingList.following);
                }
            })
            .catch((err) => {
                toast.error(err.response.data);
            });
    }
    React.useEffect(()=>{
        getFollowList();
    },[]);
    return followingList;
}

export default useGetFollowList;