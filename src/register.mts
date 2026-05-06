/* firebase stuff */
import { collection, addDoc } from "firebase/firestore"


const usernameRegisterInput= document.getElementById("register_username") as HTMLInputElement;
const emailRegisterInput = document.getElementById("register_email") as HTMLInputElement;
const passwordRegister = document.getElementById("register_password") as HTMLInputElement;
const confirmPasswordRegister = document.getElementById("register_confirm_password") as HTMLInputElement;
const submitBtnRegister = document.getElementById("register_submit_btn") as HTMLButtonElement;

interface regsiterUser
{
    username: string,
    email: string,
    password: string,
    confirm_password: string
}


interface loginUser
{
    username: string,
    password: string
}

namespace registerFuncs
{

    function passSubmittedElements(submitBtn: HTMLButtonElement,
                                   usernameInput: HTMLInputElement,
                                   emailInput: HTMLInputElement,
                                   password: HTMLInputElement,
                                   confirmPassword: HTMLInputElement)
    {


        submitBtn.addEventListener("click", (e) =>
        {
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

    function checkSubmittedElements(userObj: regsiterUser)
    {
        if (!userObj.username || !userObj.email || !userObj.password || !userObj.confirm_password)
        {
            alert("Invalid credentials");
            return
        }
        sendSubmittedElements(userObj);
    }
}

export async function sendSubmittedElements(userObj: regsiterUser | loginUser)
{
    /*
    const res = fetch("url cua server",
    {
        method: POST,
        body: JSON.stringify(userObj)
    })
    */
    alert("Sent");
    return
}
