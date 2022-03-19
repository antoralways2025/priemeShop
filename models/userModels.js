const mongoose=require('mongoose') ;


const userSchema= mongoose.Schema({
    
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    avatar:{
        type:String,
        default:"https://cdn2.vectorstock.com/i/1000x1000/23/81/default-avatar-profile-icon-vector-18942381.jpg"
    },
    role:{
        type:String,
        default:"user"
    },
    root:{
        type:Boolean,
        default:false
    }
},
    { timestamps: true }
)




const dataset=mongoose.models.user || mongoose.model("user",userSchema) ;

export default dataset