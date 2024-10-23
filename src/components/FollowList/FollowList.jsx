import * as React from "react";
import "./FollowList.css";

const FollowList=({open, handleModalOpen, handleModalClose})=>{
    const [loader, setLoader] = React.useState(false);
    const [isClicked, setIsClicked] = React.useState(false);

    if(open){
        return <React.Fragment>
            <div className="backdrop">
                <div className="followList-modal">
                    <div className="modal__header">
                        <h3>Create Post</h3>
                        <button className="close-btn" onClick={handleModalClose}>X</button>
                    </div>
                    <div className="modal__body">
                        <input type="text" placeholder="Search"/>
                    </div>
                </div>
            </div>
        </React.Fragment>
    }else{
        return null;
    }
}

export default FollowList;