import { useTheme } from 'next-themes'
import React, { useContext } from 'react'
import Loading from '../components/Loading'
import Toast from '../components/Toast'
import { DataContext } from '../store/GlobaleState'


const Notify = () => {


    const {theme,setTheme}=useTheme()

    const {state,dispatch}=useContext(DataContext) ;


    const {notify}=state

    
    return (
        <>
        {
             notify.loading && <Loading/>
        }
         {
             notify.error &&  <Toast 
               clr={theme !== 'light' ? 'text-red-500' :''}
              handleShow={()=> dispatch({type:"NOTIFY",payload:{}})}
               bgColor={theme === "light" ? "bg-violet-500" :"bg-dark-700"} 
                toastMsg={{title:"Error",bodyMsg:notify.error}}
                 />

            
         }
         {
              notify.success && <Toast 
              clr={theme !== 'light' ? 'text-green-600':' '}
               handleShow={()=>dispatch({type:"NOTIFY",payload:{}})} 
               bgColor={theme === "light" ? "bg-green-600"  :"bg-dark-700"} 
               toastMsg={{title:"Success",bodyMsg:notify.success}}  />
         }
            
        </>
    )
}

export default Notify
