import React from 'react'
 


function Toast({ clr,handleShow,bgColor,toastMsg}) {
    return (
        <div className={`absolute top-2 p-5  z-50 rounded right-3 w-72 ${bgColor} border  border-green-900 shadow-lg`}>

            <div className='flex justify-between align-baseline '>
                <h3 className={` font-bold text-center ${clr}`}>{toastMsg.title} </h3>

                <button onClick={handleShow} className='text-red-700 bg-white rounded-full hover:scale-125 text-bold w-7 h-7'>X</button>
            </div>

            <div className='mt-3 '>
                <p  style={{fontSize:"13px"}} className='text-sm text-white'> {toastMsg.bodyMsg}</p>
            </div>
            
        </div>
    )
}

export default Toast
