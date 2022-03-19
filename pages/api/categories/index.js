/* eslint-disable import/no-anonymous-default-export */
import auth from '../../../middleware/auth';
import Categories from '../../../models/categoriesModal';





export default async(req,res)=>{
    switch(req.method){

       case  "GET":

        await getCategories(req,res)
            break ;

        case "POST" :
            await createCategory(req,res)
            break ;   
                    
    }
}





const  createCategory = async(req,res)=>{
    try {
        const result = await auth(req,res) ;

        if(result.role !== 'admin' ) return res.status(400).json({err:"Authenticatin is not valid !"}) ;

        const {name}=req.body ;

        if(!name) return res.status(400).json({err:"You can not left filed  !"})

         const newCategory  =  new Categories({
                name
         })

        await  newCategory.save() ;


     res.json({msg:"Create succesfully", newCategory})

    } catch (error) {

        return res.status(500).json({err:error.message})
        
    }
}



const getCategories=async(req,res)=>{
    try {

 

             const categories =   await Categories.find() ;

            res.json({msg:"categories get successfull!" ,categories}) ;

        
    } catch (error) {

        return res.status(500).json({err:error.message})
        
    }
}



