/* firebase stuff */
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { app, db, auth } from "./firebase.config.ts"
import { createUserWithEmailAndPassword } from "firebase/auth"


const usernameRegisterInput = document.getElementById("register_username") as HTMLInputElement;
const emailRegisterInput = document.getElementById("register_email") as HTMLInputElement;
const passwordRegister = document.getElementById("register_password") as HTMLInputElement;
const confirmPasswordRegister = document.getElementById("register_confirm_password") as HTMLInputElement;
const submitBtnRegister = document.getElementById("register_submit_btn") as HTMLButtonElement;

interface regsiterUser {
    username: string,
    email: string,
    password: string,
    confirm_password: string
}

function passSubmittedElements(submitBtn: HTMLButtonElement,
    usernameInput: HTMLInputElement,
    emailInput: HTMLInputElement,
    password: HTMLInputElement,
    confirmPassword: HTMLInputElement) {


    submitBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const userObj: regsiterUser =
        {
            username: usernameInput.value,
            email: emailInput.value,
            password: password.value,
            confirm_password: confirmPassword.value
        }
        checkSubmittedElements(userObj);
    })

}

passSubmittedElements(submitBtnRegister, usernameRegisterInput, emailRegisterInput, passwordRegister, confirmPasswordRegister);

function checkSubmittedElements(userObj: regsiterUser) {
    if (!userObj.username || !userObj.email || !userObj.password || !userObj.confirm_password) {
        alert("Invalid credentials");
        return
    }
    createNewUserInAuth(userObj);
    sendSubmittedElements(userObj);
}

function createNewUserInAuth(userObj: regsiterUser) {
    createUserWithEmailAndPassword(auth, userObj.email, userObj.username)
        .then(userCredentials => {
            alert('Registered succesfully');
        })
        .catch(e => {
            alert(e.message);
        })

}

async function sendSubmittedElements(userObj: regsiterUser) {
    try {
        const docRef = await addDoc(collection(db, "users"), {
            activeConfigId: "none",
            createdAt: serverTimestamp(),
            email: userObj.email,
            role: "user",
            username: userObj.username
        })
        console.log("Document written with id: ", docRef.id)
        sendUserToLoginPage()
    } catch (e) {
        console.log("Error. problem when adding user to db", e)
    }
}

function sendUserToLoginPage() {
    window.location.href = "login.html"
}
