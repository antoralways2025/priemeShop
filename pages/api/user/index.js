/* eslint-disable import/no-anonymous-default-export */
import auth from "../../../middleware/auth";
import Users from '../../../models/userModels';


export default async(req,res)=>{
      switch(req.method){
            case "PATCH": 
                  await UpdateImgae(req,res) 
                  break ;
               case "GET": 
                  await  getUsers(req,res) 

                  break

        }
    
}


      const getUsers  = async(req,res)=>{
         try {
            
            const result = await auth (req,res) ;
 
            if(result.role !== 'admin') return res.status(400).json({msg:"Authenticatin is not valid "});

            const users= await Users.find().select('-password');


            res.json({users}) ;

 
         } catch (error) {

            return res.status(500).json({err:error.message })
            
         }
      }
  


      
 const UpdateImgae=async(req,res)=>{
     try {
                const result = await auth(req,res) ;

                const {avatar,name}=req.body ;


                 

            const user=  await Users.findByIdAndUpdate({_id:result.id},{name, avatar}) ;


             res.json({msg:"Update Success !" ,
             user:{
                name,
                avatar,
                email:user.email,
                role:user.role

             }
            })



         
     } catch (error) {

        return res.status(500).json({err:error.message})
         
     }
 }