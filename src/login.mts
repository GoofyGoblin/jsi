import { auth, db } from "./firebase.config.ts";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const emailInput = document.getElementById("login_email") as HTMLInputElement;
const password = document.getElementById("login_password") as HTMLInputElement;
const submitBtn = document.getElementById("login_submit_button") as HTMLButtonElement;


interface loginUser {
    email: string,
    password: string
}

function passSubmittedElementsWhenClicked(submitBtn: HTMLButtonElement,
    emailInput: HTMLInputElement,
    password: HTMLInputElement) {


    submitBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const userObj: loginUser =
        {
            email: emailInput.value,
            password: password.value
        }
        checkSubmittedElements(userObj);
    })

}

passSubmittedElementsWhenClicked(submitBtn, emailInput, password);

function checkSubmittedElements(userObj: loginUser) {
    signInWithEmailAndPassword(auth, userObj.email, userObj.password)
        .then(userCredentials => {
            alert('Logged in succesfully');
            getUserInfoFromDb(userCredentials.user);
        })
        .catch(e => {
            alert(e.message);
        })
}

function getUserInfoFromDb(userCreds: any) {
    const docRef = doc(db, "users", userCreds.uid);
    const docSnap = getDoc(docRef);
    docSnap.then((doc) => {
        if (doc.exists()) {
            sessionStorage.setItem("user", JSON.stringify(doc.data()));
            sendUserToHomePage();
        } else {
            console.log("No such document!");
        }
    })
}

function sendUserToHomePage() {
    window.location.href = "index.html";
}
