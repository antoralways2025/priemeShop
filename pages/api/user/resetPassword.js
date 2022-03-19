/* eslint-disable import/no-anonymous-default-export */
  import bcrypt from 'bcrypt'
import auth from '../../../middleware/auth'
import Users from '../../../models/userModels'

export default async(req,res)=>{
    switch(req.method){
        case "PATCH":
             await resetPassword(req,res) 
             break;
    }
}


    const resetPassword= async(req,res)=>{
        try {
            
            const result= await auth(req,res) ;  

                    const {password}=req.body ;
                    

            
                    

                    const hashPassword=await bcrypt.hash(password,10) ;

                await  Users.findByIdAndUpdate({_id:result._id} ,{password:hashPassword}) ;

                res.status(201).json({msg:"Password Change  Successfully  !"}) ;

             
            
        } catch (error) {
           
            
            return res.status(500).json({err:error.message})    ;
            
        }
    }