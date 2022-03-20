/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React, { useContext } from 'react';
import { addToCart } from '../../store/Actions';
import { DataContext } from '../../store/GlobaleState';


const ProductItem = ({product ,handleCheck}) => {

  const {state,dispatch}=useContext(DataContext) ;





  
  const {cart ,auth }=state ;


  const delteProduct= async(product)=>{

     dispatch({type:"NOTIFY",payload:{loading:true}})

      dispatch({type:"ADD_MODAL",payload:[{modalShow:true ,data:'',id:product._id,title:product.title,type:"deleteProduct"}]})
 
  }


  const adminLink=()=>{
    return(
      < >
              <div className=' basis-1/2'>

              <Link href={`/create/${product._id}`} >
              
              <a   className="inline-block w-full px-3 py-1 mb-2 mr-2 text-lg font-semibold text-center text-white cursor-pointer bg-violet-500 rounded-xl ">Edit</a>
              </Link>

              </div>
        
              <div className='basis-1/2'>
              <button  onClick={()=> delteProduct(product)}  className="w-full px-3 py-1 mb-2 mr-2 text-lg font-semibold text-red-700 bg-gray-200 rounded-xl"> Delete</button>
              </div>
       </>
    )


  }


  const userLink=()=>{
    return(
      < >
              <div className='basis-1/2' >

              <Link href={`/product/${product._id}`} >
              
              <a   className="inline-block w-full px-3 py-1 mb-2 mr-2 text-lg font-semibold text-center text-white bg-gray-600 cursor-pointer hover:bg-gray-700 rounded-xl ">View</a>
              </Link>

              </div>
        
              <div className='basis-1/2'>
              <button onClick={()=> dispatch(addToCart(product,cart))} className="w-full px-3 py-1 mb-2 mr-2 text-lg font-semibold text-white bg-violet-600 hover:bg-violet-700 rounded-xl"> Buy</button>
              </div>
       </>
    )


  }


    return (
         

//  <div className='overflow-hidden shadow-lg' >   
    
    <div className="relative max-w-sm px-4 overflow-hidden duration-700 scale-95 border-2 rounded-lg shadow-lg hover:scale-100 dark:shadow-gray-700 shadow-violet-500 dark:border-none dark:bg-dark-700">

      {
        !auth.user || auth.user.role === 'admin' && <div className='absolute top-0 right-0 z-50 '>

           <input type="checkbox"  onChange={()=>handleCheck(product._id)}   checked={product.checked} 
           className='z-10 w-6 h-6 rounded-md accent-red-700'/>

        </div>
      }
      
        

       <img style={{maxWidth:'290px',  maxHeight:"200px" ,height:"180px",width:'280px' ,margin:'auto'}} 
        title={product.title}
          className="mt-2 duration-500 shadow-md hover:scale-110 shadow-gray-700"
          
          src={product.images[0].url} alt={product.images[0].url} />
       

 

      
      <div className="px-6 py-4">
        <div className="mb-2 text-xl font-bold capitalize">{product.title}</div>

         <div className='flex items-center justify-between mt-2'>

            <h3 className='font-semibold'>Price :$ <span className='font-bold text-violet-600'>{product.price}</span> </h3> 
            
            <h3 className='font-lite'>InStock : <span className='font-bold text-violet-700'>{product.inStock}</span></h3> 
        </div>

            
        <p className="w-full mt-2 overflow-hidden text-sm text-center text-gray-700 dark:text-teal-600">
            
           {
              product.description.split(' ',18).join(' ') 
           }   
        </p>
      </div>
      <div className="flex justify-between px-6 pt-4 pb-2 space-x-2 align-middle ">
           {
              !auth.user || auth.user.role !== 'admin' 
             ?
             userLink() 
             : adminLink()
           }
      </div>
    </div>






    )
}

export default ProductItem
