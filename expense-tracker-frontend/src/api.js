import axios from 'axios';

const API_URL = "http://localhost:3000"; // your backend URL

export const fetchExpenses = () => axios.get(`${API_URL}/api/getExpense`);
export const createExpense = (expense) => axios.post(`${API_URL}/api/addExpense`, expense);
export const updateExpense = (id, updatedExpense) => axios.put(`${API_URL}/api/updateExpense/${id}`, updatedExpense);
export const deleteExpense = (id) => axios.delete(`${API_URL}/api/deleteExpense/${id}`);
