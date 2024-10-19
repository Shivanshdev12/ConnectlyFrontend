import { createSlice } from "@reduxjs/toolkit";

const initialState = { title:"", description:"", image:""};

const postSlice = createSlice({
    name:"posts",
    initialState,
    reducers:{
        addPost(state, action){
            state.title = action.payload.title;
            state.description = action.payload.description;
            state.image = action.payload.image;
        }
    }
});

export const postActions = postSlice.actions;

export default postSlice.reducer;