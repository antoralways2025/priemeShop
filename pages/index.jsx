import { ExclamationCircleIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import Filter from '../components/Filter';
import ProductItem from '../components/Products/ProductItem';
import { DataContext } from '../store/globaleState';
import { getData } from '../utils/FeatchData';
import FilterSearch from '../utils/FilterSearch';




function Home(props) {


      const router= useRouter() ;
       const {state,dispatch}=useContext(DataContext) ;

        const  {auth }=state
   const [products,setProducts]=useState(props.productProps) ;


   useEffect(()=>{
     

    setProducts(props.productProps)
  
   },[props.productProps])




   useEffect(()=>{

    if(Object.keys(router.query).length === 0) {

      setPage(1)
    }
    
 
},[router.query]) ;




       const [check,setChcek]=useState(false) ;
       
      const [page,setPage]=useState(1)
       
       const handleCheck=(id)=>{

             products.forEach(product=>{


                if(product._id === id){
                    product.checked  = !product.checked
                }


             })

             setProducts([...products])

       }


     const chceckBoxHanderlOnchange= ()=>{


                  products.forEach(product =>{

                     product.checked = !product.checked 

                     setChcek(!check)
                       

                   })


                   setProducts([...products])
     }
  

 const deleteALl=()=>{


   let dleList= [] ;



          products.forEach(product=>{

             if(product.checked){

                dleList.push({

                  type:"Delete_ALL" ,
                  id:product._id,
                  data:'',
                  title:"Delelet all ?" 


                })

             }
          })


        dispatch({type:"ADD_MODAL",payload:[{modalShow:true},...dleList]})
      

     setChcek(!check)

 }



 const hanleLoadMore=()=>{

  setPage(page + 1)

  FilterSearch({router ,page:page + 1})


 }

  

 



  return (
    <div className='pb-2 md:pb-10' >

      <Filter state={state} />


        
       {
         !auth.user || auth.user.role === 'admin' &&
         <div className='inline-block px-2 py-1 ml-2 bg-red-800 '>
           <input type="checkbox" value={check} className='w-8 h-4 accent-red-700' onChange={chceckBoxHanderlOnchange}  /> 

          <button disabled={products.length === 0 ? true:false} onClick={deleteALl}
      
      className={`px-4 text-white bg-red-500 rounded-md ${products.length === 0 && `bg-red-300`}`}>Delete all</button>

          
         </div>
       }

       <div  className='grid items-center justify-center grid-cols-1 gap-2 px-5 pt-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:mb-4'> 
  

       {
        products.length === 0 ? 
        
         


        <div className='text-center' >
          <ExclamationCircleIcon className='text-white rounded-full w-72 h-72 bg-violet-600'/>
          <h1 className='text-5xl text-center first-letter:text-6xl' > Products  Emty </h1> 
        </div>
          
      
        : products.map(product=>(
          <ProductItem key={product._id}  product={product}   handleCheck={handleCheck} />
        ))
      }
      
      

    
      </div >

      {
          props.result < page * 6 ? '' : <button onClick={hanleLoadMore}
           className='block w-full px-4 py-1 mx-auto font-semibold text-white rounded-md dark:bg-gray-500 bg-violet-800 md:w-1/3'>Load More !</button> 
      }

    </div>
    
  )
}




export async function getServerSideProps( {query}) {

  const page = query.page || 1 ;
  const category= query.category || 'all' ;
  const sort = query.sort || '' ;
  const search = query.search || 'all'  ;
 
 
 
   const res = await getData(`product?limit=${ page * 6}&category=${category}&sort=${sort}&title=${search}`) ;
 
 

   return {
     props: { 
       productProps:res.products,
       result:res.result
 
     }, // will be passed to the page component as props
   }
 }
 


export default Home
