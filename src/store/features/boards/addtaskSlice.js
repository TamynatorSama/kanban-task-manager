import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todo: [[]],
    doing: [[]],
    done: [[]],
    newState: ""
}

const addTaskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        addNewTask: (state, action) => {
            let newSubs = action.payload.data.subtask.map((sta) => ({ "completed": false, "data": sta }))
            let modifiedTask = { ...action.payload.data, subtask: newSubs }
            state[action.payload.data.status][action.payload.board] = [...state[action.payload.data.status][action.payload.board], modifiedTask]
            localStorage.setItem('tasks', JSON.stringify(state))
        },
        addDefaultBoardHolder: (state) => {
            state.todo.push([])
            state.doing.push([])
            state.done.push([])
            localStorage.setItem('tasks', JSON.stringify(state))
        },
        switchTask: (state, action) => {
            if (state.newState === action.payload.moveFrom || !state.newState) {
                return
            }
            let oldState = [...state[action.payload.moveFrom][action.payload.board]]
            let mutated = oldState.filter((e) => oldState.indexOf(e) !== action.payload.move)
            let moving = oldState.filter((e) => oldState.indexOf(e) === action.payload.move)
            moving[0].status = state.newState
            state[action.payload.moveFrom][action.payload.board] = mutated
            state[state.newState][action.payload.board] = [...state[state.newState][action.payload.board], ...moving]
            localStorage.setItem('tasks', JSON.stringify(state))
        },
        setNewState: (state, action) => {
            state.newState = action.payload
            localStorage.setItem('tasks', JSON.stringify(state))
        },
        changeSubtaskState: (state, action) => {
            state[action.payload.state][action.payload.board][action.payload.index].subtask[action.payload.subIndex] = { ...state[action.payload.state][action.payload.board][action.payload.index].subtask[action.payload.subIndex], completed: !action.payload.oldState }
            localStorage.setItem('tasks', JSON.stringify(state))
        },
        addNewStateHolder: (state, action) => {
            
            let newStateHold = []
            for (let index = 0; index < state.todo.length; index++) {
                console.log(state.todo.length)
                newStateHold.push([])
                
            }
            state[action.payload] = newStateHold
            localStorage.setItem('tasks', JSON.stringify(state))
        },
        deleteTask:(state,action)=>{
            let newState = state[action.payload.status][action.payload.board].filter((e)=>state[action.payload.status][action.payload.board].indexOf(e) !==action.payload.index)
            state[action.payload.status][action.payload.board] = newState
            localStorage.setItem('tasks', JSON.stringify(state))
        },
        initialize: (state, action) => {
            if (!action.payload) {
                return
            }
            Object.keys(action.payload).forEach((key)=>{
                state[key] = action.payload[key]
            })
        },
        deleteBoardTask:(state,action)=>{
            let stateNew = state
            let newState = Object.keys(stateNew)
            newState.forEach((stateKey,index)=>{
                // console.log(newState)
                if(stateKey === 'newState'){
                   return
                }
                let keyState = stateNew[stateKey]
                stateNew[stateKey] = keyState.filter((e,index)=> stateNew[stateKey].indexOf(e) !== action.payload)
            })
            state = stateNew
            localStorage.setItem('tasks', JSON.stringify(state))
        }
    },

})

export default addTaskSlice.reducer
export const { addNewTask, switchTask, setNewState, changeSubtaskState, addDefaultBoardHolder, addNewStateHolder, initialize,deleteTask,deleteBoardTask } = addTaskSlice.actions