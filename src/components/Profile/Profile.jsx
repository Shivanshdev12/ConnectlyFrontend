import * as React from "react";
import apiClient from "../../axiosConfig";
import { FaPencilAlt, FaCamera } from "react-icons/fa";
import routes from "../../routes";
import "./Profile.css";
import { toast } from "react-toastify";


const Profile = () => {
    const [user, setUser] = React.useState({});
    const [userPosts, setUserPosts] = React.useState([]);
    const [coverImage, setCoverImage] = React.useState("");
    const [bio, setBio] = React.useState({
        isVisible:false,
        content:""
    });
    const [isClicked, setIsClicked] = React.useState(false);

    const getUserDetails = () => {
        apiClient.get(`${routes.AUTH.GET_USER}`,{withCredentials:true})
            .then((res) => {
                const { user } = res.data.data;
                setUser(user);
            })
            .catch((err) => {
                // toast.error(err);
                console.log(err);
            })
    }

    const getUserPosts=()=>{
        apiClient.get(`${routes.POSTS.GET_USER_POSTS}`,{withCredentials:true})
        .then((res)=>{
            if(res.data.success){
                setUserPosts(res.data.data.userPosts);
                console.log(res.data.data.userPosts);
            }
        })
        .catch((err)=>{
            console.error(err);
        })
    }

    const updateCoverImageHandler=(e)=>{
        const formData = new FormData();
        formData.append("coverImage", e.target.files[0]);
        apiClient.post(`${routes.AUTH.ADD_COVER_IMAGE}`,formData,{
            headers:{
                "Content-Type":"multipart/form-data"
            },
            withCredentials:true
        })
        .then((res)=>{
            if(res.data.success){
                setIsClicked(true);
                toast.success(res.data.message);
            }
        })
        .catch((err)=>{
            console.error(err);
        })
    }

    const bioHandler=()=>{
        setBio({
            ...bio,
            isVisible:true
        })
    }

    const handleDetails=(e)=>{
        setBio({
            ...bio,
            content:e.target.value
        })
    }

    React.useEffect(()=>{
        getUserDetails();
        return ()=>{
            setIsClicked(false);
        }
    },[isClicked]);

    React.useEffect(() => {
        getUserPosts();
    }, []);

    return <React.Fragment>
        <div className="container">
            <div className="row">
                <div className="col-sm-10 m-auto">
                    {/* <div className="coverImage">
                        <img src={user.coverImage} alt="" />
                    </div> */}
                    <div className="coverImage" style={{
                        backgroundImage: user.coverImage ? `url(${user.coverImage})` : "none",
                    }}>
                        <div className="custom-file-input">
                            <input onChange={updateCoverImageHandler} type="file" id="file-input" name="coverImage" />
                            <label htmlFor="file-input" className="custom-upload-btn"><FaCamera /> Edit Cover Image</label>
                        </div>
                    </div>
                </div>
                <div className="col-sm-10 m-auto">
                    <div className="profile">
                        <div className="profile_img">
                            <img src={user.avatar} alt={user.firstName} />
                            <button htmlFor="avatar-input" className="btn btn-primary"><FaPencilAlt /></button>
                        </div>
                        <div>
                            <h1>{user.firstName} {user.lastName}</h1>
                            <p>Followers : {!user.followers ? 0 : user?.followers?.length}</p>
                            <p>Following : {!user.following ? 0 : user?.following?.length}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row justifyCenter">
                <div className="col-sm-3">
                    <div className="profile_intro form-group">
                        <h3>Bio</h3>
                        {bio.isVisible && <textarea name="bio" 
                        value={bio.content} 
                        onChange={handleDetails} 
                        placeholder="Add your bio here.." 
                        rows={5}
                        style={{resize:"none",width:"100%"}}  />}
                        <button onClick={bioHandler} className="btn btn-secondary mb-2">Add Bio</button>
                    </div>
                </div>
                <div className="col-sm-7">
                    {/* <div className="profile_posts">
                    </div> */}
                </div>
            </div>
        </div>
    </React.Fragment>
}

export default Profile;