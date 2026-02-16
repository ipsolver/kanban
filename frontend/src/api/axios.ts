import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://kanban-production-337f.up.railway.app',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
