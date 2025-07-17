import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyAx3zcAL_YAJ1T3SPCF4PryfPjh-A68G40",
    authDomain: "smart-scheduling-94270.firebaseapp.com",
    projectId: "smart-scheduling-94270",
    storageBucket: "smart-scheduling-94270.firebasestorage.app",
    messagingSenderId: "720793543672",
    appId: "1:720793543672:web:8f9cd8c4246e4dbb976c0d",
    measurementId: "G-4PH94GHTX2"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);
  
  export { db };
  