const SubTASK=(props)=>{
    return(
        <div className='sub'>
        <input key={2} onChange={props.change} placeholder={props.placeholder} value={props.value} id={props.data} />
        <svg onClick={()=>props.remove(props.data)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
    </div>
    )
}
export default SubTASK