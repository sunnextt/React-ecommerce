import React from 'react';
import { PaystackButton } from 'react-paystack';
import {publicKey} from './PaystackPublickey'
  
  const config = {
    reference: (new Date()).getTime(),
    email: "user@example.com",
    amount: 20000,
    publicKey,
  };




  
  function Paystack() {
    const handlePaystackSuccessAction = (reference) => {
      console.log(reference);
    };

    const handlePaystackCloseAction = () => {
      console.log('closed')
    }

    const componentProps = {
        ...config,
        text: 'Paystack Button Implementation',
        onSuccess: (reference) => handlePaystackSuccessAction(reference),
        onClose: handlePaystackCloseAction,
    };

    return (
      <div >
        <PaystackButton {...componentProps} />
      </div>
    );
  }
  
  export default Paystack;