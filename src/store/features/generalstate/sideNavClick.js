import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    presentIndex: 0
}

const clickSlice = createSlice({
    name: "click",
    initialState,
    reducers:{
        setBoard:(state,action)=>{
            state.presentIndex = action.payload
        },
    }
})

export default clickSlice.reducer

export const {setBoard} = clickSlice.actions