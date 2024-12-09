import { decryptData } from './encrypt-decrypt';

export function useLogger() {
  const authenticate = decryptData(window.localStorage.getItem('active-token'));
  return {
    ...authenticate,
    isLoggedIn: !!authenticate?.token
  };
}
