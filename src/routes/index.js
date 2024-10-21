const routes = {
    AUTH:{
        LOGIN:"/users/login",
        REGISTER:"/users/register",
        GET_USER:"/users/getUser",
        ADD_COVER_IMAGE:"/users/add-cover-image"
    },
    POSTS:{
        GET_USER_POSTS:"/posts/get-user-posts",
        CREATE_POST:"/posts/create-post",
        GET_POSTS:"/posts/get-posts",
        SAVE_POST:"/posts/save-post",
        DELETE_POST:"/posts/delete-post",
        ADD_COMMENT:"/posts/add-comment",   
        LIKE_POST:"/posts/like-post",
        DISLIKE_POST:"/posts/dislike-post",
    },
    COMMENTS:{
        REPLY_COMMENT:"/comments/reply-comment",
    }
}

export default routes;