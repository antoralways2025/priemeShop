/* eslint-disable import/no-anonymous-default-export */
import bcrypt from 'bcrypt';
import Users from '../../../models/userModels';
import connectToDB from '../../../utils/connectToDB';
import { createAccessToken, createRefreshToken } from '../../../utils/GenarateToken';


connectToDB() ;

export default async(req,res)=>{
    switch(req.method){
         case "POST" :
             await login(req,res)
             break

    }
}


 const login=async(req,res)=>{
     try {
         const {email,password}=req.body ;

          const user= await Users.findOne({email}) ;


          
          if(!user) return res.status(400).json({err:"The user does not match !"}) ;

        const  isMatch=await bcrypt.compare(password,user.password) ;

        if(!isMatch) return res.status(400).json({err:"The password isnot correct !"}) ;


          const access_token= createAccessToken({id:user._id}) ;
       
            
           const refresh_token=createRefreshToken({id:user._id})

           

           


        res.status(200).json({
             msg:"The login success !",
             access_token,
             refresh_token,
            

             user:{
                 name:user.name,
                 id:user._id,
                 email:user.email,
                 avatar:user.avatar,
                 role:user.role,
                 root:user.root
             }

        })

         
     } catch (error) {
         res.status(500).json({err:error.message})
     }
 }