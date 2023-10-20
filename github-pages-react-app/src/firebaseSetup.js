// firebaseSetup.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import firebaseConfig from './firebaseConfig'; // Import your updated firebaseConfig

// Initialize the Firebase app
const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);
const auth = getAuth(firebaseApp);

const firebaseServices = {
    database,
    auth
};

export default firebaseServices;
