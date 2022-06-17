// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDLmMHWI3IUH0wRcysljkPp5MawBKHLkJE",
  authDomain: "groceries-store-897fd.firebaseapp.com",
  projectId: "groceries-store-897fd",
  storageBucket: "groceries-store-897fd.appspot.com",
  messagingSenderId: "2828303914",
  appId: "1:2828303914:web:343c41ff7ccd6a80320d53"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
export const auth = getAuth(app)

export default app
