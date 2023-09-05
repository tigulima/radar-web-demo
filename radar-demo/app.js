// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAW3hKiHcdrcyZh-TtWVesY0apKwhIWVTM",
    authDomain: "radar-demo-1f8be.firebaseapp.com",
    projectId: "radar-demo-1f8be",
    storageBucket: "radar-demo-1f8be.appspot.com",
    messagingSenderId: "410591281232",
    appId: "1:410591281232:web:f5965c6fed5bfefbd2d155",
};

// Initialize Firebase for authentication
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

console.log(app);

// Initialize Mikrotik and PopProtect path
const url_on = "http://10.0.0.33/alarme.htm?op=0&ativar=true&tdisp=10&trearm=5&trele=0";
const url_off = "http://10.0.0.33/alarme.htm?op=0&ativar=false&tdisp=10&trearm=5&trele=0";

// const url_test = "https://google.com";

const username = "admin";
const password = "Techmobi";

const headers = new Headers();
headers.append("Authorization", "Basic " + btoa(username + ":" + password));

// Get logs location
const log_card = document.getElementById("log");
console.log(log_card);

// Ports configuration switch
const port_switch = document.getElementById("port_switch");
port_switch.addEventListener("change", () => {
    if (port_switch.checked) {
        console.log("checked");
        log_card.innerHTML = log_card.innerHTML + "<br>...";
        fetch(url_on, {
            method: "GET",
            headers: headers,
        })
            .then((response) => response.text())
            .then((data) => {
                console.log("Data:", data); // Do something with the response
                log_card.innerHTML = log_card.innerHTML + "<br>" + data;
            })
            .catch((error) => {
                console.error("Error:", error);
                log_card.innerHTML = log_card.innerHTML + "<br>" + error;
            });
    } else {
        console.log("unchecked");
        fetch(url_off, {
            method: "GET",
            headers: headers,
        })
            .then((response) => response.text())
            .then((data) => {
                console.log(data); // Do something with the response
                log_card.innerHTML = log_card.innerHTML + "<br>" + data;
            })
            .catch((error) => {
                console.error("Error:", error);
                log_card.innerHTML = log_card.innerHTML + "<br>" + error;
            });
    }
});

const signupForm = document.querySelector("#signup-form");
console.log("signupForm:", signupForm);
signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.querySelector("#signup-email").value;
    const password = document.querySelector("#signup-password").value;

    console.log("data:", email, password);

    try {
        await signInWithEmailAndPassword(auth, email, password);
        // User successfully signed up
        console.log("User successfully signed up");
        window.location.replace("./pages/home.html");
    } catch (error) {
        console.log("user sign in ERROR");
        // Handle error
        console.error(error);
    }
});
