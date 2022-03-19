import { PencilAltIcon, XCircleIcon } from '@heroicons/react/solid';
import Head from 'next/head';
import React, { useContext, useState } from 'react';
import { updateDataFromActios } from '../store/Actions';
import { DataContext } from '../store/globaleState';
import { postData, putData } from '../utils/FeatchData';



const Categories = () => {
    const [name,setName]=useState('')

    const {state ,dispatch}=useContext(DataContext) ;

    const {auth ,categories}=state ; 

    const [id,setId]=useState('') ;

   
   




    const createHandler= async()=>{


          if(auth.user.role !== 'admin') return dispatch({type:"NOTIFY",payload:{error:"Authentication is  incorrect !"}})


            if(!name) return dispatch({type:"NOTIFY",payload:{error:" You cannot left name field !"}})

            dispatch({type:"NOTIFY",payload:{loading:true}} ) ;

             let res; 

             if(id){               
                res =  await putData(`categories/${id}`,{name},auth.token)

        

                 if(res.err) return dispatch({type:"NOTIFY",payload:{error:res.err}}) ; 

                  dispatch(updateDataFromActios(categories,id,res.category,"ADD_CATEGORIES"))
                  
                //  dispatch({type:"ADD_CATEGORIES",payload:[ ...categories ,res.category]})


             }else{ 

             
              res=   await postData(`categories`,{name},auth.token) ;
              if(res.err) return dispatch({type:"NOTIFY",payload:{error:res.err}}) ;
              dispatch({type:"ADD_CATEGORIES",payload:[ ...categories ,res.newCategory]})

  
             }

    
             setName('')
             setId('') 

            dispatch({type:"NOTIFY",payload:{success:res.msg}})

    }
  

   const updateCategory=(category)=>{

                    setName(category.name)
                    setId(category._id) ;

   }

   const deleteCategory = async(category)=>{



       dispatch({type:"ADD_MODAL",payload:[{ modalShow:true,  data:categories,title:category.name, id:category._id,type:"ADD_CATEGORIES"}]})

           

    

   }

   
  return (
 <div className='flex items-center justify-center ' >

    <Head><title>Category</title></Head>

  <div className='px-5 py-4 mt-5 shadow-lg shadow-violet-700 first-line: dark:border-gray-800 '>


    <h2 className='text-2xl text-center'>Category Section</h2>

  <div className='flex p-4'>
      <input  value={name} onChange={(e)=> setName(e.target.value)}  className='w-full px-2 text-sm bg-transparent border-2 rounded-lg outline-none border-violet-300 focus:border-violet-500' placeholder='Create an a new Category !...ex:Food'/>

      <button onClick={createHandler} className='inline px-4 py-1 text-white bg-indigo-700' >
        
        {
          id ? "Update":"Create"
        }
        </button>

    </div>
  

    {
           categories.map(category=>(

              <div key={category._id} className="flex justify-between w-full max-w-sm px-4 py-2 mx-auto mb-2 overflow-hidden align-middle rounded shadow-xl hover:bg-violet-500 bg-violet-200 dark:bg-gray-900 ">

                <div>
                  {category.name}
                </div>
                <div className='cursor-pointer'>

                  <XCircleIcon  onClick={()=>deleteCategory(category)}  className='inline w-6 mr-2 text-center text-red-700 '/>

                  <PencilAltIcon onClick={()=> updateCategory(category)}   className='inline w-6 mr-2 text-center text-violet-800' />
                  
                </div>

                
              </div>
              
            ))

            }
 
  </div>

 



</div>
  )
}

export default Categories