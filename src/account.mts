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
const settingsBtn = document.getElementById(
  "settings-btn",
) as HTMLButtonElement;

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

function addAccountDetailsPopup() {
  const container = document.createElement("div");
  container.className =
    "flex justify-center items-center z-9999 fixed inset-0 bg-black/50 backdrop-blur-sm hidden";
  container.id = "account-settings-container";
  container.innerHTML = `
    <div
        class="bg-white dark:bg-monolith-surface rounded-md flex flex-col gap-3 dark:text-white p-3"
    >
      <div class="flex justify-between">
        <label class="font-headline font-bold text-2xl dark:text-white"
            >Account details</label
        >
        <button id="close-container-btn" class="">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 dark:text-white">
            <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </button>
      </div>
        <label class="font-headline text-gray-500 text-[12px]"
            >Here you can change your account's details</label
        >
        <div class="grid grid-cols-2 gap-3">
            <div class="flex items-center">
                <label
                    class="font-headline text-[14px] font-bold dark:text-white"
                    >Email:</label
                >
            </div>
            <div class="flex items-center">
                <input
                    id="email-replace-input"
                    placeholder="stuff"
                    class="font-headline border-none bg-gray-100 rounded-sm no-input-number-spin dark:bg-gray-700 h-8 mr-8"
                />
                <button
                    class="text-[12px] text-blue-400 uppercase"
                    id="email-edit-btn"
                >
                    edit
                </button>
            </div>
            <div class="contents" id="change-password-container">
              <div class="flex items-center">
                  <label
                      class="font-headline text-[14px] font-bold dark:text-white"
                      >Password:</label
                  >
              </div>
              <div class="flex items-center"">
                  <button
                      class="bg-surface-tint font-headline text-[14px] p-2 rounded-sm no-input-number-spin dark:bg-gray-700 dark:text-white"
                      id="change-password-btn"
                  >
                      Change password
                  </button>
              </div>
            </div>
            <div class="contents hidden" id="change-password-form">
                <div class="flex items-center">
                    <label
                        class="font-headline text-[14px] font-bold dark:text-white"
                        >Old password:</label
                    >
                </div>
                <div class="flex items-center">
                    <input
                        id="old-password-input"
                        type="password"
                        class="font-headline border-none bg-gray-100 rounded-sm no-input-number-spin dark:bg-gray-700 h-8 mr-8"
                    />
                    <button
                        class="text-[12px] text-blue-400 uppercase"
                        id="email-edit-btn"
                    >
                        edit
                </div>
                <div class="flex items-center">
                    <label
                        class="font-headline text-[14px] font-bold dark:text-white"
                        >New password:</label
                    >
                </div>
                <div class="flex items-center">
                    <input
                        id="new-password-input"
                        type="password"
                        class="font-headline border-none bg-gray-100 rounded-sm no-input-number-spin dark:bg-gray-700 h-8 mr-8"
                    />
                    <button
                        class="text-[12px] text-blue-400 uppercase"
                        id="new-password-edit-btn"
                    >
                        edit
                </div>
                <div class="flex items-center">
                    <label
                        class="font-headline text-[14px] font-bold dark:text-white"
                        >Re-enter new password:</label
                    >
                </div>
                <div class="flex items-center">
                    <input
                        id="re-enter-password-input"
                        type="password"
                        class="font-headline border-none bg-gray-100 rounded-sm no-input-number-spin dark:bg-gray-700 h-8 mr-8"
                    />
                    <button
                        class="text-[12px] text-blue-400 uppercase"
                        id="password-edit-btn"
                    >
                        edit
                </div>
            </div>
        </div>
    </div>
    `;
  document.body.append(container);
  console.log("appened?");
}
addAccountDetailsPopup();

const accountSettingsContainer = document.getElementById(
  "account-settings-container",
);
const emailReplaceInput = document.getElementById("email-replace-input");
const emailEditBtn = document.getElementById("email-edit-btn");
const closeContainerBtn = document.getElementById("close-container-btn");
const changePasswordBtn = document.getElementById("change-password-btn");
const changePasswordForm = document.getElementById("change-password-form");
const changePasswordContainer = document.getElementById(
  "change-password-container",
);

settingsBtn.addEventListener("click", (e) => {
  e.preventDefault();
  accountSettingsContainer?.classList.toggle("hidden");
});

closeContainerBtn?.addEventListener("click", (e) => {
  e.preventDefault();
  accountSettingsContainer?.classList.toggle("hidden");
});

changePasswordBtn?.addEventListener("click", (e) => {
  e.preventDefault();
  changePasswordForm?.classList.toggle("hidden");
  changePasswordContainer?.classList.toggle("hidden");
});
