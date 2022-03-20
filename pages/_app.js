import Layout from '../components/Layout'
import DataProvider from '../store/GlobaleState'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return(
   
    
    <DataProvider> 
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </DataProvider>
    
  )
}

export default MyApp
