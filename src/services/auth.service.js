import axios from 'axios';

export const loginUser = data => axios.post('/auth/login', data)

export const registerUser = (data) => axios.post('/auth/register', data);

export const setUserToLocalStorage = (userObj) => localStorage.setItem('zu_user', JSON.stringify(userObj));

export const removeUserFromLocalStorage = () => localStorage.removeItem('zu_user');

export const getAllUser = () => axios.get('/auth/users');

export const getUser = (id) => axios.get(`/auth/user/${id}`);

export const isUserLoggedIn = () => localStorage.getItem('zu_user');

export const isAdminUser = () => isUserLoggedIn() && JSON.parse(isUserLoggedIn())?.isAdmin; // true or false

export const setTokenToLocalStorage = (token) => localStorage.setItem('zu_token', token);