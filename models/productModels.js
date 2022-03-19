const mongoose=require('mongoose') ;


const  productsSchema= mongoose.Schema({
    
    title:{
        type:String,
        required:true,
        trim:true
    },
    price:{
        type:Number,
        required:true,
        
    },
    description:{

        type:String,
        required:true,
        trim:true
    },
    content:{
        type:String,
        required:true,
        trim:true
    },
    images:{
        type:Array,
        required:true,
        
    },
    category:{
        type:String,
        required:true
    },
    checked:{
     type:Boolean,
     default:false
    },
    inStock:{
        type:Number,
        default: 0
    },
    sold:{
        type:Number,
        default:0
    }
},
    { timestamps: true }
)




const dataset=mongoose.models.product || mongoose.model("product",productsSchema) ;

export default dataset