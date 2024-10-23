import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/postSlice";
import userReducer from "../features/userSlice";

const store = configureStore({
    reducer:{
        posts:postReducer,
        users:userReducer
    }
})  

export default store;