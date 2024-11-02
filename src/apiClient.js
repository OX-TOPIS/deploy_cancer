import axios from 'axios';

export const AxiosClient = axios.create({ // ใช้ named export
  baseURL: 'http://3.107.2.16:8080',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});