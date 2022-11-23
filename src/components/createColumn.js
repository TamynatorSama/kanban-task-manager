import { useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import '../css/boardModal.css'
import { addNewStateHolder } from '../store/features/boards/addtaskSlice'
import { addExtraColumn } from '../store/features/boards/allTasksState'
import { columnModalController} from '../store/features/modal/modal'


const CreateColumn = () => {
    const presentIndex = useSelector((state)=>state.clickReducer.presentIndex)

    const [modalText,setModalText] = useState("")
    const [error,setError]= useState("")

    const dispatch = useDispatch()
    const bo = useSelector((state)=>state.allTaskReducer.column[presentIndex])



    const setText = (event)=>{
        setModalText(modal => event.target.value)
    }



    return <div className="board-modal" onClick={(e)=>{
        if(e.target.className === "board-modal")
        dispatch(columnModalController(false))
    }}>
        <div className='modal--content' style={{"height":"fit-content"}}>
            <header>
                <h1>Create Column</h1>
                <svg onClick={()=>dispatch(columnModalController(false))} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>

            </header>
            <div className='input--holder'>
                <p>Column name</p>
                <input onChange={setText} placeholder='eg default' name='boardName' value={modalText} />
            </div>
            {error !== "" ? <p className='error'>{error}</p>:null}
            <button onClick={()=>{
                if(modalText === ""){
                    setError("field cannot be empty")
                    return
                }
                if(bo.includes(modalText)){
                    setError("column already exists")
                    return
                }
                dispatch(addExtraColumn({index:presentIndex,title:modalText}))
                dispatch(addNewStateHolder(modalText))
                dispatch(columnModalController(false))
                
                }}>Create New Column</button>
        </div>
    </div>
}

export default CreateColumn