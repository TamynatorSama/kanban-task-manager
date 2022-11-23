import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    taskFull:{}
}

const fullDetailsSlice = createSlice({
    name:"full details",
    initialState,
    reducers:{
        seeFullDetails:(state,action)=>{
            let newPayload = {id:action.payload[1],...action.payload[0]}
            state.taskFull = newPayload   
        },
        changeId:(state,action)=>{
            state.taskFull = {...state.taskFull,id:action.payload.task,status: action.payload.newState}
        }
    }   
})
export default fullDetailsSlice.reducer
export const {seeFullDetails,changeId} = fullDetailsSlice.actions