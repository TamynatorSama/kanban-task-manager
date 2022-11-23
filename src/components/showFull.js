import { useSelector, useDispatch } from "react-redux"
import { changeSubtaskState, deleteTask, setNewState, switchTask } from "../store/features/boards/addtaskSlice"
import { detailsModalController } from "../store/features/modal/modal"
import { changeId } from "../store/features/modal/showFullDetails"



const FullDetails = () => {
    const presentIndex = useSelector((state) => state.clickReducer.presentIndex)
    const taskDetails = useSelector((state) => state.seeFullDetailsReducer.taskFull)
    const dispatch = useDispatch()
    const columnState = useSelector((state) => state.allTaskReducer.column[presentIndex])
    const allTask = useSelector((state) => state.taskReducer[taskDetails.status][presentIndex])
    const myTask = allTask[taskDetails.id]
    return <div className="board-modal" onClick={(e) => {
        if (e.target.className === "board-modal")
            dispatch(detailsModalController(false))
    }}>
        <div className="modal--content" style={{ "height": "fit-content" }}>
            <header>
                <input type="checkbox" id="more-option" />
                <h1 className="special">{myTask.title}</h1>
                <div className="more">
                    <p onClick={() => dispatch(detailsModalController(false))}><span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    </span> Close</p>
                    {/* <p><span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
</svg>
</span>Edit</p> */}
                    <p onClick={() => {
                        dispatch(detailsModalController(false))
                        dispatch(deleteTask({ board: presentIndex, status: taskDetails.status, index: taskDetails.id }))
                    }}><span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                        </span>Delete</p>
                </div>
                <label for="more-option">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                    </svg>
                </label>
            </header>
            <p className="details">{myTask.description}</p>
            <div className="subtasks--section">
                <h5>Subtasks ({myTask.subtask.filter((e) => e.completed === true).length} of {myTask.subtask.length})</h5>
                <div className="sub--content">
                    {myTask.subtask.map((e, index) =>
                        <div className="sub--class" key={e.data}>
                            <input type="checkbox" id={e.data} checked={e.completed} onChange={() =>
                                dispatch(
                                    changeSubtaskState(
                                        { state: myTask.status, index: taskDetails.id, oldState: e.completed, subIndex: index, board: presentIndex }
                                    ))
                            } />
                            <label for={e.data}><p>&#10003;</p></label>
                            <p className="real">{e.data}</p>
                        </div>
                    )}
                </div>
            </div>
            <div className='input--holder'>
                <p>Status</p>

                <select name="status" value={myTask.status} onChange={(e) => {

                    dispatch(setNewState(e.target.value))
                    dispatch(changeId({ task: allTask.length - 1, newState: e.target.value }))
                    dispatch(switchTask({ move: taskDetails.id, moveFrom: myTask.status, board: presentIndex }))
                }}>
                    {columnState.map((e) => <option key={e} value={e}>{e}</option>)}
                </select>
            </div>
        </div>
    </div>
}
export default FullDetails