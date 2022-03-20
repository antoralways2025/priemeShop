import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../store/GlobaleState';
import { postData } from '../utils/FeatchData';
import valid from '../utils/valid';


const Register = () => {

   const {state,dispatch}=useContext(DataContext) ;

   
  
   
   const {auth}=state;

   const router=useRouter()
  
   useEffect(() => {
   
    if(Object.keys(auth).length !== 0){
  
      router.push('/')
    }
    
  
   }, [auth, router])

    const initialstate={
        name:"",
        email:"",
        password:"",
        cf_password:""
    }


    const [userData,setUserData]=useState(initialstate) ;

    const {name,email,password,cf_password}=userData


    const handleInputChange=(e)=>{
        const {name,value}=e.target ;

        setUserData({
            ...userData,[name]:value
        })
    }


    //  SEND DATA TO DB

    const handleSubmitBtn= async(e)=>{
        e.preventDefault() ;


       const errMsg=  valid(name,email,password,cf_password) ;
          if(errMsg) return  dispatch({type:"NOTIFY",payload:{error:errMsg}}) 
         
          dispatch({type:"NOTIFY",payload:{loading:true}}) 

          // post data to fetch 

           const res= await postData("/auth/register",userData) ;

            if(res.err) return dispatch({type:"NOTIFY",payload:{error:res.err}})


            router.push('/singin')
          
            dispatch({type:"NOTIFY",payload:{success:res.msg}})
          
         
    }
    return (
        <div>

          <Head>
            <title>Register page</title>
          </Head>
 
       <div className="px-3 py-2 mt-6 md:py-5">
  <form style={{ maxWidth:"500px"}} className="px-5 pt-6 pb-8 mx-auto text-white border shadow-lg md:rounded-full shadow-violet-400 dark:border-none " onSubmit={handleSubmitBtn}>


     <div className='relative'>
     <h4 className='z-50 w-1/2 p-1 mx-auto text-lg font-medium text-center text-white rounded-full bg-violet-700 dark:bg-teal-600 '>Register </h4> 
     <hr  className='absolute w-full h-2 mx-auto duration-75 border-2 border-violet-900 dark:border-teal-600 top-3 -z-50 right-3 '/>
     </div>

      
    <div className="mb-1">
      <label className="block mb-2 text-sm font-bold text-gray-800 dark:text-teal-600" htmlFor="email">
        Name
      </label>
      <input onChange={handleInputChange} name='name' value={name} className="w-full px-3 py-2 leading-tight text-black border rounded-full shadow appearance-none dark:text-white dark:border-teal-600 focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Ex: Shiekh Antor" />
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

    <div className="mb-1">
      <label className="block mb-2 text-sm font-bold text-gray-800 dark:text-teal-600" htmlFor="ConfirmPassword">
       Confirm Password
      </label>

      <input onChange={handleInputChange} name='cf_password' value={cf_password} className="w-full px-3 py-2 mb-3 leading-tight text-black border rounded-full shadow appearance-none dark:text-white dark:border-teal-600 focus:outline-none" id="Confirmpassword" type="password" placeholder="******************" />
   
    </div>

    <div className="flex items-center justify-between ">
      <button className="w-1/2 px-4 py-2 mx-auto text-white rounded-full bg-violet-700 dark:bg-teal-600 font-medi hover:bg-violet-800 focus:outline-none focus:shadow-outline" type="submit">
        
       Submit now
      </button>
    </div>

    <p className='mt-2 text-sm text-center text-black dark:text-teal-600'> You  have already an account 

        <Link href="/singin">

        <a className='text-red-800 underline text-bold '> Login now </a>
        
        </Link> 
    </p>

  </form>
 

</div>
        </div>
    )
}

export default Register
