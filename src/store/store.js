import {configureStore} from '@reduxjs/toolkit'
import boards from './features/boards/boards'
import modalControl from './features/modal/modal'
import clickReducer from './features/generalstate/sideNavClick'
import allTaskReducer from './features/boards/allTasksState'
import taskReducer from './features/boards/addtaskSlice'
import seeFullDetailsReducer from './features/modal/showFullDetails'


export const store = configureStore({
    reducer:{
        boards,
        modalControl,
        clickReducer,
        allTaskReducer,
        taskReducer,
        seeFullDetailsReducer
    }
})