import auth from '../../../middleware/auth';
import Proucts from '../../../models/productModels';
import connectToDB from '../../../utils/connectToDB';


connectToDB()
// eslint-disable-next-line import/no-anonymous-default-export
export default async(req,res)=>{
    switch(req.method){
        case "GET" :
            await getProduct(req,res) ;
            break ;
            case "PATCH" :
                await updateProduct(req,res) ;
                break ;
            case "DELETE" :
                    await deleteProduct(req,res) ;
                    break ;

    }
}


const getProduct= async(req,res)=>{
    try {

        const {id}=req.query ;

        const product= await Proucts.findById(id) ;
        if(!product) return res.status(400).json({err:"Product doesnot exist  "})


         res.status(200).json({
             msg:"succuss" ,
             product
         })
        

    } catch (error) {
        res.status(500).json({err:error.message})
        
    }
}


const  updateProduct= async(req,res)=>{
    try {

        const {id}=req.query ;

        const result = await auth(req,res);

        if(result.role !== 'admin') return res.status(400).json({err:"The auhtentication is not valid !"}) ;

        const{title,category,price,inStock,description,content ,images}=req.body ;

         if(!title || category === 'all' || !price || !inStock || !description || !content  || images.length === 0) 

         return res.status(400).json({err:"Every field is required !"}) ;


         await Proucts.findByIdAndUpdate({_id:id},{...req.body ,title:title.toLowerCase()})


         res.status(200).json({
             msg:" update Success succuss" ,
              
         })
        

    } catch (error) {
        res.status(500).json({err:error.message})
        
    }
}



const  deleteProduct= async(req,res)=>{
    try {

        
        const {id}=req.query ;

        const result = await auth(req,res);

        if(result.role !== 'admin') return res.status(400).json({err:"The auhtentication is not valid !"}) ;
 




         await Proucts.findByIdAndDelete(id)


         res.status(200).json({
             msg:" Delete Success!" ,
              
         })
        

    } catch (error) {
        res.status(500).json({err:error.message})
        
    }
}