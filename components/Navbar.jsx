/* eslint-disable @next/next/no-img-element */
import { ChartPieIcon, IdentificationIcon, LogoutIcon, MoonIcon, ShoppingCartIcon, SunIcon, UserCircleIcon, UsersIcon, ViewBoardsIcon, XCircleIcon } from '@heroicons/react/solid';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { DataContext } from '../store/globaleState';



const Navbar = () => {

  const {theme,setTheme}=useTheme()

 const changeTheme=()=>{
  setTheme(theme === "light" ? "dark" : "light");
 }


  const {state,dispatch}=useContext(DataContext) ;




   const {auth ,cart}=state ;
    
  const router=useRouter() ;


 const isActive=(r)=>{
  
   if(router.pathname === r){
     return "active"
   }

   return " "
 }



 //  loggedOut funtion

const loggedOut=()=>{

  localStorage.removeItem('firstLogin')
    router.push('/')

    dispatch({type:"AUTH",payload:{}})

  return dispatch({type:"NOTIFY",payload:{success:"Logout Success!"}}) ;

  

 
}

const adminForNav=()=>{

  return(
    <div className='z-50'>
       <li className='mb-2 text-sm duration-500 cursor-pointer hover:translate-x-2'> 
         
        <UsersIcon className='inline-block w-5 h-5 text-4xl md:mr-1 bg-stone-600-800' />
        <Link href='/users'> 
              <a>Users </a>
        </Link>
       </li>

       <li className='mb-2 text-sm duration-500 cursor-pointer hover:translate-x-2'> 
      
       
       <IdentificationIcon className='inline-block w-5 h-5 text-4xl bg-stone-600-800 md:mr-1' />
       
       <Link href='/create'> 
        <a> Products </a>
        </Link>
       </li>
       <li className='mb-2 text-sm duration-500 cursor-pointer hover:translate-x-2'> 
       
       <ChartPieIcon className='inline-block w-5 h-5 text-4xl bg-stone-600-800 md:mr-1' />
       <Link href='/categories'> 
              <a> categories </a>
        </Link>
       </li>
    </div>
  )
}

// login when user 

 const loggedIn=()=>{

  return(
     
    <div className='z-50 flex flex-row-reverse items-center justify-between md:relative'>  

<img style={{width:"40px" ,height:"40px"}} className='z-50 duration-100 border border-white rounded-full md:absolute hover:scale-125 -top-8 -right-8 ' src={auth.user.avatar} alt="Profile pic"/>
   
    <a className="relative inline-block px-4 py-2 mt-4 text-sm font-bold leading-none text-teal-500 duration-1000 bg-white border border-white min-w-fit dark:bg-teal-600 dark:text-white md:rounded-3xl group -z-0 mainMenu hover:border-transparent lg:mt-0">

      
      {auth.user.name}

      <ul style={{minWidth:"150px"}} className='absolute z-50 hidden p-4 -ml-5 duration-150 min-w-fit bg-violet-600 dark:bg-teal-800 drop-shadow-md group-hover:block top-8 text-orange-50'>
        
        <li className='mb-2 text-sm duration-500 cursor-pointer hover:translate-x-2'> 
       
 

<UserCircleIcon className='inline-block w-5 h-5 text-4xl bg-stone-600-800 md:mr-1' />
        <Link href='/profile'> 
         <a>Profile </a>
         </Link>
        </li>

        {
          auth.user.role === 'admin' && adminForNav()
        }
         
         

        <hr />


        <li onClick={loggedOut}  className='mb-2 text-sm duration-500 cursor-pointer hover:translate-x-2'> 
        {/* <i className="mr-1 fas fa-sign-out-alt"></i>  */}

        
        <LogoutIcon className='inline-block w-5 h-5 text-4xl bg-stone-600-800 md:mr-1' />
        
        Logout</li>
      </ul>
      
        
    </a>

    </div>
    
  )
 }



//  funcion for tgl button menu

 const [tglMenu,setTglMenu]=useState(false)

 const toggleMenu=()=>{

    setTglMenu(!tglMenu)

 }


    return (
        <div>
            <nav className="flex flex-wrap items-center justify-between w-full p-10 bg-violet-700 fix dark:bg-dark-200 dark:text-white">
  <div className="flex items-center flex-shrink-0 mr-6 text-white">
 



     {
       theme === 'light' ? <SunIcon onClick={changeTheme}  className='w-8 h-8 text-orange-500 cursor-pointer'  /> 
                          : <MoonIcon onClick={changeTheme}  className='w-8 h-8 text-orange-500 cursor-pointer'/>
     }


      <Link href='/' passHref>
    
    <span      className="ml-2 text-xl font-semibold tracking-tight first-letter:text-3xl ">Prime Shopping</span> 

    </Link>
  </div> 

  <div className=" md:hidden">

    <button onClick={toggleMenu} className="flex items-center px-3 py-2 text-teal-200 border border-teal-400 rounded hover:text-white hover:border-white">
      

    {/* <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg> */}
      {
        tglMenu ? <ViewBoardsIcon  className="w-8 h-8 text-teal-600 duration-75 rotate-90 bg-white hover:-rotate-0"  />
          : <XCircleIcon   className="w-8 h-8 text-red-600 bg-white rounded-full" />
          
      }


    </button>
  </div>


  <div className={`flex-grow block w-full lg:flex duration-300 lg:items-center lg:w-auto ${tglMenu ? "hidden" : " "}   ` }>

    <div className="mb-3 text-sm md:mb-0 lg:flex-grow">
    <li onClick={toggleMenu} >

    <Link className='mb-2 '  href='/' > 
      <a  className={` lg:m-3 uppercase text-gray-300   ${isActive('/')}` }>  Home </a>
      </Link>
    </li>
     
    </div>

    
    <div className='flex-wrap items-center justify-between md:flex'>

  

         {
           
         }
      
       
        
        {
            auth.user?.role !== 'admin' &&<li onClick={toggleMenu} className='relative' >

    
    

          <button
           className='absolute p-1 text-teal-400 bg-white rounded-full dark:bg-red-700 -left-3 -top-2 md:-top-4 md:left-7'>
        
              { cart.length}
  

          </button>
        
               <span className='uppercase' > 
                
              <ShoppingCartIcon className='inline-block w-8 h-10 text-4xl text-teal-500 bg-stone-600-800' />
        
              <Link href="/cart" >
                <a  className={`text-sm text-gray-300 lg:m-2  relative  ${isActive('/cart')}` }>  Cart </a>
              </Link>
              
                </span> 
        
              
           </li>
        }


       


      {
        Object.keys(auth).length === 0 
        ? 
        <li onClick={toggleMenu}>
        <Link href="/singin">
         <a className={`text-sm text-gray-300 lg:m-3  uppercase   ${isActive('/singin')}` } >Singin</a>
         </Link>
        </li>
        : loggedIn()
      }
    
        
 


    </div>
  </div>
</nav>
        </div>
    )
}

export default Navbar
