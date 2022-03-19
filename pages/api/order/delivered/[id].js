/* eslint-disable import/no-anonymous-default-export */

import auth from '../../../../middleware/auth';
import Orders from '../../../../models/orderModel';

export default async(req,res)=>{
    switch(req.method){
        case "PATCH" :
                await   productDelivered(req,res) 
                break ;
    }
}



const productDelivered=async(req,res)=>{
    try {
         const result =   await auth(req,res) ;


          const {id}=req.query ;

          if(result.role !== 'admin') return res.status(400).json({err:"Authcantication is not valid !"})

           const order= await Orders.findOne({_id:id}) ;

           if(order.paid){

                 await Orders.findByIdAndUpdate({_id:id},{
                    delivered:true
                 })

                 res.json({msg:"The Product Delivered  done !" ,result:{delivered:true}})

           }else{

            await Orders.findByIdAndUpdate({_id:id},{
                delivered:true ,
                paid:true,
                method:" Hand Cash ",
                paymentOfDate: new Date().toISOString() 
             })

             res.json({msg:"  delivered  with Hand cash  !" ,result:{
                 delivered:true,
                 paid:true,
                 method:"Hand cash",
                 paymentOfDate:new Date().toDateString() 
             }})

           }


 
    


    } catch (error) {

        return res.status(500).json({err:error.message})
        
    }
}