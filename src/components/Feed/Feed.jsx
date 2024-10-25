import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import apiClient from "../../axiosConfig";
import routes from "../../routes";
import { IoBookmarkOutline } from "react-icons/io5";
import { SlOptions } from "react-icons/sl";
import CreatePost from "../CreatePost/CreatePost";
import { toast } from 'react-toastify';
import Comment from "../Comment/Comment";
import { Link } from "react-router-dom";
import { userActions } from "../../features/userSlice";
import { FidgetSpinner } from "react-loader-spinner";
import "./Feed.css";
import FollowList from "../FollowList/FollowList";
import { menuActions } from "../../features/menuSlice";
import useScreenSize from "../../hooks/useScreenSize";
import { PiBookBookmark, PiListBold, PiMessengerLogo, PiNotePencil, PiThumbsUp, PiThumbsDown, PiUsers, PiUsersThree, PiMessengerLogoDuotone } from "react-icons/pi";
import GetUsers from "../GetUsers/GetUsers";

const Feed=()=>{

    const dispatch = useDispatch();
    const postDetails = useSelector((state)=>state.posts);
    const userId = useSelector((state)=>state.users.userId);
    const isOpen = useSelector((state)=>state.menu.isOpen);
    const isMobile = useScreenSize();
    const [loader, setLoader] = React.useState(false);
    const [isClicked, setIsClicked] = React.useState(false);

    const [user, setUser] = React.useState({});
    const [posts, setPosts] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [openMenu, setOpenMenu] = React.useState([]);
    const [addComment, setAddComment] = React.useState([]);
    const [openFollow, setOpenFollow] = React.useState(false);

    const handleFollowModalOpen=()=>setOpenFollow(true);
    const handleFollowModalClose=()=>setOpenFollow(false);

    const handleModalOpen=()=>setOpen(true);
    const handleModalClose=()=>setOpen(false);

    const menuHandler=()=>dispatch(menuActions.openMenuState(false));

    const getPosts=()=>{
        setLoader(true);
        apiClient.get(`${routes.POSTS.GET_POSTS}`,{withCredentials:true})
        .then((res)=>{
            if(res.data.status === "success"){
                setPosts(res.data.data.posts);
                setAddComment(new Array(res.data.data.posts.length).fill(false));
                setOpenMenu(new Array(res.data.data.posts.length).fill(false));
            }
        })
        .catch((err)=>{
            toast.error(err.response.data);
        })
        .finally(()=>{
            setLoader(false);
        })
    }

    const likeHandler=(e,postId="")=>{
        apiClient.post(`${routes.POSTS.LIKE_POST}`,{
            postId
        },
        {withCredentials:true})
        .then((res)=>{
            if(res.data.success === "success"){
            }
            setIsClicked(true);
        })
        .catch((err)=>{
            toast.error(err.response.data);
        });
    }

    const dislikeHandler=(e,postId="")=>{
        apiClient.post(`${routes.POSTS.DISLIKE_POST}`,{
            postId
        },
        {withCredentials:true})
        .then((res)=>{
            if(res.data.success === "success"){

            }
            setIsClicked(true);
        })
        .catch((err)=>{
            toast.error(err.response.data);
        });
    }

    const commentHandler=(e,index)=>{
        setAddComment((prevState)=>{
            const newState = [...prevState];
            newState[index] = !newState[index];
            return newState;
        });
    }

    const savePostHandler=async (e,postId)=>{
            await apiClient.post(`${routes.POSTS.SAVE_POST}`,{
                postId
            },
            {withCredentials:true})
            .then((res)=>{
                if(res.data.success){
                    toast.success(res.data.message);
                }
            })
            .catch((err)=>{
                toast.error(err.response.data);
            })
    }

    const notifyUser=async(type="",message="")=>{
        apiClient.post(`/notify`,{
            type,
            message
        });
    };

    const handleCreatePost=()=>{
        const formData = new FormData();
        formData.append("title",postDetails.title);
        formData.append("description", postDetails.description);

        if(postDetails.image){
            formData.append("image", postDetails.image);
        }
        setLoader(true);
        apiClient.post(`${routes.POSTS.CREATE_POST}`,formData,{
            headers:{
                "Content-Type":"multipart/form-data"
            },
            withCredentials:true
        })
        .then((res)=>{
            if(res.data.status === "success"){
                setIsClicked(true);
                toast.success(res.data.message);
                dispatch(menuActions.openMenuState(false));
                setOpen(false);
                notifyUser("post","A new post was created!");
            }
        })
        .catch((err)=>{
            toast.error(err.response.data);
        })
        .finally(()=>{
            setLoader(false);
        });
    }

    const getUser=()=>{
        setLoader(true);
        apiClient.get(`${routes.AUTH.GET_USER}`,{withCredentials:true})
        .then((res)=>{
            const {user} = res.data.data;
            setUser(user);
            dispatch(userActions.setUserState(user));
            setLoader(false);
        })
        .catch((err)=>{
            setLoader(false);
            toast.error(err.response.data);
        })
    }

    const openMenuHandler=(e,index)=>{
        setOpenMenu((prevState)=>{
            const newState = [...prevState];
            newState[index] = !newState[index];
            return newState;
        });
    }

    const deleteHandler=(e,postId="")=>{
        setLoader(true);
        apiClient.delete(`${routes.POSTS.DELETE_POST}/${postId}`,{
            withCredentials:true
        })
        .then((res)=>{
            if(res.data.success){
                toast.success(res.data.message);
                setIsClicked(true);
                setLoader(false);
            }
        })
        .catch((err)=>{
            setLoader(false);
            toast.error(err.response.data);
        })
    }

    const followUserHandler=(e,userToFollowId)=>{
        apiClient.post(`${routes.AUTH.FOLLOW_USER}`,{
            userToFollowId
        },
        {withCredentials:true})
        .then((res)=>{
            if(res.data.success){
                setIsClicked(true);
                notifyUser("New connection","You connected with an user!");
                toast.success(res.data.message);
            }
        })
        .catch((err)=>{
            toast.error(err.response.data);
        })
    }

    React.useEffect(()=>{
        getPosts();
        getUser();
        return ()=>{
            setIsClicked(false);
        }
    },[isClicked]);

    return <React.Fragment>
        <main>
            {isMobile ? isOpen && <div className="container side_menu">
                <div className="container__side">
                    <ul>
                        <li className="container__side-header" onClick={menuHandler}><PiListBold /> <h1>Connectly</h1></li>
                        <li onClick={handleModalOpen}><PiNotePencil/> Create Post</li>
                        <li onClick={handleFollowModalOpen}><PiUsers/> Following</li>
                        <li><PiBookBookmark/> <Link to={"/saved"}> Saved</Link></li>
                        <li><PiUsersThree/> Groups</li>
                        <li><PiMessengerLogo/> Messages</li>
                    </ul>
                </div>
            </div> : <div className="container side_menu">
                <div className="container__side">
                    <ul>
                        <li onClick={handleModalOpen}><PiNotePencil /> Create Post</li>
                        <li onClick={handleFollowModalOpen}><PiUsers/> Following</li>
                        <li><PiBookBookmark/> <Link to={"/saved"}> Saved</Link></li>
                        <li><PiUsersThree /> Groups</li>
                        <li><PiMessengerLogo/> Messages</li>
                    </ul>
                </div>
            </div>}
            <div className="container container__posts-flex">
                {Array.isArray(posts) && posts.length>0? posts.map((post, index) => {
                    return <div className="col-sm-10" key={index}>
                        <div className="posts">

                            <div className="posts-user">
                                <div className="dflex alignCenter justifyCenter g-10">
                                    {post.userId && post.userId.avatar ? (
                                        <img alt={post.userId?.firstName} src={post?.userId?.avatar} />
                                    ) : (
                                        <div className="posts-profile">
                                            {post.userId?.firstName ? String(post.userId.firstName[0]) : ""}
                                            {post.userId?.lastName ? String(post.userId.lastName[0]) : ""}
                                        </div>
                                    )}
                                    {post.userId?.firstName && post.userId?.lastName ? (
                                        <>
                                            <p>
                                                {post.userId.firstName} {post.userId.lastName}
                                                {post.userId._id !== userId._id ? (
                                                    // Check if the post user is already in the current user's following list
                                                    userId.following.includes(post.userId._id) ? (
                                                        <span className="text-primary"> : Following</span>
                                                    ) : (
                                                        <span className="text-primary" onClick={(e) => followUserHandler(e, post.userId._id)}> : Follow</span>
                                                    )
                                                ) : null}
                                            </p>
                                        </>
                                    ) : (
                                        <p>User Information Missing</p>
                                    )}
                                </div>
                                <div className="post-options" onClick={(e)=>openMenuHandler(e,index)}>
                                    <SlOptions />
                                    {openMenu[index] && <div className="posts-menu">
                                        <ul>
                                            <li className="error">Report</li>
                                            <li onClick={(e)=>deleteHandler(e,post._id)}>Delete</li>
                                            <li>Edit</li>
                                            <li>Cancel</li>
                                        </ul>
                                    </div>}
                                </div>
                            </div>

                            <div className="posts-title">
                                <h3>{post.title}</h3>
                            </div>
                            <div className="posts-desc">
                                <p>{post.description}</p>
                                <img src={post.image} alt={post.title} />
                            </div>
                            <div className="posts-para">
                                <p><PiThumbsUp /> {post.likes} Likes</p>
                                <p>{post.comments?.length} Comments</p>
                            </div>
                            <div className="posts-panel">
                                <button onClick={(e) => likeHandler(e, post._id)}><PiThumbsUp /> Like</button>
                                <button onClick={(e) => dislikeHandler(e, post._id)}><PiThumbsDown /> Dislike</button>
                                <button onClick={(e) => commentHandler(e, index)}><PiMessengerLogo /> Comments</button>
                                <button onClick={(e)=> savePostHandler(e,post._id)}><PiBookBookmark /> Save</button>
                            </div>
                            {/* Comments */}
                            <Comment post={post} addComment={addComment} index={index} onCommentAdded={()=>setIsClicked(true)} />
                        </div>
                    </div>
                }) : <div className="col-sm-10">No new posts found!</div>}
            </div>
            <div className="container user__suggestions">
                <GetUsers/>
            </div>
        </main>

        {open && <CreatePost open={open} 
        handleCreatePost={handleCreatePost}
        handleModalOpen={handleModalOpen} 
        handleModalClose={handleModalClose} />}

        {openFollow && <FollowList open={openFollow}
        handleModalOpen={handleFollowModalOpen}
        handleModalClose={handleFollowModalClose} />}

        {loader && <div className="loader-backdrop">
            <div className="loader">
                <FidgetSpinner
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="fidget-spinner-loading"
                    wrapperStyle={{}}
                    wrapperClass="fidget-spinner-wrapper"
                    backgroundColor="#fff"
                />
            </div>
        </div>}
    </React.Fragment>
}

export default Feed;