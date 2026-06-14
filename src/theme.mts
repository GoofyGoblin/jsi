const themeChangerBtn = document.getElementById(
  "theme-changer",
) as HTMLButtonElement;

let userTheme = JSON.parse(localStorage.getItem("user_theme") as any);

if (!userTheme) userTheme = "light";

let themeToggled = false;

themeChangerBtn.addEventListener("click", (e) => {
  document.body.classList.toggle(`dark`);
  document.body.classList.toggle(`bg-background`);
  document.body.classList.toggle(`bg-surface-bg`);
  themeToggled = true;

  if (userTheme == "light") {
    userTheme = "dark";
    localStorage.setItem("user_theme", JSON.stringify(userTheme));
    return;
  }

  if (userTheme == "dark") {
    userTheme = "light";
    localStorage.setItem("user_theme", JSON.stringify(userTheme));
    return;
  }
});

if (userTheme == "dark" && themeToggled == false) {
  document.body.classList.toggle(`dark`);
  document.body.classList.toggle(`bg-background`);
  document.body.classList.toggle(`bg-surface-bg`);
}
