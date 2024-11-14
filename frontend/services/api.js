import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const login = (email, password) => axios.post(`${API_URL}/users/login`, { email, password });
export const createTrip = (tripData) => axios.post(`${API_URL}/trips`, tripData);
export const addExpense = (tripId, expenseData) => axios.post(`${API_URL}/trips/${tripId}/expenses`, expenseData);
export const getDebts = (tripId) => axios.get(`${API_URL}/trips/${tripId}/debts`);
export const createRestaurantExpense = (expenseData) => axios.post(`${API_URL}/restaurant-expenses`, expenseData);