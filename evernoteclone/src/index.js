import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
const firebase = require("firebase");
require("firebase/firestore");
const firebaseConfig = {
  apiKey: "AIzaSyBGV-xSiP70B37ULx4JaR68jYJktZYHdIU",
  authDomain: "evernote-b7c7b.firebaseapp.com",
  databaseURL: "https://evernote-b7c7b.firebaseio.com",
  projectId: "evernote-b7c7b",
  storageBucket: "evernote-b7c7b.appspot.com",
  messagingSenderId: "244551856169",
  appId: "1:244551856169:web:f5254b1813f984314e2c38",
};
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
