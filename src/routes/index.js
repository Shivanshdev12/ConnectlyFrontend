const routes = {
    AUTH:{
        LOGIN:"/users/login",
        REGISTER:"/users/register",
        GET_USER:"/users/getUser"
    },
    POSTS:{
        CREATE_POST:"/posts/create-post",
        GET_POSTS:"/posts/get-posts",
        SAVE_POST:"/posts/save-post",
        DELETE_POST:"/posts/delete-post",
        ADD_COMMENT:"/posts/add-comment",
        LIKE_POST:"/posts/like-post",
        DISLIKE_POST:"/posts/dislike-post",
    }
}

export default routes;