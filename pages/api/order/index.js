/* eslint-disable import/no-anonymous-default-export */
import auth from "../../../middleware/auth";
import Orders from '../../../models/orderModel';
import Products from '../../../models/productModels';


export default async(req,res)=>{
    switch(req.method){
        case "POST":
            await createOrder (req,res)
            break ;
            case "GET":
                await getOrders (req,res)
                break ;
    }
}



const getOrders=async (req,res)=>{
    try {

        const result= await auth(req,res) ;

        let orders;

          if( result.role !== 'admin') {
               orders=   await Orders.find({user:result.id}).populate('user','-password')
          }else{
            orders = await Orders.find().populate('user','-password')
          }


          res.json({orders})


        
    } catch (error) {

        return res.status(500).json({err:error.message})
        
    }
}




    const createOrder=async(req,res)=>{
        try {

              const  result = await auth(req,res) ; 

     

               const {mobile,address, cart,total}=req.body ;

                const newOrder= await new Orders({
                    user:result.id,
                    mobile,address, cart,total

                })


                     cart.filter(item=>{
                         return sold(item._id,item.quantity,item.inStock,item.sold)
                     }) ;

                     await newOrder.save() ;

              res.status(201).json({
                  msg:"Order successfully ! We will contact confirm to you ! ",
                  newOrder
                  
              })



            
        } catch (error) {

            return res.status(500).json({err:error.message})
            
        }
    }



     const sold =async(id,quantity,oldInstock,oldSold)=>{

                          await Products.findByIdAndUpdate({_id:id},{

                            inStock:oldInstock - quantity,
                            sold :quantity + oldSold

                          })



     }