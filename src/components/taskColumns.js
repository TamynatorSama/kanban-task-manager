import { useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setNewState, switchTask } from "../store/features/boards/addtaskSlice"
import TaskCard from "./taskCard"

const TaskColumn = (props) => {

  const dispatch = useDispatch()
  const presentIndex = useSelector((state) => state.clickReducer.presentIndex)

  let newCol
  let movable

  const columnHolder = useRef()

  function ondragOfTask(e, index) {
    e.preventDefault()
    movable = index
  }
  function ondragenter(e) {
    let good = ""
    if (e.target.className === "column") {
      good = e.target.id
    }
    else if (e.target.className === "tasks") {
      good = e.target.parentNode.id
    }
    else {
      good = e.target.parentNode.parentNode.id
    }
    dispatch(setNewState(good))
  }
  function ondragover(e) {
    e.preventDefault()
  }
  function ondragEnd(e, status) {
    dispatch(switchTask({ move: movable, moveFrom: status, board: presentIndex }))
  }


  const uniqueTask = useSelector((state) => state.taskReducer[props.state][presentIndex])
  let displayTask = uniqueTask.map((e, index) => <TaskCard id={index} task={e} drag={ondragOfTask} key={e.title} />)
  return (
    <div className='column' ref={columnHolder} id={props.state} onDragOver={ondragover} onDragEnter={ondragenter} onDragEnd={(e) => ondragEnd(e, props.state, newCol)}>
      <div className='column--header'>
        <div className='color' style={{ "--col": `#ff${props.color}` }} ></div>
        <p>{props.state} ({uniqueTask.length})</p>
      </div>
      {displayTask}
    </div>
  )
}
export default TaskColumn