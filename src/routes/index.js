const routes = {
    AUTH:{
        LOGIN:"/users/login",
        REGISTER:"/users/register",
        LOGOUT:"/users/logout",
        GET_USER:"/users/getUser",
        GET_ALL_USERS:"/users/getAllUser",
        ADD_COVER_IMAGE:"/users/add-cover-image",
        FOLLOW_USER:"/users/follow-user",
        GET_FOLLOWING_USER:"/users/get-following-list",
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