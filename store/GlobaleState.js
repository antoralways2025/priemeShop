import React, { createContext, useEffect, useReducer } from 'react';
import { getData } from '../utils/FeatchData';
// import { getData } from '../utils/FeatchData';
import reducer from './Reducers';


export const DataContext=createContext( ) ;


const initialState={
    notify:{},
    auth:{},
    cart:[],
    modal:[{modalShow:false}],
    orders:[] ,
    users:[],
    categories:[],
}




  function DataProvider({children}) {

    
    const [state,dispatch]=useReducer(reducer,initialState)  ;


    const { cart ,auth  }=state ;

    // console.log(categories)

    useEffect(()=>{

        const firstLogin=localStorage.getItem('firstLogin')  ;
        

        if(firstLogin) {

            getData('auth/accessToken').then(res=>{
                if(res.err) return localStorage.removeItem('firstLogin') ;

                dispatch({type:"AUTH",payload:{token:res.access_token ,user:res.user}}) ;

            })
 
        }

        getData('categories',auth.token)
        .then(res=>{
  
            if(res.err) return dispatch({type:"NOTIFY",payload:{error:res.err}}) ;
  
             dispatch({type:"ADD_CATEGORIES",payload:res.categories})
          
        })

    },[auth.token])

    

    useEffect(()=>{

      if(auth.user){
           
        getData('order',auth.token) 
        .then(res=>{
            if(res.err) return dispatch({type:"NOTIFY",payload:{error:res.err}}) ;

            dispatch({type:"ADD_ORDERS",payload:res.orders})
        }) ;


        getData('user',auth.token) 
        .then(res=>{
            if(res.err) return dispatch({type:"NOTIFY",payload:{error:res.err}}) ;

           

        dispatch({type:"ADD_USERS",payload: res.users })
        })
      }

    },[auth.token, auth.user]) ;


useEffect(()=>{
    localStorage.setItem('theme','dark')
},[])




     useEffect(()=>{
        const __cartEcomList__= JSON.parse(localStorage.getItem('__cartEcomList__') ) ;
       
        if(__cartEcomList__) return  dispatch({type:"ADD_CART",payload:__cartEcomList__}) 
        
     },[])

     
      
     useEffect(()=>{

        localStorage.setItem('__cartEcomList__',JSON.stringify(cart)) ;

     },[cart])





    return (
         <DataContext.Provider value={{state,dispatch}}>

             {children}

         </DataContext.Provider>
    )
}

export default DataProvider
