import mongoose from 'mongoose';
const url =process.env.MONGODB_URL ;


const connectToDB=()=>{

if(mongoose.connections[0].readyState){
 console.log("Data already connected")
 return ''
}



mongoose.connect(url,{useNewUrlParser:true,
    useUnifiedTopology:true},(er)=>{
        if(er)  throw er

       return  console.log("Data coneection succesfuly !")
    })

}


export default connectToDB