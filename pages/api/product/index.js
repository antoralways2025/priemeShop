import auth from '../../../middleware/auth';
import Proucts from '../../../models/productModels';
import connectToDB from '../../../utils/connectToDB';

connectToDB()
// eslint-disable-next-line import/no-anonymous-default-export
export default async(req,res)=>{
    switch(req.method){
        case "GET" :
            await getProducts(req,res)
            break ;
            case "POST" :
                await createProduct(req,res)
                break ;   
    }
}

 
class APIfeatures{

    constructor(query,queryString){
        this.query = query ;
        this.queryString= queryString

    }



    filtering(){

            const queryObj= {...this.queryString} ;
            
             let excludeFields =["page,limit,sort"] ;

               excludeFields.forEach(el=> delete(queryObj[el]));

             if(queryObj.category !== 'all'){

                this.query.find({category:queryObj.category});

             }

                 if(queryObj.title !== 'all'){
                    this.query.find({title:{$regex:queryObj.title}}) ;
                 }

                  this.query.find();

                 return this ;
              }
    
    sorting(){
    
        
        if(this.queryString.sort){

            const sortBy = this.queryString.sort.split(',').join(' ') ;
             this.query= this.query.sort(sortBy)
        }else{
            this.query = this.query.sort("-createdAt")
        }


        return this;

    
    }

    pagenation(){
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 6 ;

        const skip = (page - 1) * limit ;
         
         this.query   =  this.query.skip(skip).limit(limit)

        return this ;
    }


}


const getProducts=async (req,res)=>{
  try {

 

      const features = new  APIfeatures(Proucts.find(),req.query)
                            .filtering().sorting().pagenation()

                      const products = await features.query;

                            

   res.json({
       mgs:"success",
       result:products.length,
       products

   }) 

  } catch (error) {
      res.status(500).json({err:error.message})
      
  } 
} 

 


const createProduct= async(req,res)=>{
    try {

                const result = await auth(req,res);

                if(result.role !== 'admin') return res.status(400).json({err:"The auhtentication is not valid !"}) ;

                const{title,category,price,inStock,description,content ,images}=req.body ;

                 if(!title || category === 'all' || !price || !inStock || !description || !content  || images.length === 0) 

                 return res.status(400).json({err:"Every field is required !"}) ;



              
          
          const newProduct = new Proucts({
              
            title:title.toLowerCase(),
            category,
            price,
            inStock,
            description
            ,content 
            ,images

                })

    
          await newProduct.save()

          res.json({
              msg:"Product created !" ,
          
          })
    } catch (error) {

        res.status(500).json({err:error.message})
        
    }
}