import { createSlice } from "@reduxjs/toolkit";

const initialState = {isOpen:false};

const menuSlice = createSlice({
    name:"menu",
    initialState,
    reducers:{
        openMenuState:(state,action)=>{
            state.isOpen = action.payload;
        }
    }
});

export const menuActions = menuSlice.actions;

export default menuSlice.reducer;