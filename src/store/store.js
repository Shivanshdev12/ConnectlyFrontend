import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/postSlice";
import userReducer from "../features/userSlice";
import menuReducer from "../features/menuSlice";

const store = configureStore({
    reducer:{
        posts:postReducer,
        users:userReducer,
        menu:menuReducer
    }
})  

export default store;