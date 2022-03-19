import { ThemeProvider } from 'next-themes'
import React, { useContext } from 'react'
import { DataContext } from '../store/globaleState'
import ModalBox from './ModalBox'
import Navbar from './Navbar'
import Notify from './Notify'

const Layout = ({children}) => {

    const{state,dispatch}=useContext(DataContext) ;
  
       const{modalShow}= state.modal[0]

       
       
    return (
      
        <ThemeProvider attribute='class'>
        <div className='container mx-auto overflow-hidden'>

           

            <Navbar/>
            <Notify/>
            {modalShow && <ModalBox/>}  
            {children}
            
        </div>
        </ThemeProvider>
        
    )
}

export default Layout
