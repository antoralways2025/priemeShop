/* eslint-disable import/no-anonymous-default-export */
import jwt from 'jsonwebtoken';
import Users from '../../../models/userModels';
import connectToDB from '../../../utils/connectToDB';
import { createAccessToken } from '../../../utils/GenarateToken';

connectToDB() ;
  
    export default  async(req,res)=>{
      try {
         const rf_token = req.cookies.reFreshToken;

         if(!rf_token) return res.status(400).json({err:"Please log in !"}) ;

         const result= jwt.verify(rf_token,process.env.REFRESH_TOKEN_SECRET) ;
       

          if(!result) return res.status(400).json({err:"The  Invalid token or has expired "}) ;

                const user= await Users.findById(result.id) ;

                 if(!user) return res.status(400).json({err:"The user doesnot exists"}) ;


                 const access_token= createAccessToken({id:user._id}) ;


                 res.status(200).json({
                    access_token,
                     user:{
                         name:user.name,
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

 