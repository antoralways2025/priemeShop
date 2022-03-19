/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../store/globaleState';
import { patchData } from '../utils/FeatchData';
// import { default as imageUploader, default as valid } from '../utils/valid';
import imageUploader from '../utils/imageUploader';
import valid from '../utils/valid';

const Profile = () => {

    const initialState={
        avatar:"",
        name:"",
        email:"",
        password:"",
        cf_password:""
    }

    
     const [data,setData]=useState(initialState) ;

     const{name,email,password,cf_password ,avatar}=data ;



     

    const {state,dispatch}=useContext(DataContext) ;

    const{auth ,orders}=state ; 

    
   

    useEffect(()=>{
        setData({...data,name:auth.user ? auth.user.name:''}) 
    },[auth.user])



        const handleChangeInput=(e)=>{

            const {name,value}=e.target ;
            setData({...data,[name]:value})
        }


        const handleUpdateData=(e)=>{
            
            e.preventDefault()

            if(password){
                const errMsg= valid(name,auth.user.email,password,cf_password) ; 
                 
                 if(errMsg) return dispatch({type:"NOTIFY",payload:{error:errMsg}}) ;

                 updatePassword() ;
            }
            
        
            // if( avatar )return imageUploader([avatar]) ;
            if(avatar || name !== auth.user.name) updateInfor()
     
           
        }


        const updateInfor=async()=>{
            let media;

              dispatch({type:"NOTIFY",payload:{loading:true}})

                    if(avatar)  media = await imageUploader([avatar])  ;

                     

                     const res= await patchData('user',{name,avatar: avatar ? media[0].url : auth.user.avatar},auth.token) ;

                            if(res.err) return dispatch({type:"NOTIFY",payload:{error:res.err}}) ;

                            dispatch({type:"AUTH",payload:{
                                token:auth.token ,
                                 user:res.user
                            }})

                          return  dispatch({type:"NOTIFY",payload:{success:res.msg}})
               
        }


        const updatePassword= async()=>{

                          dispatch({type:"NOTIFY",payload:{loading:true}}) ;

                const res = await patchData('user/resetPassword',{password},auth.token) ;

                 if(res.err) return dispatch({type:"NOTIFY",payload:{error:res.err}}) ;


                 dispatch({type:"NOTIFY" ,payload:{success:res.msg}})

                 setData({...initialState,name:auth.user.name})


        }


            const onChangeFileHandler=(e)=>{
                 const file= e.target.files[0] ;


                 

     if(file.type !== "image/png" && file.type !== "image/jpeg" && file.type !== "image/jpg") return dispatch({type:"NOTIFY",payload:{error:"The file format only jpg, jpeg & png supported "}})
                

                

                  if(file.size > 1024 * 1024) return dispatch({type:"NOTIFY",payload:{error:"The file size too large"}}) ;


                //   const objectURL = URL.createObjectURL(file) ;


                  setData({...data,avatar:file})  ;

                  }

         

    if(!auth.user)return null
  return (
    <div className='mt-3 sm:px-16 '>
    <Head>

        <title>Profile</title>
    </Head> 




              <div className="grid grid-cols-1 gap-2 md:grid-cols-2 ">
 

                  <form className=' bg-violet-300 dark:bg-gray-700'>

                      <h3 className='m-4 text-2xl font-bold text-center'> {auth.user.role=== 'user' ? "User Profile" :"Admin Profile"}</h3>

                      <div className='relative bottom-0 w-24 h-24 mx-auto overflow-hidden text-center border rounded-full mainPartProfile'>
                                <img  className='w-full h-full' src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar} alt="profile" />

                              

                           <div className='absolute bottom-0 left-0 h-6 text-center bg-transparent cursor-pointer hvrPartProfile bg-dark-0 '>
                           
                           <i className=' fas fa-camera'></i>
                           <input  onChange={onChangeFileHandler}  type="file" id='file_up' className='w-full h-screen text-sm bg-transparent ' />
                           
                    
                           </div>
                      </div>

                      <div  className='w-full p-4 px-6 mx-auto mb-2 text-center shadow-lg'>

                          <div>
                              <label className='block font-bold text-left' htmlFor="name">Name</label>
                                <input autoComplete='off'  className='w-full px-2 py-2 border rounded dark:bg-gray-800 ' type="text" name='name'  onChange={handleChangeInput} value={name} />
                          </div>
                          <div>
                              <label className='block font-bold text-left' htmlFor="name">Email</label>
                                <input disabled={true} className='w-full px-2 py-2 border rounded dark:bg-gray-800 ' type="email" name='email'   
                                 defaultValue={auth.user.email} /> 

                          </div>
                          <div>
                              <label className='block font-bold text-left' htmlFor="name">New Password</label>
                                <input  autoComplete='off' className='w-full px-6 py-2 bg-white border rounded dark:bg-gray-800' type="password" name='password' value={password} 
                                onChange={handleChangeInput} />
                          </div>

                          <div>

                              
                              <label className='block font-bold text-left' htmlFor="name">Confirm Password</label>
                                <input  autoComplete='off' className='w-full px-6 py-2 bg-white border rounded dark:bg-gray-800' type="password" name='cf_password' 
                                 onChange={handleChangeInput} value={cf_password} />  


                          </div>

                          <button onClick={handleUpdateData} className='w-3/4 px-4 py-2 mx-auto mt-3 text-white rounded bg-violet-700 dark:bg-gray-900 bg'>  Update 
                          
                          Profile  </button>

                      </div>

                        

                      
                  </form> 

                  <div className=' bg-violet-300 md:px-4 dark:bg-gray-700'>

                      <h3 className='text-3xl text-center white'>Order History</h3>

                      <table  className='w-full p-6 mx-auto text-center table-auto md:mt-4'>

                          <thead>
                              <tr className='border-4 rounded-md '>
                                  <td className='border' >ID</td>
                                  <td className='border ' >Date</td>
                                  <td className='border ' >Total</td>
                                  <td className='border ' >Delivered</td>
                                  <td className='border ' >Paid</td>
                              </tr>
                          </thead>
                            <tbody>

       {
                orders.map(item=>(
                  <tr className='border' key={item._id}> 

                     <td className='border'>
                     <Link href={`/order/${item._id}`}>

                        {item._id} 

                   </Link>
                        
                         
                         </td>
                      <td>
                        {
                            new Date(item.createdAt).toLocaleDateString()
                         }
                        </td>
                        <td className='border'>
                            {
                                item.total
                            }
                        </td>

                      <td className='border'>

                       {
                       item.delivered
                        ?
                        <i className='text-green-600 fas fa-check'></i> 
                        : <i className='text-red-600 fas fa-times'></i>
                        }
                             
                        </td>

                         <td className='border'>

                       {
                       item.paid
                        ?
                        <i className='text-green-600 fas fa-check'></i> 
                        : <i className='text-red-600 fas fa-times'></i>
                        }
                             
                        </td>

 

                             </tr>
                                ))
                                }

                            </tbody>
                      </table>


                  </div>

              </div>


 



</div>
  )
};

export default Profile;
