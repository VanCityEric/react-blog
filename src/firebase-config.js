// Import the functions you need from the SDKs you need
import { getStorage } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBZYaeFWG0S8Hs4kPZ9zjoVVhWjKV34Nkw',
  authDomain: 'blog-project-e0928.firebaseapp.com',
  projectId: 'blog-project-e0928',
  storageBucket: 'blog-project-e0928.appspot.com',
  messagingSenderId: '598303957573',
  appId: '1:598303957573:web:dcdd67789e9fd5154d392c',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const projectStorage = getStorage(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
