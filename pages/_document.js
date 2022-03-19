/* eslint-disable @next/next/no-sync-scripts */
import Document, { Head, Html, Main, NextScript } from "next/document";

  class MyDocument extends Document{

    render(){
        return(
            <Html lang="en">
                <Head>
             
                {/* font awesome */}

                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" integrity="sha512-Fo3rlrZj/k7ujTnHg4CGR2D7kSs0v4LLanw2qksYuRlEzO+tcaEPQogQ0KaoGN26/zrn20ImR1DfuLWnOo7aBA==" crossOrigin="anonymous" referrerPolicy="noRreferrer" />



                {/* link for Paypal  */}
                <script src={`https://www.paypal.com/sdk/js?client-id=${process.env.PAYPAL_CLIENT_ID}`}></script>
                
                </Head>
                 <body className="dark:bg-dark-500">
                     <Main/> 
                     <NextScript/>
                 </body>
            </Html>
        )
    }
  }

  


  export default MyDocument