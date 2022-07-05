// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyDl2hu5WlataB51Zuq3yyfhBWtQ6pcBe8s",
  authDomain: "groceries-store-beta.firebaseapp.com",
  projectId: "groceries-store-beta",
  storageBucket: "groceries-store-beta.appspot.com",
  messagingSenderId: "854689133531",
  appId: "1:854689133531:web:e98b6ce7af22b2c71badfe"
};


const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
export const auth = getAuth()
export const storage = getStorage()
export const db = getFirestore() 

export default app
