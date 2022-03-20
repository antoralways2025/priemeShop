/* eslint-disable @next/next/no-img-element */
import { ExclamationCircleIcon } from '@heroicons/react/outline';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import CartItem from '../components/cart/CartItem';
import { DataContext } from '../store/GlobaleState';
import { getData, postData } from '../utils/FeatchData';


function Cart() {


    const router= useRouter() ;

    const {state,dispatch}=useContext(DataContext) ;

    const {cart ,auth ,orders}=state ;
    const [callback,setCallback]=useState(false)

 

    const[mobile,setMobile]=useState('') ;
    const[address,setAddress]=useState('');


 
    

    useEffect(()=>{

         let localCart=  JSON.parse(localStorage.getItem('__cartEcomList__') ) ;

         if(localCart && localCart.length > 0){
    
            const refreshLocalCart=async()=>{
    
                let updateCart=[] ;
    


                for(const item of localCart){
    
                    const res= await getData(`product/${item._id}`) ;
    
                    const{_id,title,images,price,inStock,sold}=res.product
    
                    
    
                    if(inStock > 0) {
    
                       
                        
                        updateCart.push({
                            _id,title,images,price,sold , inStock,quantity: item.quantity > inStock ?  1 : item.quantity
                        })
                    }
    
                    
    
                }
                 
             
                dispatch({type:'ADD_CART',payload:updateCart})
    
               
            }
    
            refreshLocalCart()
    
         }
    
      },[callback])
       




    const [total,settotal]=useState(0) ;


    useEffect(()=>{

        let getTotal=()=>{
         
          const res= cart.reduce((prev,item)=>{
     
             let total= prev + ( item.price * item.quantity );
     
             return total
     
     
         },0)
     
         settotal(res) ;
     
     
        }
     
     
        getTotal()
     
     
     
     },[cart])
       


     const handleSubmit=async()=>{

        if(!address || !mobile) return dispatch({type:"NOTIFY",payload:{error:" Please fill  Address and Mobile "}}) ;


        let newCart=[] ;
         
        for (const item of cart){

           const res =  await getData(`product/${item._id}`) ;

                if(res.product.inStock - item.quantity >= 0){
                    
                    newCart.push(item) ;
                }
        }



        if(newCart.length < cart.length){
            setCallback(!callback) ;

        return dispatch({type:"NOTIFY",payload:{error:"May be something wrong with any Product or Insuficient Instock , Try again  Please !"}})
         
        }

       const res = await  postData(`order`,{
           address,
           mobile,
           total,
           cart
       },auth.token)


   

     const newOrder={...res.newOrder , user:auth.user}

    dispatch({type:"ADD_ORDERS",payload:[...orders,newOrder]}) ;

    dispatch({type:"ADD_CART",payload:[]}) ;

    router.push(`order/${res.newOrder._id}`)

   
   return  dispatch({type:"NOTIFY",payload:{success:res.msg}})

       
        
     }



    // conditionaly check

    if(cart && cart.length=== 0){
         
        return (
            <div className='grid h-screen place-content-center'>


                <div>
                  <ExclamationCircleIcon className='text-white rounded-full w-72 h-72 bg-violet-600'/>
                  <h1 className='text-5xl text-center first-letter:text-6xl' >Cart Emty </h1> 
                </div>
            </div>
        )
        
        
    }
    return (
        <div  >
            <Head>
                <title>Cart Page</title>
            </Head>

            
       
            <div className="flex flex-wrap w-4/5 mx-auto md:pt-4" style={{margin:"auto"}}>

            <div className='py-4 duration-75 scale-75 shadow-lg shadow-violet-500 hover:scale-90 hover:shadow-violet-900'>

                <h2 className='m-4 text-lg font-bold text-center uppercase md:text-3xl'>Shopping Cart </h2>
                
            <table className='table-auto'>
                <tbody>

                {
                cart.map((item,index)=>(
                    <CartItem key={index} item={item} cart={cart} dispatch={dispatch} />
                )) 
               }
                </tbody>

                </table>
            </div>



            <div className='p-4 shadow-lg shadow-violet-500 md:px-4'>
            <form className="w-full max-w-sm text-right " >
                <h2 className='text-lg font-bold text-center uppercase md:text-3xl '>Shipping </h2>

            <div className="mb-6 ">
  
    <div className="mt-3 md:w-full">

        <label htmlFor="address" className='uppercase '> Adress</label>

      <input   className="w-full px-3 py-1 text-gray-700 border-2 border-gray-200 rounded appearance-none md:px-4 focus:outline-none focus:bg-white " id="inline-full-name" type="text" onChange={(e)=> setAddress(e.target.value) }  value={address}   />
    </div>


    <div className="mt-3 md:w-full">

<label htmlFor="address" className='uppercase '>MOBILE </label>

<input className="w-full px-3 py-1 text-gray-700 border-2 border-gray-200 rounded appearance-none md:px-4 focus:outline-none focus:bg-white " id="inline-full-name" type="number" onChange={(e)=> setMobile(e.target.value) }   value={mobile}   />
</div>




  </div>
 
  
                 </form>

                 <div className='text-right'>
               <h2 className='p-1 m-2 text-lg text-center text-white uppercase bg-gray-700 rounded-sm md:text-3xl'>Total : {total} </h2>

    
                     <Link href={` ${auth.user  ? '#!' : '/singin'} `}>  
                
                      <a className='inline-block w-full p-2 text-center text-white rounded bg-violet-800' onClick={handleSubmit} > Order   Now </a>
                     </Link>

                  
                
                  </div>

            </div>



            </div>
            
            </div>
        
    )
}

export default Cart
