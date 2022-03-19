
const valid=(name,email,password,cf_password)=>{


    if(!name || !email || !password || !cf_password){
        return "Please fill all fields " ;
    }
       if( !validateEmail(email)) return "The invalid email !"
    if(password.length < 4) return "Password must be atleast 6 charecter !"

    if(password !== cf_password) return "Confirm password doesnot match !" ;

}


// validity cheacker  of emali
const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };


  export default  valid