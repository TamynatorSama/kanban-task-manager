import '../css/taskmodal.css'
import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { taskBoardController } from '../store/features/modal/modal'
import SubTASK from './subTasks'
import { addNewTask } from '../store/features/boards/addtaskSlice'
const TaskModal = () => {


    const formRef = useRef()
    const presentIndex = useSelector((state) => state.clickReducer.presentIndex)
    const columnState = useSelector((state) => state.allTaskReducer.column[presentIndex])
    const tasks = useSelector((state) => state.taskReducer)
    const subRef = useRef()
    const dispatch = useDispatch()
    const [error,setError] = useState("")

    const [taskData, populateTaskData] = useState({
        title: "",
        description: "",
        subtask: ["",""],
        status: "todo"
    })

    function setInput(event) {
        setError("")
        if(!event.target.name){
            populateTaskData(taskManager => {
                taskManager.subtask[event.target.id] = event.target.value
                return({
                    ...taskManager,
                })
            })
        }
        else{
            populateTaskData(taskManager=>({
                ...taskManager,
                [event.target.name]: event.target.value
            }))
        }
    }

    function removeSubTask(removeIndex) {
        let newSub = [...taskData.subtask ] 
           let hola = [...newSub.slice(0,Number(removeIndex)),...newSub.slice(Number(removeIndex)+1,newSub.length)]
        populateTaskData(taskManager=>({
            ...taskManager,
            subtask:hola
        }))
    }


    function addSubTask(e) {
        let newSubInput = [...taskData.subtask,""]
        populateTaskData(taskManager=>({
            ...taskManager,
            subtask:newSubInput
        }))
    }


    function submitForm(){

        if(!taskData.title){
            setError("Task title is empty")
            return
        }
        else if(!taskData.description){
            setError("Task description is empty")
            return
        }
        else if(taskData.subtask.some((values)=>!values)){
            setError("Added subtask is empty")
            return
        }
        else if(tasks[taskData.status].some((e)=>e.title === taskData.title)){
            setError("Task already exists")
            return
        }
        else{
            dispatch(addNewTask({data:taskData,board:presentIndex }))
            dispatch(taskBoardController(false))
        }

    }


    return (
        <div className="board-modal" onClick={(e)=>{
            if(e.target.className === "board-modal")
            dispatch(taskBoardController(false))
        }}>
            <div className='modal--content' ref={formRef}>
                {error ? <div className='error'>{error}</div> :null}
                <header>
                    <h1>Add New Task</h1>
                    <svg onClick={() => dispatch(taskBoardController(false))} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </header>
                <div className='input--holder'>
                    <p>Title</p>
                    <input onChange={setInput} placeholder='eg Take coffe break' name='title' value={taskData.title} />
                </div>
                <div className='input--holder'>
                    <p>Description</p>
                    <textarea onChange={setInput} value={taskData.description} placeholder='eg its always good to take a break. this 15 minutes break  will reacharge the baterries a little...' name='description' />
                </div>
                <div className='input--holder'>
                    <div className='task--hold' ref={subRef}>
                        <p>Subtasks</p>
                        {taskData.subtask.map((e,i)=>{
                            if(i ===0 ){
                                return <SubTASK placeholder="eg take water" key={i} change={setInput} data="0" value={e} remove={removeSubTask}/>
                            }
                            else if(i===1){
                                return  <SubTASK key={i}  placeholder="eg make the coffe and drink with a smile" change={setInput} data="1" value={e} remove={removeSubTask}/>
                            }
                            return <SubTASK key={i}  data={i} change={setInput} remove={removeSubTask} value={e} id={i} />
                        })}
                    </div>
                    <button onClick={addSubTask} className='add-new'>+Add New Subtask</button>
                </div>
                <div className='input--holder'>
                    <p>Status</p>

                    <select onChange={setInput} value={taskData.status} name="status">
                        {columnState.map((e) => <option key={e} value={e} >{e}</option>)}
                    </select>
                </div>
                <button onClick={submitForm}>Create New Board</button>
            </div>
        </div>
    )
}
export default TaskModal