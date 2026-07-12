import { auth, db } from "./firebase.config.ts";
import {
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { signInWithGoogle } from "./auth.mts";
import { userSession } from "./userSession.mts";

const emailInput = document.getElementById("login_email") as HTMLInputElement;
const password = document.getElementById("password_input") as HTMLInputElement;
const submitBtn = document.getElementById(
  "login_submit_btn",
) as HTMLButtonElement;

const googleBtn = document.getElementById("google_btn") as HTMLButtonElement;
const forgotPasswordBtn = document.getElementById("forgot-password-btn") as HTMLButtonElement;

interface loginUser {
  email: string;
  password: string;
}

function passSubmittedElementsWhenClicked(
  submitBtn: HTMLButtonElement,
  emailInput: HTMLInputElement,
  password: HTMLInputElement,
) {
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const userObj: loginUser = {
      email: emailInput.value,
      password: password.value,
    };
    checkSubmittedElements(userObj);
  });
}

passSubmittedElementsWhenClicked(submitBtn, emailInput, password);

function checkSubmittedElements(userObj: loginUser) {
  signInWithEmailAndPassword(auth, userObj.email, userObj.password)
    .then((userCredentials) => {
      alert("Logged in succesfully");
      getUserInfoFromDb(userCredentials.user);
    })
    .catch((e) => {
      alert(e.message);
    });
}

function getUserInfoFromDb(userCreds: any) {
  const docRef = doc(db, "users", userCreds.uid);
  const docSnap = getDoc(docRef);
  const user = userCreds.user;
  docSnap.then((doc) => {
    if (doc.exists()) {
      localStorage.setItem(userSession.sessionKey, JSON.stringify(doc.data()));
      localStorage.setItem("userId", JSON.stringify(userCreds.uid));
      localStorage.setItem(
        "isEmailVerified",
        JSON.stringify(userCreds.emailVerified),
      );
      localStorage.setItem("userCredentials", JSON.stringify(userCreds));
      sendUserToHomePage();
    } else {
      console.log("No such document!");
    }
  });
}

googleBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const isSignedIn = await signInWithGoogle("user");
  localStorage.setItem("loggedInWithGoogle", JSON.stringify(true));

  if (isSignedIn) {
    alert("Logged in succesfully");
    window.location.href = "index.html";
  }
});

forgotPasswordBtn.addEventListener("click", (e) => {
  if (!emailInput.value) {
    alert("Please type in your email in the email box")
    return
  }
  sendPasswordResetEmail(auth, emailInput.value).then(() => {
    alert("Please check your email inbox for a password reset")
  }).catch((e: any) => {
    console.log(e);
    console.log(e.message);
    console.log(e.code);
  })
})

function sendUserToHomePage() {
  window.location.href = "index.html";
}
