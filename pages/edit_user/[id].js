
import { ArrowNarrowLeftIcon } from '@heroicons/react/Outline';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { updateDataFromActios } from '../../store/Actions';
import { DataContext } from '../../store/globaleState';
import { patchData } from '../../utils/FeatchData';
 

const User = () => {



  const [isAdmin,setIsAdmin]=useState(false) ;
  const [num,setNum]=useState(0) ;

     const [edit_user,setEdit_user]=useState([]) ;

    const router= useRouter() ;

    const {id}=router.query ;

    const {state,dispatch}=useContext(DataContext) ;

    const {users ,auth}=state ;

  let role = isAdmin ? 'admin':'user' ;

    useEffect(()=>{

       users.forEach(user => {
              if(user._id === id) {
                setEdit_user(user)
                setIsAdmin(user.role === 'admin' ? true : false) ;
              } 
        });

      

    },[id, users])

    
    const userHandleChang= ()=>{
      setNum(num + 1)  ;
      setIsAdmin(!isAdmin) ;
    }
 
   
    const submitData=async()=>{

       

            if(num % 2 !== 0){
              dispatch({type:"NOTIFY",payload:{loading:true}}) ;
             
              const res= await  patchData(`user/${edit_user._id}`,{role},auth.token) ;
              if(res.err) return dispatch({type:"NOTIFY",payload:{error:res.err}}) ;

                  dispatch(updateDataFromActios(users,edit_user._id,{
                     ...edit_user, role

                   },"ADD_USERS"))


                   router.push('/users') ;
                   
              return  dispatch({type:"NOTIFY",payload:{success:res.msg}})

            }
      

      

     
    }


  return (
    <div className='px-10 py-2'> 

          <Head>
            <title>Edit User</title>
          </Head>
        
     <button onClick={()=> router.back()} className='px-3 py-1 text-white bg-teal-500 rounded-lg dark:bg-cyan-600'>
         
         <ArrowNarrowLeftIcon className='inline w-8 mr-1 '/>
          go back
     </button>
          
        

        <div className='grid w-10/12 grid-cols-1 p-4 mx-auto bg-gray-600 rounded-md sm:p-10 sm:w-1/2'>

                      <h1 className='text-2xl font-semibold text-center text-emerald-500'>Edit User</h1>

            <div className='flex justify-center m-4 mx-auto text-center align-middle border-2 border-gray-300 w-80'>
                <label className='px-4 py-1'>Name</label>
                 <input   disabled   defaultValue={edit_user.name} className='w-full px-4 py-1 text-white bg-transparent border-2 border-gray-300 rounded-lg outline-none' />
            </div>

            <div className='flex justify-center m-4 mx-auto text-center align-middle border-2 border-gray-300 w-80'>
                <label className='px-4 py-1'>Email</label>
                 <input    disabled   defaultValue={edit_user.email} className='w-full px-4 py-1 text-white bg-transparent border-2 border-gray-300 rounded-lg outline-none' />
            </div>


            <div className='flex justify-center m-2 mx-auto text-center border-2 border-gray-300 rounded-md align-center w-80'>
                <label className='block px-4 py-1'>Admin</label>
                 <input  checked={isAdmin} value={isAdmin}   onChange={userHandleChang}  type='checkbox'     className='block w-6 h-6 px-4 py-1 mt-1' />
            </div>

            <div className='flex justify-center m-2 mx-auto text-center border-2 border-gray-300 rounded-md align-center w-80'>
                      <button onClick={submitData} className='w-full p-2 bg-indigo-700'>Update</button>
            </div>

        </div>
    
        
    </div>
  )
}

export default User