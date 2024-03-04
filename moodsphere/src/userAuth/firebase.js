// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB51kbIHKtjhKdC9WLoHn1n5rva-6kdPiU",
  authDomain: "moodsphere-dev-dynasty.firebaseapp.com",
  projectId: "moodsphere-dev-dynasty",
  storageBucket: "moodsphere-dev-dynasty.appspot.com",
  messagingSenderId: "31582792465",
  appId: "1:31582792465:web:ed7e040408bb81f4d4fab0",
  measurementId: "G-WBHFGXF8FQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export default app;