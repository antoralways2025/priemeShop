/* eslint-disable import/no-anonymous-default-export */
import auth from '../../../middleware/auth';
import Categories from '../../../models/categoriesModal';
import Proucts from '../../../models/productModels';

export default async(req,res)=>{
    switch(req.method){

       case "PUT":
        await updateCategory(req,res)
            break ;
       case "DELETE":
                await deleteCategory(req,res)
                    break ;
 
    }
}


  



const  updateCategory = async(req,res)=>{
    try {
        const result = await auth(req,res) ;

        if(result.role !== 'admin' ) return res.status(400).json({err:"Authenticatin is not valid !"}) ;

           const {id}=req.query ; 

        const {name}=req.body ;

         
         const updateCategory =   await Categories.findByIdAndUpdate({_id:id},{name}) ;
        
         
          res.json({msg:"Update successful !" ,category:{
            ... updateCategory._doc,
             name
            
          }}) 

    } catch (error) {

        return res.status(500).json({err:error.message})
        
    }
}

const  deleteCategory = async(req,res)=>{
    try {
        const result = await auth(req,res) ;

        if(result.role !== 'admin' ) return res.status(400).json({err:"Authenticatin is not valid !"}) ;

           const {id}=req.query ; 

           const  product =   await Proucts.findOne({category:id}) ;

           if(product) return res.status(400).json({err:"Delete Before all Reletionship Categories Items.."})

         
           await Categories.findByIdAndDelete(id) ;
        
         
          res.json({msg:"Delete successful !" }) 

    } catch (error) {

        return res.status(500).json({err:error.message})
        
    }
}
