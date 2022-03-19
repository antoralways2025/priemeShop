

const imageUploader= async(images)=>{


  let newImg=[] 


  for( let item of images){

   const formData = new FormData() ;
     formData.append('file',item) 
     formData.append('upload_preset', process.env.CLOUD_UPLOAD_PRESET)
     formData.append('cloud_name',process.env.CLOUD_NAME)

     const res= await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/image/upload`,{
      method:"POST",
      body:  formData
      }) ;

        const data = await res.json() ;

        
        newImg.push({url:data.url, public_id:data.public_id})
         
  }


    return newImg


 } 



export default imageUploader