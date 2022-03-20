/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../store/GlobaleState';
import { getData, patchData, postData } from '../../utils/FeatchData';
import imageUploader from '../../utils/imageUploader';

function ProductManager() {



   const router= useRouter() ;

    const {id}=router.query ;

  const {state,dispatch}=useContext(DataContext) ;

  const { categories ,auth}=state ;

  const [images,setImages]=useState([]) ;

   const initialState={
     title:'',
     category:'',
     price:0,
     inStock:0,
     description:'',
     content:'',

   }

      const [product,setProduct]=useState(initialState) ;

      const [edit,setEdit]=useState(false) ;

      useEffect(()=>{

         if(id){

            getData(`product/${id}`)
            .then(res=>{
               if(res.err) return dispatch({type:"NOTIFY",payload:{ error:res.err}}) ;


                setProduct({...res.product}) ;

               setEdit(true) ;

               setImages([...res.product.images])


            })

         }

      },[dispatch, id])

      



          const{title,category,price,inStock,description,content}=product ;


          const inputOnchangHandler=(e)=>{

             const {name,value}=e.target ;

             setProduct({...product, [name]:value})

          }


          // imagee

          const inputImageHandler=(e)=>{

            
            let num= 0 ;
            let imageArr =[] ;

            let err ;



             const files=[...e.target.files];

               if(files.length === 0 )return dispatch({type:"NOTIFY",payload:{error:"The Image doesnot exists......"}}) ; 

                    

               files.forEach(file=>{

                  if(file.type !== 'image/png' && file.type !== "image/jpeg" && file.type !== 'image/jpg') 
                     return err="The file format isnot correact please jpg,png,or jpeg"

                  
                     if(file.size > 1024 * 1024) 
                        return err= "The file  has more 1mb . please reduce" 

                        num+=1

                        if(num >5) return err= " Seleact less then 5 " 

                       
                      if(num <= 5)  imageArr.push(file)


                      return imageArr

               })
               

               if(err) return dispatch({type:"NOTIFY",payload:{error:err}})

               const imgCount = images.length ;

               if(imgCount+ imageArr.length <= 5)  return  setImages([...images, ...imageArr])

              
            
      
             
          }   


         //  dlete img 

         const deleteImg = (index)=>{

            const newArr= [...images] 

              
            newArr.splice(index,1) ;

            setImages(newArr)

            
         }



         const productSubmitHandler=async(e)=>{

             e.preventDefault() ;

             if(auth.user.role !== 'admin'){
               return dispatch({type:"NOTIFY",payload:{error:"Authentication is faild !"}})
             }
         


             if(!title || category === 'all' || !price || !inStock || !description || !content  || images.length === 0){

               return dispatch({type:"NOTIFY",payload:{error:"All fields are required *****"}})
             }
     

            //  check img url or not 

            let media=[] ;

            const newImgArr = images.filter(img=> !img.url) ;

            const oldImgArr = images.filter(img=> img.url) ;

                                          // post to cloudnary store !

                              if(newImgArr.length > 0)  media = await imageUploader(newImgArr);
                              
                     let res;

                          if(edit){

                             res= await patchData(`product/${id}`,{...product,images:[...oldImgArr, ...media]},auth.token) ;
                             if(res.err) return dispatch({type:"NOTIFY",payload:{error:res.err}}) ;
                            }else{
                              res=  await postData(`product`,{...product,images:[...oldImgArr,...media]},auth.token)
                              if(res.err) return dispatch({type:"NOTIFY",payload:{error:res.err}}) ;
                            }
                        
                        



               dispatch({type:"NOTIFY",payload:{success:res.msg}})

                              // send product filedl to data base 
            
         }





  return (
    <div>

            <form onSubmit={productSubmitHandler} className='grid grid-cols-1 gap-2 p-4 mx-auto md:grid-cols-2'>


                  <div className='px-10 overflow-hidden dark:bg-gray-800 bg-violet-300' >

                  <h1 className='text-4xl text-center'> Product  </h1>

                     <div className='my-2 '> 
                     <input  className='w-full px-2 py-1 rounded-md outline-none focus:outline-fuchsia-200' placeholder='Title' value={title} name='title' onChange={inputOnchangHandler}  />
                     </div>


                             {/* innner grid for price and instoc  start */}
                     <div className='grid grid-cols-1 overflow-hidden sm:grid-cols-2'> 

                                      <div className='w-full rounded md:m-2 '>
                                      <label className='block' htmlFor='Price'>Price</label>
                                         <input className='w-full px-2 py-1 outline-none md:mr-2 focus:outline-fuchsia-200' placeholder='Price' value={price} name='price' onChange={inputOnchangHandler}  />
                                      </div>

                                      <div className='w-full rounded md:m-2'>
                                        <label  className='block md:ml-2' htmlFor='instock'>InStock</label>
                                         <input className='w-full px-2 py-1 outline-none md:ml-2 focus:outline-fuchsia-200' placeholder='Instcok' value={inStock} name='inStock' onChange={inputOnchangHandler}  />
                                      </div>
                     
                     </div>


                            {/* innner grid for price and instoc  edn */}

                     <div className='my-1 '> 
                      


                              <textarea  className='w-full px-2 py-1 rounded-md outline-none focus:outline-fuchsia-200'  value={content} name='content'  placeholder='Content'
                              onChange={inputOnchangHandler}  id="" cols="30" rows="3">
                                 
                              </textarea>


                     </div>

                     <div className='my-1 '> 
    

                    <textarea className='w-full px-2 py-1 rounded-md outline-none focus:outline-fuchsia-200' placeholder='description'   id="" cols="30" rows="4"
                    
                    value={description} name='description' onChange={inputOnchangHandler}
                    > 
                    
                    
                    </textarea>
                      
                     </div>


                  {/* maping categories */}
                     <div className='my-2 '> 

                          <select value={category} name='category' onChange={inputOnchangHandler}>

                             <option value='all'> All </option>
                       {
                            categories.map(item=>{

                            return   <option key={item._id} value={item._id}> {item.name} </option>

                            })
                       }

                          </select>

                     </div>

                  </div>

                        {/* image upload section start */}
                  <div>

                       <input multiple accept='image/*' onChange={inputImageHandler} type='file' 
                        className='w-full bg-violet-600'  />


                           {
                              images.map((img,index)=>(

                                       <div key={index} className='file_upload '>

                                          <img className='w-full h-full'  src={img.url ? img.url :URL.createObjectURL(img)} alt='Product image'/>

                                            <span onClick={()=>deleteImg(index)} >X</span>
                                       </div>
                              ))
                           }

                     </div>


                     <button type='submit' className=" py-1 dark:bg-gray-700 bg-violet-800 text-white transform    duration-300 ...">
                                                 {
                                                    edit ? "Update" : "Create"
                                                 }
                            </button>

            </form>





    </div>
  )
}

export default ProductManager