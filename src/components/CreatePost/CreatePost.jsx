import * as React from "react";
import { useDispatch } from "react-redux";
import { postActions } from "../../features/postSlice";
import "./CreatePost.css";

const CreatePost = ({ open, handleModalOpen, handleModalClose, handleCreatePost }) => {
    const dispatch = useDispatch();
    const [postDetails, setPostDetails] = React.useState({
        title:"",
        description:"",
        image:""
    });
    const handleDetails=(e)=>{
        const {name,value} = e.target;
        if(name === "title" || name === "description"){
            setPostDetails({
                ...postDetails,
                [name]:value
            });
        }else if(name === "image"){
            setPostDetails({
                ...postDetails,
                "image":e.target.files[0]
            })
        }
        dispatch(postActions.addPost(postDetails));
    }
    if(open){
        return <div className="backdrop">
            <div className="createPost-modal">
                <div className="createPost-modal__header">
                    <h3>Create Post</h3>
                    <button className="close-btn" onClick={handleModalClose}>X</button>
                </div>
                <div className="createPost-modal__body">
                    <input name="title" 
                        value={postDetails.title} 
                        onChange={handleDetails} 
                        type="text" 
                        placeholder="Enter title"
                    />
                    <textarea name="description" 
                        value={postDetails.description} 
                        onChange={handleDetails} 
                        placeholder="What's on your mind?" 
                        rows={5} cols={40} 
                        style={{resize:"none"}} 
                    />
                    <input name="image" 
                        className="input_image" 
                        type="file" 
                        // value={postDetails.image} 
                        onChange={handleDetails} 
                    />
                </div>
                <div className="createPost-modal__footer">
                    <button onClick={handleCreatePost} className="btn btn-primary">Post</button>
                </div>
            </div>
        </div>
    }else{
        return null;
    }
}

export default CreatePost;