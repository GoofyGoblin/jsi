const themeChangerBtn = document.getElementById(
  "theme-changer",
) as HTMLButtonElement;

let userTheme = "light";

themeChangerBtn.onclick = () => {
  if (userTheme == "light") userTheme = "dark";
  if (userTheme == "dark") userTheme = "light";
  localStorage.setItem("user_theme", JSON.stringify(userTheme));
};
