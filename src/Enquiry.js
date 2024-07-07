import { useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import 'firebase/compat/auth';
import firebase from "firebase/compat/app";

const firebaseConfig = {
  apiKey: "AIzaSyDMq7sQtTHL7NnoFN4-l03CzHDf3au-cBU",
  authDomain: "otpapp18jun24.firebaseapp.com",
  databaseURL: "https://otpapp18jun24-default-rtdb.firebaseio.com",
  projectId: "otpapp18jun24",
  storageBucket: "otpapp18jun24.appspot.com",
  messagingSenderId: "890767304043",
  appId: "1:890767304043:web:33aad67eae2a164334d82e"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = getDatabase(app);

function Enquiry() {
  const [name, setName] = useState("");
  const [query, setQuery] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [final, setFinal] = useState(null);

  const configureCaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
        sendOtp();
        console.log("Recaptcha verified");
      },
      'defaultCountry': "IN"
    });
  }

  const sendOtp = (event) => {
    event.preventDefault();
    configureCaptcha();
    const phoneNumber = "+91" + phone;
    const appVerifier = window.recaptchaVerifier;

    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        setFinal(confirmationResult);
        alert("OTP sent");
      })
      .catch((error) => {
        console.error("Error during signInWithPhoneNumber", error);
        alert("Failed to send OTP, please try again.");
      });
  }

  const submitOtp = (event) => {
    event.preventDefault();
    if (!final) {
      alert("Please request OTP first.");
      return;
    }

    final.confirm(otp)
      .then((result) => {
        const date = new Date().toString();
        const recordName = `${name} --> ${date}`;
        const data = { name, phone, query, date };

        set(ref(db, "visitors/" + recordName), data)
          .then(() => {
            alert("We will call you in 2 hours");
            window.location.reload();
          })
          .catch((error) => {
            console.error("Error writing to database", error);
            alert("Failed to save data, please try again.");
          });
      })
      .catch((error) => {
        console.error("Error during OTP confirmation", error);
        alert("Invalid OTP, please try again.");
        window.location.reload();
      });
  }

  return (
    <center>
      <h1> Fill the form </h1>
      <form onSubmit={sendOtp}>
        <div id="sign-in-button"></div>
        <input type="text" placeholder="Enter your name" onChange={(event) => setName(event.target.value)} />
        <br /><br />
        <textarea placeholder="Enter your query" rows={3} cols={20} onChange={(event) => setQuery(event.target.value)} ></textarea>
        <br /><br />
        <input type="number" placeholder="Enter phone number" onChange={(event) => setPhone(event.target.value)} />
        <br /><br />
        <input type="submit" value="Send OTP" />
        <br /><br />
      </form>
      <form onSubmit={submitOtp}>
        <input type="number" placeholder="Enter OTP" onChange={(event) => setOtp(event.target.value)} />
        <br /><br />
        <input type="submit" value="Submit OTP" />
      </form>
    </center>
  );
}

export default Enquiry;
