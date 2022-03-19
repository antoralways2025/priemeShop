import React, { useContext, useEffect, useRef } from 'react';
import { deleteFromOrder } from '../store/Actions';
import { DataContext } from '../store/globaleState';
import { patchData } from '../utils/FeatchData';

const PaypalBtn = ({order}) => {


      const {state,dispatch}=useContext(DataContext) ;

        const{ auth, cart ,orders } = state 
  

        const refBtn=useRef() ;


  useEffect(()=>{

    paypal.Buttons({

      // Sets up the transaction when a payment button is clicked

      createOrder: function(data, actions) {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: order.total // Can reference variables or functions. Example: `value: document.getElementById('...').value`
            }
          }]
        });
      },

      // Finalize the transaction after payer approval
      onApprove: function(data, actions) {


              dispatch({type:"NOTIFY",payload:{loading:true}})

        return actions.order.capture().then(function(orderData) {

           

          patchData(`order/payment/${order._id}` ,{paymentId:orderData.payer.payer_id},auth.token)
          .then(res=>{
            if(res.err) return dispatch({type:"NOTIFY",payload:res.err}) ;

            dispatch({ type:"ADD_CART",payload:[]} )  ;



              dispatch(deleteFromOrder(orders,order._id,{
                ...order,
                paid:true,
                method:"Paypal",
                paymentId:orderData.payer.payer_id,
                paymentOfDate: orderData.create_time 
                
              }))
            
               
  
             return  dispatch({type:"NOTIFY",payload:{success:res.msg}})

          })

        });
      }
    }).render(refBtn.current);
  },[order.total])




  return(
      <div ref={refBtn}>
          
      </div>
  )
};

export default PaypalBtn;
