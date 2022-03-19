/* eslint-disable @next/next/no-img-element */
import { ChatAltIcon, CheckIcon, CogIcon, PencilAltIcon, XIcon } from '@heroicons/react/Outline';
import Head from 'next/head';
import Link from 'next/link';
import React, { useContext } from 'react';
import { DataContext } from '../store/globaleState';


const Users = () => {
    const {state,dispatch}=useContext(DataContext) ;
    const {users ,auth }=state ;


    const deleteHandler= async(user)=>{

              dispatch({type:"ADD_MODAL",payload:[{modalShow:true ,data:'',id:user._id ,title:user.name ,type:"removeUser"}]})

    }



    if(!auth.user) return null

  return (
    <div> 
        <Head><title>Users</title></Head>

        <div className="flex flex-col">
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden ">
                <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                    <thead className="bg-gray-100 dark:bg-gray-700">
                        <tr>
 

                            <th scope="col" className="px-6 py-3 text-xs tracking-wider text-center text-gray-700 uppercase font- dark:text-gray-400">
                                NO
                            </th>

                            <th scope="col" className="px-6 py-3 text-xs tracking-wider text-center text-gray-700 uppercase font- dark:text-gray-400">
                                ID
                            </th>
                            <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">
                                    AVATAR
                            </th>
                            <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">
                                 NAME
                            </th>
                            <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">

                                <ChatAltIcon   className='inline w-6 mr-2 text-center text-green-700' />

                                
                                 email
                            </th>
                            <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">
                                 Admin and Users  
                            </th>

                            <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">
                               
                                Edit

                            </th>


                            
                        </tr>
                    </thead>


                {
                    
                    users.map((user,index)=>(

                        <tbody key={user._id} className="bg-white divide-y divide-gray-200 cursor-pointer dark:bg-gray-800 dark:divide-gray-700">
                        <tr className="text-center hover:bg-gray-100 dark:hover:bg-gray-700 ">
 

 

                            <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{index + 1}</td>
                            <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{user._id}</td>
                            <td className="px-6 py-4 text-sm font-medium text-center text-gray-500 whitespace-nowrap dark:text-white"> 
                             <img src={user.avatar} alt={user.avatar} className='w-10 h-10 mx-auto text-center rounded-md hover:scale-150' />
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.name}</td>
                            <td className="px-6 py-4 text-sm font-medium whitespace-nowrap ">
                                {user.email} 
                            </td>

                            <td className="px-6 py-4 text-sm font-medium text-center whitespace-nowrap ">

                                 
                          
                            {
                                user.role === 'admin' ? user.root ? 
                                 <span className='text-emerald-500'><CheckIcon  className='inline w-6 text-center text-emerald-500'  /> 
                                 ----
                                 <CogIcon  className='inline w-6 text-center text-emerald-500'  />
                                   </span>
                                  : <CheckIcon  className='inline w-6 text-center text-emerald-500'  /> 
                                             :<XIcon  className='inline w-6 text-center text-red-600' />
                            }

                                
                            </td>

                            <td className="px-6 py-4 text-sm font-medium whitespace-nowrap ">

                                <Link href={ auth.user.root&& auth.user.email !== user.email ?    `edit_user/${user._id}` :`#!`}  >
                                
                             <a  > <PencilAltIcon className="inline w-6 text-center dark:text-teal-600 text-emerald-500"  /></a>
                                </Link>

                              
                                    ----
                                    {
                                        auth.user.root && auth.user.email !== user.email 
                                        ?  <XIcon  onClick={()=>deleteHandler(user)} className='inline w-6 text-center text-rose-600' />
                                        :  <XIcon  className='inline w-6 text-center text-gray-500' />
                                    }
                               
                                
                            </td>
                        </tr>
 
 
                    </tbody>


                    ))
                }

  
                </table>
            </div>
        </div>
    </div>
</div>
        
    </div>
  )
}

export default Users