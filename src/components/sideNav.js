import '../css/sideNav.css'
import { useDispatch, useSelector } from "react-redux"
import { createBoardController } from '../store/features/modal/modal'
import { setBoard } from '../store/features/generalstate/sideNavClick'
import NameHolder from './nameHolder'
const SideNav = (props) => {
    const board = useSelector((state) => state.boards.board)
    const dispatch = useDispatch()
    const hideRef = props.newRef

    const select =(selectedIndex)=>{
        dispatch(setBoard(selectedIndex))
    }

    const handleClick = ()=>{
        if(hideRef.current.style.display === "none" ){
            return
        }
        hideRef.current.style.display = "none"
    }

    let display = board.map((e,index)=><NameHolder key={e} name={e} change={select} indexPre={index}/>)
    return (
        <aside ref={hideRef}>
            <div className="logo">
                <div className="logo-symbol">
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </div>
                <h1>Kanban</h1>
            </div>
            <p>ALL BOARDS ({board.length})</p>
            <div className='board-holder'>
                {display}
                <div onClick={()=>dispatch(createBoardController(true))} className='board-name create'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>
                    <p>+Create New Board</p>
                </div>
            </div>
            <div className='foot'>
                <div className='theme--switch'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                    </svg>
                    <input type="checkbox" id='theme' onChange={()=>{
                        document.documentElement.classList.toggle("light")
                    }}/>
                    <label className='switcher' for="theme">
                        <div className='switch'></div>
                    </label>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                    </svg>


                </div>
                <div className='hide-nav' onClick={handleClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                    <p>Hide SIdebar</p>
                </div>
            </div>
        </aside>
    )
}

export default SideNav