import axios from 'axios';

export const UserProducts = (id) => axios.get(`/user/products/${id}`);

export const activateAccount = (id) => axios.get(`/user/activate-account/${id}`);

export const getAllUsers = () => axios.get('/user/get-all');

export const getUserById = (id) => axios.get(`/user/${id}`);

export const saveUserOrder = (payload) => axios.post('/user/order', payload);
