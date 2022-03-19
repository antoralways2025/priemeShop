/* eslint-disable import/no-anonymous-default-export */

import auth from '../../../../middleware/auth';
import Orders from '../../../../models/orderModel';

export default async(req,res)=>{
    switch(req.method){
        case "PATCH" :
                await updateOrder(req,res) 
                break ;
    }
}



const updateOrder=async(req,res)=>{
    try {
          await auth(req,res) ;


          const {id}=req.query ;

          const {paymentId}=req.body;

 
           const newOrder= await Orders.findByIdAndUpdate({_id:id},{
               paid:true,
               method:"Paypal",
               paymentId,
               paymentOfDate:new Date().toISOString() ,
               

            })
         
        res.json({msg:"Your Payment is Success !" , newOrder}) ;


    } catch (error) {

        return res.status(500).json({err:error.message})
        
    }
}