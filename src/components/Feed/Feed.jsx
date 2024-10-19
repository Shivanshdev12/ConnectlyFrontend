import * as React from "react";
import { useSelector } from "react-redux";
import apiClient from "../../axiosConfig";
import routes from "../../routes";
import { FaTelegramPlane, FaUserFriends, FaBookmark, FaRegComment } from "react-icons/fa";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { BiSolidMessageRounded } from "react-icons/bi";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io";
import { SlOptions } from "react-icons/sl";
import { MdGroups } from "react-icons/md";
import CreatePost from "../CreatePost/CreatePost";
import { toast } from 'react-toastify';
import "./Feed.css";

const Feed=()=>{

    const postDetails = useSelector((state)=>state.posts);
    const [user, setUser] = React.useState({});
    const [posts, setPosts] = React.useState([{
            title:"",
            description:"",
            likes:0,
            dislikes:0,
            image:"",
            comments:[]
        }
    ]);
    const [open, setOpen] = React.useState(false);
    const [openMenu, setOpenMenu] = React.useState([]);
    const [isClicked, setIsClicked] = React.useState(false);
    const [addComment, setAddComment] = React.useState([]);
    const [commentTxt, setCommentTxt] = React.useState("");

    const handleModalOpen=()=>{
        setOpen(true);
    }

    const handleModalClose=()=>{
        setOpen(false);
    }

    const handleComment=(e)=>{
        setCommentTxt(e.target.value);
    }

    const getPosts=()=>{
        apiClient.get(`${routes.POSTS.GET_POSTS}`)
        .then((res)=>{
            if(res.data.status === "success"){
                setPosts(res.data.data.posts);
                setAddComment(new Array(res.data.data.posts.length).fill(false));
                setOpenMenu(new Array(res.data.data.posts.length).fill(false));
            }
        })
        .catch((err)=>{
            console.error(err);
        })
    }

    const likeHandler=(e,postId="")=>{
        apiClient.post(`${routes.POSTS.LIKE_POST}`,{
            postId
        })
        .then((res)=>{
            if(res.data.success === "success"){
            }
            setIsClicked(true);
        })
        .catch((err)=>console.error(err));
    }

    const dislikeHandler=(e,postId="")=>{
        apiClient.post(`${routes.POSTS.DISLIKE_POST}`,{
            postId
        })
        .then((res)=>{
            setIsClicked(true);
        })
        .catch((err)=>console.error(err));
    }

    const commentHandler=(e,index)=>{
        setAddComment((prevState)=>{
            const newState = [...prevState];
            newState[index] = !newState[index];
            return newState;
        });
    }

    const addCommentHandler=(e,postId)=>{
        setIsClicked(false);
        const data = {
            postId,
            commentBody: commentTxt
        }
        apiClient.post(`${routes.POSTS.ADD_COMMENT}`, data)
        .then((res)=>{
            setIsClicked(true);
        })
        .catch((err)=>{
            console.error(err);
        })
    }

    const savePostHandler=async (e,postId)=>{
            await apiClient.post(`${routes.POSTS.SAVE_POST}`,{
                postId
            })
            .then((res)=>{
                if(res.data.success){
                    toast.success(res.data.message);
                }
            })
            .catch((err)=>{
                console.error(err);
            })
    }

    const handleCreatePost=()=>{
        const formData = new FormData()
        formData.append("title",postDetails.title);
        formData.append("description", postDetails.description);

        if(postDetails.image){
            formData.append("image", postDetails.image);
        }
        apiClient.post(`${routes.POSTS.CREATE_POST}`,formData,{
            headers:{
                "Content-Type":"multipart/form-data"
            }
        })
        .then((res)=>{
            if(res.data.status === "success"){
                toast.success(res.data.message);
                setOpen(false);
            }
        })
        .catch((err)=>{
            console.error(err);
        })
    }

    const getUser=()=>{
        apiClient.get(`${routes.AUTH.GET_USER}`)
        .then((res)=>{
            const {user} = res.data.data;
            setUser(user);
        })
        .catch((err)=>{
            console.error(err);
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
        apiClient.delete(`${routes.POSTS.DELETE_POST}/${postId}`)
        .then((res)=>{
            if(res.data.success){
                toast.success(res.data.message);
                setIsClicked(true);
            }
        })
        .catch((err)=>{
            console.error(err);
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
            <div className="container">
                <div className="container__side">
                    <ul>
                        <li className="avatar"><img src={user?.avatar}/> {user.firstName} {user.lastName}</li>
                        <li onClick={handleModalOpen}><IoIosAddCircle/> Create Post</li>
                        <li><FaUserFriends/> Friends</li>
                        <li><FaBookmark/> Saved</li>
                        <li><MdGroups/> Groups</li>
                        <li><BiSolidMessageRounded/> Messages</li>
                    </ul>
                </div>
            </div>
            <div className="container container__posts-flex">
                {Array.isArray(posts) && posts.map((post, index) => {
                    return <div className="col-sm-8" key={index}>
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
                                                {post.userId.firstName} {post.userId.lastName} : <span>Follow</span>
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
                                            <li onClick={(e)=>deleteHandler(e,post._id)}>Delete</li>
                                            <li>Edit</li>
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
                                <p><AiOutlineLike /> {post.likes} Likes</p>
                                <p>{post.comments?.length} Comments</p>
                            </div>
                            <div className="posts-panel">
                                <button onClick={(e) => likeHandler(e, post._id)}><AiOutlineLike /> Like</button>
                                <button onClick={(e) => dislikeHandler(e, post._id)}><AiOutlineDislike /> Dislike</button>
                                <button onClick={(e) => commentHandler(e, index)}><FaRegComment/> Comments</button>
                                <button onClick={(e)=> savePostHandler(e,post._id)}><IoBookmarkOutline/> Save</button>
                            </div>
                            {/* Comments */}
                            <div className="comments">
                                {Array.isArray(post.comments) && post.comments.map((comment, commentIndex) => {
                                    return (
                                        <div className="comment" key={commentIndex}>
                                            <span>{comment.comments}</span>
                                        </div>
                                    );
                                })}
                                {addComment[index] && 
                                    <div className="comments-container">
                                        <input placeholder="Comment here" type="text" value={commentTxt} onChange={handleComment} />
                                        <span onClick={(e) => addCommentHandler(e, post._id)}><FaTelegramPlane /></span>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </main>
        <CreatePost open={open} 
        handleCreatePost={handleCreatePost}
        handleModalOpen={handleModalOpen} 
        handleModalClose={handleModalClose} />
    </React.Fragment>
}

export default Feed;