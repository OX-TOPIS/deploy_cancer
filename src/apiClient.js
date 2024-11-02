import axios from 'axios';

export const AxiosClient = axios.create({ // ใช้ named export
  baseURL: 'https://deploy-nodejs-37ek.onrender.com',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});