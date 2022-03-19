/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-comment-textnodes */
import Link from 'next/link';
import React from 'react';
import { updateDataFromActios } from '../store/Actions';
import { patchData } from '../utils/FeatchData';
import PaypalBtn from './PaypalBtn';


const ProductDetails = ({productDetails,state,dispatch}) => {

  

    const{auth ,orders}=state ;


    const deliverHandler= async(order)=>{

          dispatch({type:"NOTIFY",payload:{loading:true}}) ;

      const res = await patchData(`order/delivered/${order._id}`,null,auth.token) ;

      if(res.err) return dispatch({type:"NOTIFY",payload:{error:res.err}}) ;

      dispatch(updateDataFromActios(orders,order._id,{
        ...order,
        ...res.result
      },"ADD_ORDERS")) // update  addd orders 

        
      return dispatch({type:"NOTIFY",payload:{success:res.msg}}) ;
    }

    

    if(!auth.user) return null
  return (
    <> 
            <div> 
        {
          productDetails.map(item=>(

            <div key={item._id} className={`grid grid-cols-1 gap-3 mx-auto ${item.paid ? 'sm:grid-cols-1' :'sm:grid-cols-2'}`}>

          

            <div  className='w-full p-4 mx-auto shadow-lg shadow-violet-600'  >

              <h2 className='text-3xl font-extrabold text-center'>Order <span className='text-sm'>{item._id}</span></h2>

              <h3 className='text-2xl font-bold text-center '>Shipping</h3>
                                    <hr className='w-1/2 mx-auto bg-black border-2'/>
              <p className='p-1 font-bold'>Name: <span  className='font-semibold'>{item.user.name} </span> </p>

              <p className='p-1 font-bold'>Email:{item.user.email}</p>
              <p className='p-1 font-bold'>Adress:{item.address}</p>
              <p className='p-1 font-bold'>Mobile : {item.mobile}</p>

              <div className={`flex justify-between align-center text-center ${item.delivered ? '  bg-green-700':'bg-violet-700'} p-4 text-white text-center`}>

                <div>
                    <h1 className='font-bold'>
                    {
                   item.delivered ? item.updatedAt : 'Not Delivered !'
                }
                    </h1>
                </div>

                <div>
                    {
                       auth.user.role === 'admin' && ! item.delivered &&
                         
                            <button onClick={()=>deliverHandler(item)} className='px-4 py-2 text-white bg-black rounded-md'> Mark as Delivered  </button>
                    }
                   </div> 
              </div>

                <h2 className='text-2xl '> Payment </h2>
                    
                { item.method &&  <h3 className='font-bold'> method : <em> {item.method}</em></h3>}
                { item.paymentId &&  <h3 className='font-bold'> paymentId : <em> {item.paymentId}</em></h3>}

                 {/* <h3></h3> */}

                <div className={`${item.paid ? 'bg-purple-700':'bg-red-700'} p-4 text-white text-center`}>

                  {
                    item.paid ?  item.paymentOfDate : 'Not Paid !'
                  }

                </div>


            <div>

                  {
                    item.cart.map(item=>(

                      <div key={item._id} className='flex items-center justify-between p-2 m-2 border-2'>

                        <div>
                          
                           <img className='w-20 rounded' src={item.images[0].url} alt={item.images[0].url}/>
                        </div>

                        <div>
                         <Link href={`/product/${item._id}`} >
                          

                         <a className='underline uppercase' title='click for more Information!' > {item.title} </a>
                       
                         </Link>
                        </div>

                        <div>
                            <p> {item.quantity} X {item.price} = {item.quantity *item.price} </p>
                        </div>

                      </div>
                    ))
                  }

              
            </div>
            


            </div>


                 <div>
                 {
                    !item.paid && auth.user.role !== 'admin' && <div className='shadow-lg md:py-4 shadow-violet-600'>

                    <h2 className='text-3xl font-bold text-center'>  Total :{item.total} </h2>
  
                     <div className='px-8 mt-3'>
                     <PaypalBtn order={item} />
                     </div>
  
              </div>
                  }
                 </div>

            </div>

          ))
        }
      </div> 
    </>
  )
}

export default ProductDetails