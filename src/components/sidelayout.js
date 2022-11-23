import { useSelector } from "react-redux"
import CreateBoard from "./createBoardModal"
import CreateColumn from "./createColumn"
import FullDetails from "./showFull"
import SideNav from "./sideNav"
import TaskModal from "./taskModal"


const SideLayout = (props)=>{
    const modalTruth = useSelector((state)=>state.modalControl.createBoard)
    const taskModalTruth = useSelector((state)=>state.modalControl.taskboard)
    const detailsTruth = useSelector((state)=>state.modalControl.detailsBoard)
    const columnTruth = useSelector((state)=>state.modalControl.columnState)
    return(
        <section>
            {columnTruth ? <CreateColumn /> : null}
            {detailsTruth ? <FullDetails /> : null}
            {taskModalTruth ? <TaskModal />:null}
            {modalTruth? <CreateBoard /> :null}
            <SideNav newRef={props.hideNavRef}/>
            {props.children}
        </section>
    )
}
export default SideLayout