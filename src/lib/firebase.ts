import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyB0gdbK9e7xxuUHYuHVbqDipJKhKCUJuPc",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "obmanagementsys.firebaseapp.com",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://obmanagementsys-default-rtdb.firebaseio.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "obmanagementsys",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "obmanagementsys.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "117243287723",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:117243287723:web:ca4db447544f25b348ffee"
};

const app = initializeApp(firebaseConfig);
export const rtdb = getDatabase(app);
