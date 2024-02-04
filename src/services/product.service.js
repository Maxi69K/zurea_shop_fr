import axios from "axios";

export const GetAllProducts = () => axios.get('/product/get-all');

export const GetProduct = (productId) => axios.get(`/product/get/${productId}`);

export const GetTopTwoProducts = () => axios.get('/product/topTwo');

export const SearchProducts = (searchParams) => axios.post('/product/search', {searchParams: searchParams});

export const CreateProduct = (payload) => axios.post('/product/create', payload);

export const UpdateProduct = (payload) => axios.put('/product/update', payload);