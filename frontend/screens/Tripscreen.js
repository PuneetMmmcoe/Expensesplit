import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { db } from '../config/firebase';
import GPayButton from './components/GPayButton';
import { getDebts } from '../services/api';

export default function TripScreen({ route }) {
  const { tripId } = route.params;
  const [expenses, setExpenses] = useState([]);
  const [debts, setDebts] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('trips').doc(tripId).collection('expenses')
      .onSnapshot(snapshot => {
        const newExpenses = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setExpenses(newExpenses);
      });

    fetchDebts();

    return () => unsubscribe();
  }, [tripId]);

  const fetchDebts = async () => {
    try {
      const response = await getDebts(tripId);
      setDebts(response.data);
    } catch (error) {
      console.error('Error fetching debts:', error);
    }
  };

  const handlePaymentComplete = async () => {
    // Update the debt status in your backend
    // Refresh the debts
    await fetchDebts();
  };

  return (
    <View>
      <Text>Trip Expenses</Text>
      <FlatList
        data={expenses}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Text>{item.description}: ${item.amount}</Text>
        )}
      />
      <Text>Debts</Text>
      <FlatList
        data={debts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.from} owes {item.to}: ${item.amount}</Text>
            <GPayButton amount={item.amount} onPaymentComplete={handlePaymentComplete} />
          </View>
        )}
      />
    </View>
  );
}