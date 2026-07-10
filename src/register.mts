/* firebase stuff */
import { collection, setDoc, serverTimestamp, doc } from "firebase/firestore";
import { app, db, auth } from "./firebase.config.ts";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  sendEmailVerification,
} from "firebase/auth";
import type { User } from "firebase/auth/web-extension";

import { signInWithGoogle } from "./auth.mts";

const provider = new GoogleAuthProvider();

const usernameRegisterInput = document.getElementById(
  "register_username",
) as HTMLInputElement;
const emailRegisterInput = document.getElementById(
  "register_email",
) as HTMLInputElement;
const passwordInput = document.getElementById(
  "password_input",
) as HTMLInputElement;
const confirmPasswordRegister = document.getElementById(
  "confirm_input",
) as HTMLInputElement;
const submitBtnRegister = document.getElementById(
  "register_submit_btn",
) as HTMLButtonElement;
const googleBtn = document.getElementById("google_btn") as HTMLButtonElement;

const weakPasswordUI = document.getElementById("weak_password") as HTMLElement;
const somethingsWrongUI = document.getElementById(
  "somethings_wrong",
) as HTMLElement;
const emailInUseUI = document.getElementById("email_in_use") as HTMLElement;

interface regsiterUser {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
}

function passSubmittedElements(
  submitBtn: HTMLButtonElement,
  usernameInput: HTMLInputElement,
  emailInput: HTMLInputElement,
  password: HTMLInputElement,
  confirmPassword: HTMLInputElement,
) {
  submitBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    const userObj: regsiterUser = {
      username: usernameInput.value,
      email: emailInput.value,
      password: password.value,
      confirm_password: confirmPassword.value,
    };
    weakPasswordUI.classList.add("hidden");
    somethingsWrongUI.classList.add("hidden");
    emailInUseUI.classList.add("hidden");
    checkSubmittedElements(userObj);
  });
}

passSubmittedElements(
  submitBtnRegister,
  usernameRegisterInput,
  emailRegisterInput,
  passwordInput,
  confirmPasswordRegister,
);

function checkSubmittedElements(userObj: regsiterUser) {
  if (
    !userObj.username ||
    !userObj.email ||
    !userObj.password ||
    !userObj.confirm_password
  ) {
    alert("Invalid credentials");
    return;
  }
  createNewUserInAuth(userObj);
}

export async function emailVerification(userCreds: any, alertString?: string) {
  try {
    const user = userCreds.user;
    await sendEmailVerification(user);
    alert(alertString);
  } catch (e: any) {
    console.log("error signing up", e.message);
  }
}

function createNewUserInAuth(userObj: regsiterUser) {
  createUserWithEmailAndPassword(auth, userObj.email, userObj.password)
    .then((userCredentials) => {
      alert("Registered succesfully");
      emailVerification(
        userCredentials,
        "Account created, please check your email inbox for confirmation",
      );
      sendSubmittedElements(userObj, userCredentials);
    })
    .catch((e) => {
      console.log(e.message);
      checkFirebaseAuthError(e.message);
      return;
    });
}

async function sendSubmittedElements(userObj: regsiterUser, userCreds: any) {
  try {
    const docRef = collection(db, "users");
    const user = {
      activeConfigId: "none",
      createdAt: serverTimestamp(),
      email: userObj.email,
      role: "user",
      username: userObj.username,
    };
    await setDoc(doc(docRef, userCreds.user.uid), user);
    sendUserToLoginPage();
  } catch (e) {
    console.log("Error. problem when adding user to db", e);
    return;
  }
}

// Google sign in
function googleBtnClicked() {
  googleBtn?.addEventListener("click", async (e) => {
    e.preventDefault();
    const isSignedIn = await signInWithGoogle("user");

    if (isSignedIn) {
      window.location.href = "index.html";
    }
  });
}
googleBtnClicked();

function sendUserToLoginPage() {
  window.location.href = "login.html";
}

function checkFirebaseAuthError(condition: string) {
  if (condition == "Firebase: Error (auth/email-already-in-use).") {
    emailInUseUI.classList.toggle("hidden");
    return;
  } else if (
    condition ==
    "Firebase: Password should be at least 6 characters (auth/weak-password)."
  ) {
    weakPasswordUI.classList.toggle("hidden");
    return;
  } else {
    somethingsWrongUI.classList.toggle("hidden");
    return;
  }
}
