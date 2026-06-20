import { userSession } from "./userSession.mts";

const sourceBtn = document.getElementById(
  "sourcecode-btn",
) as HTMLButtonElement;
const accountBtn = document.getElementById("account-btn") as HTMLButtonElement;
const accountMenu = document.getElementById(
  "account-menu",
) as HTMLButtonElement;
const signOutBtn = document.getElementById("signout-btn") as HTMLButtonElement;
const usernameInfo = document.getElementById("username-info") as HTMLElement;

accountBtn.addEventListener("click", (e) => {
  e.preventDefault();
  accountMenu.classList.toggle("hidden");
});

signOutBtn.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.removeItem(userSession.sessionKey);
  localStorage.removeItem(userSession.userInfoKey);
  window.location.href = "login.html";
});

function getUserSession() {
  const userSesh = JSON.parse(
    localStorage.getItem(userSession.sessionKey) as any,
  );

  if (!userSesh) {
    usernameInfo.innerText = "not logged in";
    return;
  }

  usernameInfo.innerText = userSesh.username;
}
getUserSession();
