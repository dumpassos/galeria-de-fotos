import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyC0A-4qFswkuxbifrhRs7tC3UjGd10WleA",
    authDomain: "galeria-de-fotos-react.firebaseapp.com",
    projectId: "galeria-de-fotos-react",
    storageBucket: "galeria-de-fotos-react.appspot.com",
    messagingSenderId: "1067345807035",
    appId: "1:1067345807035:web:1d5770514add6b0cf58b9e"
  };

  const firebaseApp = initializeApp(firebaseConfig); //Conectando ao Firebase
  export const storage = getStorage(firebaseApp); //Conectando ao Storage especificamente