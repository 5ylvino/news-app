import * as CryptoJS from 'crypto-js';

export function encryptData(info) {
  const secretKey = `${process.env.NEXT_PUBLIC_CRYPTO_SECRET}`;
  try {
    const values = JSON.stringify(info);
    return CryptoJS.AES.encrypt(values, secretKey).toString();
  } catch {
    return '';
  }
}

export function decryptData(info) {
  const secretKey = `${process.env.NEXT_PUBLIC_CRYPTO_SECRET}`;
  try {
    if (!info) {
      return {};
    }
    const decryptedBytes = CryptoJS.AES.decrypt(info, secretKey);
    const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
    if (decryptedText) {
      return JSON.parse(decryptedText);
    } else {
      return info;
    }
  } catch {
    return null;
  }
}
