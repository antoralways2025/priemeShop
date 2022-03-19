
import jwt from 'jsonwebtoken';
import Users from '../models/userModels';


  const auth=async(req,res)=>{

            const token=req.headers.authorization ;

             if(!token) return res.status(400).json({err:"Invalid Authentication"}) ;

             const result =  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET) ;

             if(!result) return res.status(400).json({err:"Invalid Authoraization"}) ;
             

             const user= await Users.findOne({_id:result.id}) ;

          
             return{ id:user._id,role:user.role} ;

  }



  export default auth ;