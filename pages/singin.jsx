import Cookie from 'js-cookie';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../store/globaleState';
import { postData } from '../utils/FeatchData';






const Singin = () => {

  const {state,dispatch}=useContext(DataContext) ;

   const {auth}=state;

 const router=useRouter()

 useEffect(() => {
 
  if(Object.keys(auth).length !== 0){

    router.push('/')
  }
  

 }, [auth, router])


  const initialstate={
    
    email:"",
    password:"",
    
}


const [userData,setUserData]=useState(initialstate) ;

const {email,password}=userData


const handleInputChange=(e)=>{
    const {name,value}=e.target ;

    setUserData({
        ...userData,[name]:value
    })
}


    //  SEND DATA TO DB

    const handleSubmitBtn= async(e)=>{
      e.preventDefault() ;

       if(!email || !password) return dispatch({type:"NOTIFY",payload:{error:"Please fill all fields !"}})
        
      dispatch({type:"NOTIFY",payload:{loading:true}}) ;
      
     const res= await  postData("/auth/login",userData) ;

      if(res.err) return dispatch({type:"NOTIFY",payload:{error:res.err}}) ;

       dispatch({type:"NOTIFY",payload:{success:res.msg}}) ; 

       dispatch({type:"AUTH",payload:{token:res.access_token,user:res.user}})
    
       Cookie.set('reFreshToken',res.refresh_token ,{
        path:'api/auth/accessToken',
        expires:7})
       
        localStorage.setItem("firstLogin",true);
        
       
  }
    return (
      <div> 

          <Head>
            <title>Singin page</title>
          </Head>
 
      <div className="px-2 py-2 mt-6 md:py-5 ">
 <form style={{ maxWidth:"500px"}} className="px-5 pt-6 pb-8 mx-auto text-white border shadow-lg md:rounded-full shadow-violet-500 dark:border-none " onSubmit=  {handleSubmitBtn}>

 
      <div className='relative'>
    <h4 className='z-50 w-1/2 pb-2 mx-auto text-2xl text-center text-white rounded-full -top-4 bg-violet-700 dark:bg-teal-600 '>Sing in  </h4> 
    <hr  className='absolute right-0 w-full h-2 mx-auto duration-75 border-2 border-violet-600 dark:border-teal-600 top-3 -z-50 '/>
    </div>

 

   <div className="mb-1">
     <label className="block mb-2 text-sm font-bold text-gray-800 dark:text-teal-600" htmlFor="email">
       Email
     </label>
     <input onChange={handleInputChange} name='email' value={email} className="w-full px-3 py-2 leading-tight text-black border rounded-full shadow appearance-none dark:text-white dark:border-teal-600 focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="email" />
   </div>

   <div className="mb-1">
     <label className="block mb-2 text-sm font-bold text-gray-800 dark:text-teal-600" htmlFor="password">
       Password
     </label>

     <input onChange={handleInputChange} name='password' value={password} className="w-full px-3 py-2 mb-3 leading-tight text-black border rounded-full shadow appearance-none dark:text-white dark:border-teal-600 focus:outline-none" id="password" type="password" placeholder="******************" />
  
   </div>

 

   <div className="flex items-center justify-between">
     <button className="w-1/2 px-4 py-2 mx-auto font-medium text-white rounded-full bg-violet-700 dark:bg-teal-600 hover:bg-violet-600 focus:outline-none focus:shadow-outline" type="submit">
      Login
     </button>
   </div>
   <p className='mt-2 text-sm text-center text-black dark:text-teal-600 '> Donot have na account ? 
       <Link href="/register">
       <a className='text-red-800 underline text-bold '>  Register now  </a>
     </Link> 
     </p>
 </form>


</div>
       </div>
    )
}

export default Singin
