// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
///FOR STORAGE
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBZ4x8H1YwWVQkxLRrtyq9Ds4fsSd-l9rI",
  authDomain: "streambase-36423.firebaseapp.com",
  projectId: "streambase-36423",
  storageBucket: "streambase-36423.appspot.com",
  messagingSenderId: "933305670020",
  appId: "1:933305670020:web:21ed5a8aa225ffbfffe5d1",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
export let auth = getAuth(firebase);
export let storage = getStorage(firebase);
export default firebase;
