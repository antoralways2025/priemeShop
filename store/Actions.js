
export const ACTIONS={
        AUTH:"AUTH",
        NOTIFY:"NOTIFY",
        ADD_CART:"ADD_CART",
        ADD_MODAL:"ADD_MODAL",
        ADD_ORDERS:"ADD_ORDERS",
        ADD_USERS:"ADD_USERS",
        ADD_CATEGORIES:"ADD_CATEGORIES"
        
       }



export const addToCart=(product,cart)=>{

         if(product.inStock ===  0) {
               return ({type:'NOTIFY',payload:{error:"This product is out of stcok !"}}) ;
         }

         const check= cart.every(item=>{
               return item._id !== product._id;
         })

         if(!check) return ({type:"NOTIFY" ,payload:{error: 'The product has  added to cart '}}) ;


         return ({type:'ADD_CART',payload:[...cart,{...product,quantity:  1  }]}) ;
         
}




export const deleteFromActions=(cart,id ,type)=>{

  
   let updateCart= cart.filter(item=>{
            return item._id !== id ;
      })


      return({type,payload:updateCart})


}



   export const updateDataFromActios=(data,id,post,type)=>{
         const updated= data.map(item=>(item._id === id ? post : item)) ;

         return({type,payload:updated})
   }



export const decrese=(data,id)=>{

      const newData=[...data] ;


      newData.forEach(item=>{

          if(item._id=== id) return item.quantity = Number(item.quantity)- 1 ;
         
      })


      
      return({type:"ADD_CART",payload:newData})


}




export const increse =(data,id)=>{

 
      const newData=[...data] ;


      newData.forEach(item=>{
          if(item._id=== id) return item.quantity= Number(item.quantity) + 1 ;
          
          
      })


      
      return({type:"ADD_CART",payload:newData}) ;

}