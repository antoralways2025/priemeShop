import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import FilterSearch from '../utils/FilterSearch';


const Filter = ({state}) => {

    const router= useRouter()

    const {categories}=state ;

     const [category,setCategory]=useState('')  ; 

     const [search,setSearch]=useState('')

     const [sort,setSort]=useState('')



     const HandleCategory= (e)=>{

        setCategory(e.target.value) ;
        FilterSearch({router,category:e.target.value})

     }

 

const hanldeSort=(e)=>{

    setSort(e.target.value) 
    FilterSearch({router,sort:e.target.value})
}




useEffect(()=>{
    FilterSearch({router ,search : search ? search.toLowerCase() : 'all'})
},[search]) 



  return (

     <div className="container px-2 mx-auto">
         
         <div className='grid grid-cols-12 gap-3 my-2 '>
 
                 <div className='col-span-4 bg-red-600 md:col-span-2'> 

                    <select onChange={HandleCategory} className='w-full px-2 py-2 text-sm border border-gray-300 md:py-2' name="" id="" value={category}>
                        
                        <option value="all"> All Products</option>
                        {
                            categories.map(category=>{
                                return <option value={category._id} key={category._id} > {category.name}</option>
                            })
                        }
                        
                        </select>
                 
                 </div>

                 <div className='col-span-12 md:col-span-8'> 
                 
                 <form  >
                     
                    <input placeholder='Search box ex:laptop' autoComplete='off'  type="text"
                     className='w-full px-3 py-1 text-sm border-2 rounded border-violet-200 focus:border-violet-500 md:py-1 focus:outline-none' value={search.toLowerCase()} onChange={(e)=>setSearch(e.target.value)} />
                     
                   </form>
                 
                 </div>
                 <div className='col-span-4 md:col-span-2 '> 
                 
                   <select className='w-full py-1 text-sm border border-gray-300 md:px-2 md:py-2' name="" value={sort} id="" onChange={hanldeSort}>
                        <option value="-createdAt"> Newest</option>
                        <option value="createdAt"> Oldest</option>
                        <option value="-sold"> Best selse</option>
                        <option value="-price"> High to Low</option>
                        <option value="price"> Low to High</option>
                       
                       </select>
                 
                        
                 
                 </div>
     
             </div>
         
         </div>
  )
}

export default Filter