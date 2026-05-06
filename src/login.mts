import { sendSubmittedElements } from "./register.mts";

const usernameInput= document.getElementById("login_username") as HTMLInputElement;
const password = document.getElementById("login_password") as HTMLInputElement;
const submitBtn = document.getElementById("login_submit_btn") as HTMLButtonElement;


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

namespace loginFuncs
{
    function passSubmittedElementsWhenClicked(submitBtn: HTMLButtonElement,
                                              usernameInput: HTMLInputElement,
                                              password: HTMLInputElement)
    {


        submitBtn.addEventListener("click", (e) =>
        {
            e.preventDefault();
            const userObj: loginUser =
            {
                username: usernameInput.value,
                password: password.value
            }
            checkSubmittedElements(userObj);
        })

    }

    passSubmittedElementsWhenClicked(submitBtn, usernameInput, password);

    function checkSubmittedElements(userObj: loginUser)
    {
        if (!userObj.username || userObj.password)
        {
            alert("Invalid credentials");
            return
        }
        sendSubmittedElements(userObj);
    }
}

