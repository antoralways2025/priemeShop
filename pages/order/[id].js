/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import ProductDetails from '../../components/ProductDetails';
import { DataContext } from '../../store/globaleState';


const OrderDetails = () => {

    const router= useRouter() ;

    const [productDetails,setProductDetails]=useState([]) ;

    const{state,dispatch}=useContext(DataContext) ;

        const { orders }= state ;

 
        useEffect(()=>{
            let product= orders.filter(item=>(
                item._id === router.query.id
                   ))

                   setProductDetails(product)
        },[orders, router.query.id])

    
   

 

  return (
  <div className='container px-2 mt-2 md:px-28 '>

      <button onClick={()=> router.back()} className='p-1 px-3 mb-2 text-white rounded bg-dark-100'> <i className='far fa-left-arrow'></i> Back</button>


          

      <ProductDetails  productDetails={productDetails}  state={state} dispatch={dispatch} />

      

  </div>)
};

export default OrderDetails;
