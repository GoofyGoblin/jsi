import { userSession } from "./userSession.mts";

const logoutBtn = document.getElementById("logout_btn") as HTMLButtonElement;

logoutBtn.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.removeItem(userSession.sessionKey);
  redirectToLoginPage();
});

function redirectToLoginPage() {
  window.location.href = "login.html";
}
