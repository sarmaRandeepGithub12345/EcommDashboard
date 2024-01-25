import React from 'react'

const CustomToast = ({onClose,visible,messageToast,values}) => {
    
    const handleClose = (e)=>{
        e.preventDefault()
        if(e.target.id==='parent'){
          onClose()
        }
      }
  
    if(!visible){
    return null
  }
  
  return (
    <div id="parent" className={`${values}  fixed z-[100] inset-0 `} onClick={handleClose}>
       <div 
       style={{
        transition: "all 0.2s",
       }}
       className={`flex text-[18px] flex-row items-center text-[white] rounded-full p-2 h-fit w-fit ${messageToast.result==="error"?"bg-[red]":"bg-[#269a26]"}`}>
       <p className={`h-[30px] w-[30px] rounded-full flex justify-center items-center bg-[white] ${messageToast.result==="error"?"text-[red]":"text-[#269a26]"} font-[500] text-[20px] mr-2 `} >{messageToast.result==="error"?"X":"✔"}</p>
        <p>{messageToast.message}</p>
        
        </div>
    </div>
  )
}

export default CustomToast