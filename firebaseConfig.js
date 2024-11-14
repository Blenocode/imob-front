// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Import para autenticação

const firebaseConfig = {
  apiKey: "AIzaSyC84CQPurio3nsHaLDLRCfKE3JxaUMvhu0",
  authDomain: "imob-53002.firebaseapp.com",
  projectId: "imob-53002",
  storageBucket: "imob-53002.firebasestorage.app",
  messagingSenderId: "1046829606140",
  appId: "1:1046829606140:web:f6435bf5fecc72f64fa379",
  measurementId: "G-7LMFRRVHG3"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Configuração de autenticação para usar com SMS

export { app, analytics, auth }; // Exporte as configurações necessárias
