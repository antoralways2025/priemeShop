import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { deleteFromActions } from '../store/Actions';
import { DataContext } from '../store/GlobaleState';
import { deleteData } from '../utils/FeatchData';


const ModalBox = () => {
	
	const router= useRouter()

    const {state,dispatch}=useContext(DataContext) ;

	const {modal,auth ,categories ,users }=state

     const {data,title,id ,type }= modal[0]


	 	const categroyDelete=async(item)=>{

			dispatch({type:"NOTIFY",payload:{loading:true}} ) ;

			const res =   await deleteData(`categories/${item.id}`,auth.token)
			if(res.err) return dispatch({type:"NOTIFY",payload:{error:res.err}}) ; 
  
			  dispatch(deleteFromActions(categories ,item.id,"ADD_CATEGORIES"))

			  dispatch({type:"NOTIFY",payload:{success:res.msg}})


		 }

         const deleteProduct=async(item)=>{


			// if(modal.lenght === 1) return dispatch({type:"NOTIFY",payload:{error:"Product emty"}} ) ;
			console.log(modal.length)

			dispatch({type:"NOTIFY",payload:{loading:true}} ) ;
			const res= await deleteData(`product/${item.id}`,auth.token) ;
  
			 if(res.err) return dispatch({type:"NOTIFY",payload:{error:res.err}} ) ;

			  dispatch({type:"NOTIFY",payload:{success:res.msg}})

			  return router.push('/')

		 }


		 
		const deleteFromCard=async(item)=>{

			dispatch(deleteFromActions(item.data ,item.id,item.type))

		}

		const removeUser = async(item)=>{

			dispatch({type:"NOTIFY",payload:{loading:true}})
            const res= await deleteData(`user/${item.id}`,auth.token) ;

            if(res.err) return dispatch({type:"NOTIFY",payload:{error:res.err}}) ;

             dispatch(deleteFromActions(users,item.id,"ADD_USERS"))

          return  dispatch({type:"NOTIFY",payload:{success:res.msg}})
		}
		const delete_ALL=async(item)=>{

			dispatch({type:"NOTIFY",payload:{loading:true}} ) ;
			 const res= await deleteData(`product/${item.id}` ,auth.token) ;

			 if(res.err) return dispatch({type:"NOTIFY",payload:{error:res.err}} ) ;

			 dispatch({type:"NOTIFY",payload:{success:res.msg}})


		}




    const  confirmItemDlt=async()=>{


		dispatch({type:"NOTIFY",payload:{loading:true}}) ;
		
		// if(modal.length === 1 ){

		// 	dispatch({type:"NOTIFY",payload:{error:"You have no selete any product for Delete !"}} ) ;

		// 	return 	dispatch({type:"ADD_MODAL",payload:[{modalShow:false}]})
		// } 




				modal.forEach(item=>{

					if(item.type === "ADD_CATEGORIES" ) return	categroyDelete(item)

					if(item.type=== "deleteProduct") return deleteProduct(item)

					if(item.type === "ADD_CART") return deleteFromCard(item)

					 if(item.type === "removeUser") return removeUser(item)
					 if(item.type === "Delete_ALL") return delete_ALL(item)


				})


 

      dispatch({type:"ADD_MODAL",payload:[{modalShow:false}]})
	  dispatch({type:"NOTIFY",payload:{}} ) ;
      
    }

// modal close and loadin flse
const modalClose=()=>{
	   dispatch({type:"NOTIFY",payload:{loading:false}})
	  dispatch({type:"ADD_MODAL",payload:[{modalShow:false}]})
}

  return (
    //   <div className='absolute top-0 bottom-0 left-0 right-0 z-50 mx-auto bg-gray-900 '>

<div
 style={{zIndex:'999'}}
	className="fixed flex items-center justify-center -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-lg tra top-1/2 left-1/2 dark:bg-gray-700 w-96 top-35"
>
	<div className="mt-3 text-center">
		<div
			className="flex items-center justify-center w-12 h-12 mx-auto bg-green-100 rounded-full"
		>
			<svg
				className="w-6 h-6 text-green-600"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg" 
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
					d="M5 13l4 4L19 7"
				></path>
			</svg>
		</div>
		<h3 className="text-lg font-medium leading-6 text-gray-900 uppercase ">{title}</h3>
		<div className="py-3 mt-2 px-7">
			<p className="text-sm text-gray-500">
                
				Do you like to Delete this {title} Item ?
			</p>
		</div>
		<div className="items-center px-4 py-3">
			<button

            onClick={confirmItemDlt}
				id="ok-btn"
				className="w-1/3 px-4 py-2 m-1 text-base font-medium text-white bg-red-500 rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
			>
				Delete  
			</button> 


            <button
// dispatch({type:"NOTIFY",payload:{loading:true}})
             onClick={modalClose}
				id="ok-btn"
				className="w-1/3 px-4 py-2 text-base font-medium text-white bg-green-500 rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
			>
				Cencel

			</button>
		</div>
	</div>


</div>
    //   </div>
  )
};

export default ModalBox;
