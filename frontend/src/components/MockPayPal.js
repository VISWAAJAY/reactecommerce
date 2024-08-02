//paypal button
import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const PayPalButton = () => {
    return (
        <PayPalScriptProvider options={{ "client-id": "AalARaG5Ym62zZ49Nx64is92Z-BjEFcGsCxq_l8FifIUqfrt9gw_GKXpu3qMmIE0veiTdY-KMQu3jNnO" }}>
            <PayPalButtons
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                value: '0.01' 
                            }
                        }]
                    });
                }}
                onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                        alert('Transaction completed by ' + details.payer.name.given_name);
                    });
                }}
            />
        </PayPalScriptProvider>
    );
}

export default PayPalButton;
