// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
///FOR STORAGE
import { getStorage } from "firebase/storage";
//database for forms and movie details
import { getDatabase } from "firebase/database";
const firebaseConfig = {
 
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
export let auth = getAuth(firebase);
export let storage = getStorage(firebase);
export let database = getDatabase(firebase);
export default firebase;
