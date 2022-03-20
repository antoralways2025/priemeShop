/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';
import { useState } from 'react/cjs/react.development';
import { decrese, increse } from '../../store/Actions';




const CartItem = ({item,cart,dispatch}) => {


       const [btnDisble,setBtnDisable]=useState(false)
  
  const handleDeletSubmit=()=>{

    setBtnDisable(true)

    dispatch({type:"ADD_MODAL",payload:[{modalShow:true , data:cart, title:item.title ,id:item._id,type:"ADD_CART"}]})

    
  }


  
  return(
     <tr className='relative flex flex-wrap items-center justify-center m-3' >
         <td style={{maxWidth:"160px",margin:"5px"}} >
             <img style={{minWidth:'80px'}} className='' src={item.images[0].url} alt={item.images[0].url}/>
         </td>

         <td  className='m-2 capitalize px-7'>
             
  <h2 className='text-lg'>

  <Link href={`product/${item._id}`}>
           <a className='text-sm text-gray-700 underline dark:text-white md:text-2xl'> {item.title} </a>
           </Link>
  </h2>

           <h6 className='py-2'>{item.inStock > 0 ? ` inStock  : ${item.inStock}` : 'Out of Stock right now !'}</h6>

           <h6 className='font-medium text-gray-800 dark:text-white ' > Price : <span className='font-light text-violet-700'>$ {item.price}</span> </h6>


         </td>

         <td className='px-5 m-2'>

              <div>
                  <button disabled={item.quantity === 1 ? true : false}  onClick={()=> dispatch(decrese(cart,item._id))} title='Decrement' className='p-2 pt-0 m-3 text-2xl text-white rounded cursor-pointer bg-violet-500'> - </button>

                  <span className='p-2 m-2 text-white bg-gray-600 rounded-full'>{item.quantity}</span>

                  <button disabled={item.inStock === item.quantity ? true:false}  onClick={()=> dispatch(increse(cart,item._id))} title='Increment' className='p-2 pt-0 m-3 text-2xl text-white bg-green-700 rounded' > + </button>
              </div>
             
         </td>

         <td className='absolute top-0 right-0 px-4 m-1 md:-top-14'>

           <div>
             <i disabled={  btnDisble ?  true : false} onClick={handleDeletSubmit}  className='text-3xl text-red-600 cursor-pointer far fa-trash-alt'></i>
           </div>
         </td>

         
     </tr>
  )

};

export default CartItem;
