import CryptoJS, { AES } from "crypto-js";


export function encryptData(data:  unknown, key: string): string {
  const dataToEncrypt = typeof data === "string" ? data : JSON.stringify(data);
  return AES.encrypt(dataToEncrypt, key).toString();
}

export function decryptData(encryptedData: string, key: string): string {
  const bytes = AES.decrypt(encryptedData, key);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  try {
    return JSON.parse(decryptedData);
  } catch {
    return decryptedData;
  }
}