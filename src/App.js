// import { useRef,useEffect } from 'react';
import { useEffect, useRef } from 'react';
import { useSelector,useDispatch } from 'react-redux';

import './App.css';
import Nav from './components/nav';
import SideLayout from './components/sidelayout';
import TaskColumn from './components/taskColumns';
import { initialize } from './store/features/boards/addtaskSlice';
import { initializeColumn } from './store/features/boards/allTasksState';
import { initialBoard } from './store/features/boards/boards';
import { columnModalController } from './store/features/modal/modal';

function App() {
  const dispatch = useDispatch()
  const presentIndex = useSelector((state)=>state.clickReducer.presentIndex)
  const columnState = useSelector((state)=>state.allTaskReducer.column[presentIndex])
  const hideNav = useRef()
  // const uniqueTask = useSelector((state)=>state.taskReducer)

  // const columnHolder = useRef()
  useEffect(()=>{
    let task = JSON.parse(localStorage.getItem("tasks"))
    let board = JSON.parse(localStorage.getItem("boards"))
    const column = JSON.parse(localStorage.getItem("columns"))
    dispatch(initialize(task))
    dispatch(initialBoard(board))
    dispatch(initializeColumn(column))
  },[])

  const columns = columnState.map((sta)=><TaskColumn key={sta} state={sta} color={Math.floor(Math.random()*0xffffff).toString(16)}/>)

  return (
    <SideLayout hideNavRef={hideNav}>
      <main>
        <Nav hideNavRef={hideNav}/>
        <div className="board--class">
          {columns}
          <div onClick={()=>{
            dispatch(columnModalController(true))
          }} className='column add'>
            <h1>+New Column</h1>
          </div>
        </div>
      </main>
    </SideLayout>
  );
}

export default App;
