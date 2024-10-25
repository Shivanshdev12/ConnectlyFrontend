import { createSlice } from "@reduxjs/toolkit";

const initialState = {userId:""};

const userSlice = createSlice({
    name:"users",
    initialState,
    reducers:{
        setUserState:(state,action)=>{
            state.userId = action.payload;
        },
        clearUserState:(state,action)=>{
            state.userId = "";
        }
    }
})

export const userActions = userSlice.actions;

export default userSlice.reducer;