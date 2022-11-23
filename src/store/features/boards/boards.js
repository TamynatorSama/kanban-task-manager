import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    board:["Default"],
}

const BoardSlice = createSlice({
    name: "board",
    initialState,
    reducers:{
        addBoard:(state,action)=>{
            state.board.push(action.payload)
            localStorage.setItem('boards',JSON.stringify(state.board))
        },
        initialBoard:(state,action)=>{
            if(!action.payload)return
            state.board = action.payload
        },
        deleteBoard:(state,action)=>{
            let newState = state.board
            state.board = newState.filter((e)=>newState.indexOf(e) !== action.payload)
            localStorage.setItem('boards',JSON.stringify(state.board))
        }
    }
})

export default BoardSlice.reducer 

export const {addBoard,initialBoard,deleteBoard} = BoardSlice.actions