import { createSlice } from "@reduxjs/toolkit";


const initialState ={
    column:[
        ["todo","doing","done"]
    ]
}

const allTaskSlice = createSlice({
    name:"all task",
    initialState,
    reducers:{
        addDefaultState:(state)=>{
            state.column.push(["todo","doing","done"])
            localStorage.setItem('columns',JSON.stringify(state.column))
        },
        addExtraColumn:(state,action)=>{
            state.column[action.payload.index] = [...state.column[action.payload.index],action.payload.title]
            localStorage.setItem('columns',JSON.stringify(state.column))
        },
        initializeColumn:(state,action)=>{
            if(!action.payload) return
            state.column = action.payload
        },
        deleteBoardColumn:(state,action)=>{
            let newState = state.column
            state.column = newState.filter((e)=>newState.indexOf(e) !== action.payload)
            localStorage.setItem('columns',JSON.stringify(state.column))
        }
    }
})

export default allTaskSlice.reducer
export const {addDefaultState,addExtraColumn,initializeColumn,deleteBoardColumn}  = allTaskSlice.actions