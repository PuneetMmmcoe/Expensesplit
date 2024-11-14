// File: components/PaymentButton.js

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const PaymentButton = ({ amount, currency, onPaymentComplete }) => {
  const handlePress = async () => {
    try {
      // Create payment request
      const createResponse = await fetch('/api/payments/create-gpay-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, currency }),
      });
      const paymentData = await createResponse.json();

      // Here you would typically show the Google Pay button to the user
      // and handle the payment flow. For this example, we'll simulate it:
      const processResponse = await fetch('/api/payments/process-gpay-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paymentData }),
      });
      const result = await processResponse.json();

      if (result.status === 'SUCCESS') {
        alert(`Payment Successful: ${result.transactionId}`);
        onPaymentComplete();
      } else {
        alert('Payment failed');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Error processing payment');
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Text style={styles.text}>Pay with Google Pay</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4285F4',
    padding: 10,
    borderRadius: 5,
  },
  text: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default PaymentButton;