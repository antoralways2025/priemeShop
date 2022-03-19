/* eslint-disable import/no-anonymous-default-export */
import auth from "../../../middleware/auth";
import Users from '../../../models/userModels';


export default async(req,res)=>{
      switch(req.method){
            case "PATCH": 
                  await updateUser(req,res) 
                  break ;
               case "DELETE": 
                  await  deleteUser(req,res) 

                  break

        }
    
}


const updateUser=async(req,res)=>{
    try {
        const result = await auth(req,res) ;

        if(result.role !== 'admin') return res.status(400).json({err:"Authentication is not valid !"})
            const {id}=req.query ;
             const {role}=req.body ;

         await Users.findByIdAndUpdate({_id:id},{role}) ;
        res.json({msg:"Update successfully !"}) ;

    } catch (error) {
        return res.status(500).json({err:error.message})
        
    }
}







const deleteUser=async(req,res)=>{
    try {
        const result = await auth(req,res) ;

        if(result.role !== 'admin') return res.status(400).json({err:"Authentication is not valid !"})
            const {id}=req.query ;

         await Users.findByIdAndDelete(id) ;
        res.json({msg:"User delete successfully !"}) ;

    } catch (error) {
        return res.status(500).json({err:error.message})
        
    }
}
