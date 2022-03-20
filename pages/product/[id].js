/* eslint-disable @next/next/no-img-element */

import React, { useContext, useState } from 'react';
import { addToCart } from '../../store/Actions';
import { DataContext } from '../../store/GlobaleState';
import { getData } from '../../utils/FeatchData';


  const DetailProduct = ({product}) => {

    const {state,dispatch}=useContext(DataContext) ;

     const {cart}=state ;

 
    
    const [tab,setTab]=useState(0)

      const isActive=(id)=>{
          if(tab === id) return "activeProduct"

          return ' '
      }

       
  return(
    <div className='flex flex-col justify-center pt-0 m-0 border-2 dark:border-dark-100 sm:p-8 sm:flex-row align-center'>


        <div className='p-2 m-2 mr-1 cursor-pointer dark:bg-dark-200 dark:border-none sm:border'>
           

            <img className='object-cover w-56 mx-auto border-2 border-red-700 rounded-2xl h-52 md:w-96 md:h-80'   src={product.images[tab].url} alt={product.images[0].url}/>
            

            <div className='flex flex-wrap justify-center align-center'>
            {
                product.images.map((img,index)=>(

                    <img  onClick={()=> setTab(index)} className={` m-2  w-10 md:w-20    ${isActive(index)}`}   key={index} src={img.url} alt={img.url} />
                ))   
            }
            </div>
            </div>

        <div className='relative p-6 m-2 ml-1 border dark:border-none dark:bg-dark-300 rounded-3xl'>

             <h2 className='font-bold text-center uppercase dark:text-teal-600 first-letter:text-5xl '>Details of produc<span className='text-5xl'>T</span> </h2>

            <h3 className='mt-3 font-semibold uppercase dark:text-teal-400'>{product.title}</h3>

            <h5 className='text-red-600'>Price:  ${product.price}</h5>

            <div className='flex justify-between '>

            
                {
                    product.inStock  > 0 ?
                    <h4 className='text-violet-600'>In-Stock : {product.inStock}</h4>
                    :<h4 className='text-red-600'>Out of Stock !</h4>
                }

            <h4 className='text-red-500'>Sold:{product.sold}</h4>

            </div>

            <div className='mt-12'>
                

                <p className='text-sm dark:text-gray-200'>   {product.description} </p>
                

            </div>


            <button onClick={()=>dispatch(addToCart(product,cart))} className='px-4 py-1 mt-4 text-white rounded-lg bg-violet-500 sm:bottom-8 bottom-3 left-8 dark:bg-teal-700'> Buy </button>
 
        </div>
      
    </div>
  )
};



export async function getServerSideProps({params:{id}}){

     const res= await getData(`product/${id}`) ;

     

    return{
        props:{

            product:res.product
        }
    }
}




export default DetailProduct