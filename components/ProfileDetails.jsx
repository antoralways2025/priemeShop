/* eslint-disable react-hooks/rules-of-hooks */
import Head from 'next/head';
import { useContext, useState } from 'react';
import { DataContext } from '../store/GlobaleState';

const ProfileDetails = () => {
    const { state,dispatch}=useContext(DataContext) ;
    c

    const initialState={
        avatar:"",
        name:"",
        email:"",
        password:"",
        cf_password:""
    }

     const [data,setData]=useState(initialState)

     


 
        
  return(
      <div className='sm:px-16'>
          <Head>Profile</Head>


         

                <div className="grid grid-cols-2 gap-2">


                        <div className='border border-green-400'>

                            <h3 className='text-center'>User Inter face</h3>

                            <div>
                                <input type="text" />
                            </div>
                            
                        </div> 

                        <div className='border border-green-600'>
                            Second one
                        </div>

                    </div>
 
 

      </div>
  )
};

export default ProfileDetails;
