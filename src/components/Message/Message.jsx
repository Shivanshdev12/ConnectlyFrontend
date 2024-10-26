import * as React from "react";
import "./Message.css";
import useGetFollowList from "../../hooks/useGetFollowList";
import { PiMessengerLogo, PiMessengerLogoBold, PiTelegramLogo } from "react-icons/pi";

const Message = () => {
    const followingList = useGetFollowList();
    const [selectedUser, setSelectedUser] = React.useState({});
    const userSelectHandler=(e,user)=>{
        setSelectedUser(user);
    }
    return <React.Fragment>
        <main className="message__container">
            <div className="message__users">
                {Array.isArray(followingList) && followingList.map((each)=>{
                    return <div className="message__avatar" key={each._id} onClick={(e)=>userSelectHandler(e,each)}>
                        <img src={each.avatar} alt={each.firstName} />
                        <span>{each.firstName} {each.lastName}</span>
                        <span><PiMessengerLogoBold/></span>
                    </div>
                })}
            </div>
            {Object.keys(selectedUser).length>0? <div className="message__body">
                <div className="message__body-header">
                    <img src={selectedUser.avatar} alt={selectedUser.firstName}/>
                    <span>{selectedUser.firstName} {selectedUser.lastName}</span>
                </div>
                <div className="message__body-body">
                    <div className="message__body-receiver">
                        <p>This is a test message</p>
                    </div>
                    <div className="message__body-sender">
                        <p>This is me sender</p>
                    </div>
                    <div className="message__body-receiver">
                        <p>This is a test message</p>
                    </div>
                    <div className="message__body-sender">
                        <p>This is me sender</p>
                    </div>
                </div>
                <div className="message__body-input">
                    <input type="text" placeholder="Message..."/>
                    <span><PiTelegramLogo/></span>
                </div>
            </div> : <div className="message__body">Select a chat to get started</div>}
        </main>
    </React.Fragment>
}

export default Message;