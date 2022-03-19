/* eslint-disable import/no-anonymous-default-export */
import bcrypt from 'bcrypt';
import Users from '../../../models/userModels';
import connectToDB from '../../../utils/connectToDB';
import valid from '../../../utils/valid';

connectToDB() ;

  export default async(req,res)=>{
      switch(req.method){
          case "POST":
              await register(req,res) 
              break 
      }

 }


 const register=async(req,res)=>{
     try {

        const {name,email,password,cf_password}=req.body ;

          const errMsg=valid(name,email,password,cf_password) ;

          if(errMsg) return res.status(500).json({err:errMsg}) ;

         const user= await Users.findOne({email});

         if(user) return res.status(400).json({err:"User's Already  have an account !"}) ;

            
         const hassPassword= await bcrypt.hash(password,10)
         
         const newUser= await Users({
            name,email,password:hassPassword,
            })

             await newUser.save()

            res.status(200).json({msg:"Register success !"})
         
     } catch (error) {

        res.status(500).json({err:error.message})
         
     }
 }