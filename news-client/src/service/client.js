import axios from 'axios';

import { PUBLIC_API_ENDPOINT } from './entry-point';
import { decryptData } from '../utils/encrypt-decrypt';

const httpClient = axios.create({
  baseURL: PUBLIC_API_ENDPOINT,
  timeout: 1000,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
});

if (window) {
  const {token} = decryptData(window.localStorage.getItem('active-token'));
  httpClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default httpClient;
