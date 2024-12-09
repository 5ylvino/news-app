import axios from 'axios';

import { PUBLIC_API_ENDPOINT } from './entry-point';
import { decryptData } from '../utils/encrypt-decrypt';
import { API_ENDPOINTS } from './api-endpoints';

const httpClient = axios.create({
  baseURL: PUBLIC_API_ENDPOINT,
  timeout: 1500,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
});

if (window) {
  const { token } = decryptData(window.localStorage.getItem('active-token'));
  httpClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

httpClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error?.status === 401) {
      window.localStorage.clear();
      window.location.href = API_ENDPOINTS.login;
    }
    return Promise.reject(error);
  }
);
export default httpClient;
