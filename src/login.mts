import { auth } from "./firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";

const emailInput = document.getElementById("login_email") as HTMLInputElement;
const password = document.getElementById("login_password") as HTMLInputElement;
const submitBtn = document.getElementById("login_submit_btn") as HTMLButtonElement;


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
    if (!userObj.email || userObj.password) {
        alert("Invalid Credentials");
        return
    }
    signInWithEmailAndPassword(auth, userObj.email, userObj.password)
        .then(userCredentials => {
            alert("Logged in")
        })
        .catch(e => {
            alert(e.message);
        })
}


