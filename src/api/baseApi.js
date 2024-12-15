import axios from 'axios';

const api = axios.create({
  baseURL: 'https://proyectofinald-production.up.railway.app', 
  timeout: 20000,
});

export default api;
