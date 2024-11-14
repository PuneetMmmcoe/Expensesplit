import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { createRestaurantExpense } from '../services/api';

export default function RestaurantScreen({ navigation }) {
  const [restaurant, setRestaurant] = useState('');
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', price: '', consumers: '' });
  const [tax, setTax] = useState('');
  const [tip, setTip] = useState('');

  const addItem = () => {
    if (newItem.name && newItem.price) {
      setItems([...items, { ...newItem, consumers: newItem.consumers.split(',') }]);
      setNewItem({ name: '', price: '', consumers: '' });
    }
  };

  const calculateTotal = () => {
    const subtotal = items.reduce((sum, item) => sum + parseFloat(item.price), 0);
    const taxAmount = parseFloat(tax) || 0;
    const tipAmount = parseFloat(tip) || 0;
    return (subtotal + taxAmount + tipAmount).toFixed(2);
  };

  const handleSubmit = async () => {
    try {
      const expenseData = {
        restaurant,
        date: new Date(),
        items,
        tax: parseFloat(tax) || 0,
        tip: parseFloat(tip) || 0,
      };
      await createRestaurantExpense(expenseData);
      navigation.goBack();
    } catch (error) {
      console.error('Error creating restaurant expense:', error);
      // TODO: Show error message to user
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Restaurant Expense</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Restaurant Name"
        value={restaurant}
        onChangeText={setRestaurant}
      />

      <View style={styles.itemInputContainer}>
        <TextInput
          style={styles.itemInput}
          placeholder="Item Name"
          value={newItem.name}
          onChangeText={(text) => setNewItem({ ...newItem, name: text })}
        />
        <TextInput
          style={styles.itemInput}
          placeholder="Price"
          value={newItem.price}
          onChangeText={(text) => setNewItem({ ...newItem, price: text })}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.itemInput}
          placeholder="Consumers (comma-separated)"
          value={newItem.consumers}
          onChangeText={(text) => setNewItem({ ...newItem, consumers: text })}
        />
        <Button title="Add Item" onPress={addItem} />
      </View>

      <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text>{item.name}: ${item.price}</Text>
            <Text>Consumers: {item.consumers.join(', ')}</Text>
          </View>
        )}
      />

      <TextInput
        style={styles.input}
        placeholder="Tax"
        value={tax}
        onChangeText={setTax}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Tip"
        value={tip}
        onChangeText={setTip}
        keyboardType="numeric"
      />

      <Text style={styles.total}>Total: ${calculateTotal()}</Text>

      <Button title="Submit Expense" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  itemInputContainer: {
    flexDirection: 'column',
    marginBottom: 10,
  },
  itemInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 5,
    paddingHorizontal: 10,
  },
  itemContainer: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 20,
  },
});