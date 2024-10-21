import * as React from "react";
import apiClient from "../../axiosConfig";
import routes from "../../routes";
import { FaTelegramPlane } from "react-icons/fa";
import "../Comment/Comment.css";
import "../Feed/Feed.css";

const Comment = ({ post, addComment, index, onCommentAdded }) => {
    const [commentTxt, setCommentTxt] = React.useState("");
    const [canReply, setCanReply] = React.useState([]);  // Initialize canReply as an empty array

    const handleComment = (e) => {
        setCommentTxt(e.target.value);
    };

    const addCommentHandler = (e, postId) => {
        const data = {
            postId,
            commentBody: commentTxt
        };
        apiClient.post(`${routes.POSTS.ADD_COMMENT}`, data)
            .then(() => {
                setCommentTxt("");  // Clear the input after adding a comment
                onCommentAdded();   // Trigger re-fetch or re-render to display the new comment
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const addReplyHandler = (e, commentId) => {
        const data = {
            reply: commentTxt
        };
        apiClient.post(`${routes.COMMENTS.REPLY_COMMENT}/${commentId}`, data)
            .then(() => {
                setCommentTxt("");  // Clear the input after replying
                onCommentAdded();   // Trigger re-fetch or re-render to display the new reply
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const replyHandler = (commentIndex) => {
        setCanReply((prevState) => {
            const newState = [...prevState];
            newState[commentIndex] = !newState[commentIndex];  // Toggle the reply input for the selected comment
            return newState;
        });
    };

    // Set the canReply array to track replies visibility
    React.useEffect(() => {
        if (post && post.comments) {
            setCanReply(new Array(post.comments.length).fill(false));
        }
    }, [post.comments]);

    return (
        <React.Fragment>
            <div className="comments">

                {Array.isArray(post.comments) && post.comments.length > 0 ? (
                    post.comments.map((comment, commentIndex) => {
                        return (
                            <div className="comment" key={commentIndex}>
                                <div className="comment-bar">
                                    <span>{comment.comments}</span>
                                    <span className="btn-reply" onClick={() => replyHandler(commentIndex)}>Reply</span>
                                </div>

                                {Array.isArray(comment.replies) && comment.replies.length > 0 && (
                                    <div className="replies">
                                        {comment.replies.map((reply, replyIndex) => (
                                            <div className="reply" key={replyIndex}>
                                                <span>{reply.comments}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {canReply[commentIndex] && (
                                    <div className="reply-input">
                                        <input
                                            placeholder="Write a reply..."
                                            type="text"
                                            value={commentTxt}
                                            onChange={handleComment}
                                        />
                                        <span style={{ cursor: "pointer" }} onClick={(e) => addReplyHandler(e, comment._id)}>
                                            <FaTelegramPlane />
                                        </span>
                                    </div>
                                )}

                            </div>
                        );
                    })
                ) : (
                    <span>No comments yet. Be the first to comment!</span>
                )}

                {/* Add a new comment */}
                {addComment[index] && (
                    <div className="comments-container">
                        <input
                            placeholder="Comment here"
                            type="text"
                            value={commentTxt}
                            onChange={handleComment}
                        />
                        <span onClick={(e) => addCommentHandler(e, post._id)}>
                            <FaTelegramPlane />
                        </span>
                    </div>
                )}
            </div>
        </React.Fragment>
    );
};

export default Comment;
