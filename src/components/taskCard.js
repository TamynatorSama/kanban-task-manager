import { useDispatch } from "react-redux"
import { detailsModalController } from "../store/features/modal/modal"
import { seeFullDetails } from "../store/features/modal/showFullDetails"

const TaskCard = (props)=>{
    const dispatch = useDispatch()
    return(
        <div className='tasks' key={props.id} draggable onDrag={(e)=>props.drag(e, props.id,e.status)} onClick={()=>{
            dispatch(seeFullDetails([props.task,props.id]))
            dispatch(detailsModalController(true))
        }}>
            <p>{props.task.title}</p>
            <p>{`${props.task.subtask.filter((e)=>e.completed === true).length} of ${props.task.subtask.length} subtasks`}</p>

        </div>
    )
}
export default TaskCard