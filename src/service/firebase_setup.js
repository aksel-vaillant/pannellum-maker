import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_SENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID
};

const app = initializeApp(firebaseConfig);

let db = false;
let storage = false;
let auth = false;

export const getFBDatabase = () => {
  if(!db){
    db = getFirestore(app);
  }
  return db;
}

export const getFBStorage = () => {
  if(!storage){
    storage = getStorage(app, process.env.REACT_APP_STORAGE);
  }
  return storage;
}

export const getFBAuth = () => {
  if(!auth)
    auth = getAuth(app);
  return auth;
}