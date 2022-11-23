import { createSlice } from "@reduxjs/toolkit";


const initialState ={
    createBoard : false,
    taskboard:false,
    detailsBoard:false,
    columnState: false
}

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers:{
        createBoardController:(state,action)=>{
            state.createBoard = action.payload
        },
        taskBoardController:(state,action)=>{
            state.taskboard = action.payload
        },
        detailsModalController:(state,action)=>{
            state.detailsBoard = action.payload
        },
        columnModalController:(state,action)=>{
            state.columnState = action.payload   
        }
    }
})

export default modalSlice.reducer
export const {createBoardController,taskBoardController,detailsModalController,columnModalController} = modalSlice.actions