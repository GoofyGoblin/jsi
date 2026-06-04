const logoutBtn = document.getElementById("logout_btn") as HTMLButtonElement

logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    redirectToLoginPage();
    localStorage.clear;
})

function redirectToLoginPage() {
    window.location.href = "login.html";
}
