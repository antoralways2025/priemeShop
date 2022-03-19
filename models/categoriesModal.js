import mongoose from 'mongoose';

const categoriesSchem= new mongoose.Schema({
    name:{
        type:String ,
        required:true,
        trim:true

    }
},{
    timestamps:true
})



const dataset= mongoose.models.categorie || mongoose.model('categorie',categoriesSchem) ;

export default dataset;