import { useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import '../css/boardModal.css'
import { addDefaultBoardHolder } from '../store/features/boards/addtaskSlice'
import { addDefaultState } from '../store/features/boards/allTasksState'
import { addBoard} from '../store/features/boards/boards'
import { createBoardController } from '../store/features/modal/modal'


const CreateBoard = () => {

    const [modalText,setModalText] = useState("")
    const [error,setError]= useState("")

    const dispatch = useDispatch()
    const bo = useSelector((state)=>state.boards.board)



    const setText = (event)=>{
        setModalText(modal => event.target.value)
    }



    return <div className="board-modal" onClick={(e)=>{
        if(e.target.className === "board-modal")
        dispatch(createBoardController(false))
    }}>
        <div className='modal--content' style={{"height":"fit-content"}}>
            <header>
                <h1>Create Board</h1>
                <svg onClick={()=>dispatch(createBoardController(false))} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>

            </header>
            <div className='input--holder'>
                <p>Board name</p>
                <input onChange={setText} placeholder='eg default' name='boardName' value={modalText} />
            </div>
            {error !== "" ? <p className='error'>{error}</p>:null}
            <button onClick={()=>{
                if(modalText === ""){
                    setError("field cannot be empty")
                    return
                }
                if(bo.includes(modalText)){
                    setError("board already exists")
                    return
                }
                dispatch(addBoard(modalText))
                dispatch(addDefaultState())
                dispatch(addDefaultBoardHolder())
                dispatch(createBoardController(false))
                
                }}>Create New Board</button>
        </div>
    </div>
}

export default CreateBoard