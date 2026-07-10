import { userSession } from "./userSession.mts";
import { emailVerification } from "./register.mts";

const userInfo = userSession.getSession();
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
                <div
                    class="relative bg-white dark:bg-surface-container-highest rounded-sm flex flex-row items-center w-[20rem] mr-8"
                >
                    <input
                        id="email-replace-input"
                        placeholder="${userInfo.email}"
                        class="w-92 border-none rounded-sm dark:bg-surface-container-highest dark:text-white focus:ring-0"
                        disabled
                    />
                </div>
                <button
                    class="text-[12px] text-blue-400 uppercase"
                    id="email-edit-btn"
                >
                    edit
                </button>
                <button
                    class="text-[12px] text-blue-400 uppercase mr-4 hidden"
                    id="email-cancel-btn"
                >
                    cancel
                </button>
                <button
                    class="text-[12px] text-red-300 uppercase hidden"
                    id="email-save-btn"
                >
                    save
                </button>
            </div>
            <div class="flex items-center">
                <label
                    class="font-headline text-[14px] font-bold dark:text-white"
                    >Username:</label
                >
            </div>
            <div class="flex items-center">
              <div
                  class="relative bg-white dark:bg-surface-container-highest rounded-sm flex flex-row items-center w-[20rem] mr-8"
              >
                  <input
                      id="username-replace-input"
                      placeholder="${userInfo.username}"
                      class="w-92 border-none rounded-sm dark:bg-surface-container-highest dark:text-white focus:ring-0"
                      disabled
                  />
              </div>
              <button
                  class="text-[12px] text-blue-400 uppercase"
                  id="username-edit-btn"
              >
                  edit
              </button>
              <button
                  class="text-[12px] text-blue-400 uppercase mr-4 hidden"
                  id="username-cancel-btn"
              >
                  cancel
              </button>
              <button
                  class="text-[12px] text-red-300 uppercase hidden"
                  id="username-save-btn"
              >
                  save
              </button>
            </div>
            <div class="contents hidden" id="verify-email-container">
              <div class="flex items-center">
                  <label
                      class="font-headline text-[14px] font-bold dark:text-white"
                      >Verify email:</label
                  >
              </div>
              <div class="flex items-center">
                <button
                    class="bg-surface-tint font-headline text-[14px] p-2 rounded-sm no-input-number-spin dark:bg-gray-700 dark:text-white"
                    id="verify-email-btn"
                >
                    Verify
                </button>
              </div>
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
                  <div
                      class="relative bg-white dark:bg-surface-container-highest rounded-sm flex flex-row items-center w-[20rem]"
                  >
                      <input
                          type="password"
                          name="password"
                          class="w-92 border-none rounded-sm dark:bg-surface-container-highest dark:text-white focus:ring-0"
                          id="old-password-input"
                          placeholder="••••••"
                          oninput="
                              this.value = this.value.replace(/\s/g, '')
                          "
                      />

                      <button id="password-peek-btn" class="mr-2">
                          <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="size-6 dark:text-on-background hidden"
                              id="eye-icon-open"
                          >
                              <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                              />
                              <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                              />
                          </svg>

                          <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="size-6 dark:text-on-background"
                              id="eye-icon-close"
                          >
                              <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                              />
                          </svg>
                      </button>
                  </div>
                </div>
                <div class="flex items-center">
                    <label
                        class="font-headline text-[14px] font-bold dark:text-white"
                        >New password:</label
                    >
                </div>
                <div class="flex items-center">
                  <div
                      class="relative bg-white dark:bg-surface-container-highest rounded-sm flex flex-row items-center w-[20rem]"
                  >
                      <input
                          type="password"
                          name="password"
                          class="w-92 border-none rounded-sm dark:bg-surface-container-highest dark:text-white focus:ring-0"
                          id="new-password-input"
                          placeholder="••••••"
                          oninput="
                              this.value = this.value.replace(/\s/g, '')
                          "
                      />

                      <button id="new-password-peek-btn" class="mr-2">
                          <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="size-6 dark:text-on-background hidden"
                              id="new-eye-icon-open"
                          >
                              <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                              />
                              <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                              />
                          </svg>

                          <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="size-6 dark:text-on-background"
                              id="new-eye-icon-close"
                          >
                              <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                              />
                          </svg>
                      </button>
                  </div>
                </div>
                <div class="flex items-center">
                    <label
                        class="font-headline text-[14px] font-bold dark:text-white"
                        >Re-enter new password:</label
                    >
                </div>
                <div class="flex items-center">
                  <div
                      class="relative bg-white dark:bg-surface-container-highest rounded-sm flex flex-row items-center w-[20rem]"
                  >
                      <input
                          type="password"
                          name="password"
                          class="w-92 border-none rounded-sm dark:bg-surface-container-highest dark:text-white focus:ring-0"
                          id="re-enter-password-input"
                          placeholder="••••••"
                          oninput="
                              this.value = this.value.replace(/\s/g, '')
                          "
                      />

                      <button id="re-enter-password-peek-btn" class="mr-2">
                          <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="size-6 dark:text-on-background hidden"
                              id="re-enter-eye-icon-open"
                          >
                              <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                              />
                              <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                              />
                          </svg>

                          <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="size-6 dark:text-on-background"
                              id="re-enter-eye-icon-close"
                          >
                              <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                              />
                          </svg>
                      </button>
                  </div>
                </div>
                <div class="contents" id="email-verification-container">
                  <div class="flex items-center">
                      <label
                          class="font-headline text-[14px] font-bold dark:text-white"
                          ></label
                      >
                  </div>
                  <div class="flex items-center"">
                      <button
                          class="bg-surface-tint font-headline text-[14px] p-2 rounded-sm no-input-number-spin dark:bg-gray-700 dark:text-white mr-4"
                          id="change-password-btn2"
                      >
                          Change password
                      </button>
                      <button
                          class="bg-surface-tint font-headline text-[14px] p-2 rounded-sm no-input-number-spin dark:bg-gray-700 dark:text-white mr-4"
                          id="cancel-btn"
                      >
                          Cancel
                      </button>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </div>
    <script>
    </script>
    `;
  document.body.append(container);
  console.log("appended?");
}
addAccountDetailsPopup();

const accountSettingsContainer = document.getElementById(
  "account-settings-container",
);
const closeContainerBtn = document.getElementById("close-container-btn");

// variables for email replacement
const emailReplaceInput = document.getElementById(
  "email-replace-input",
) as HTMLInputElement;
const emailEditBtn = document.getElementById("email-edit-btn");
const emailCancelBtn = document.getElementById("email-cancel-btn");
const emailSaveBtn = document.getElementById("email-save-btn");

// variables for username replacement
const usernameReplaceInput = document.getElementById(
  "username-replace-input",
) as HTMLInputElement;
const usernameEditBtn = document.getElementById("username-edit-btn");
const usernameCancelBtn = document.getElementById("username-cancel-btn");
const usernameSaveBtn = document.getElementById("username-save-btn");

//variables for password replacement
const changePasswordBtn = document.getElementById("change-password-btn");
const changePasswordForm = document.getElementById("change-password-form");
const changePasswordContainer = document.getElementById(
  "change-password-container",
);
const cancelPasswordChangeButton = document.getElementById("cancel-btn");

//variables for password replacement in the password replacment form
const oldPasswordInput = document.getElementById(
  "old-password-input",
) as HTMLInputElement;

const NewPasswordInput = document.getElementById(
  "new-password-input",
) as HTMLInputElement;

const ReEnterPasswordInput = document.getElementById(
  "re-enter-password-input",
) as HTMLInputElement;

// variables for email verification
const verifyEmailContainer = document.getElementById("verify-email-container");
const verifyEmailButton = document.getElementById("verify-email-btn");

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

cancelPasswordChangeButton?.addEventListener("click", (e) => {
  changePasswordContainer?.classList.toggle("hidden");
  changePasswordForm?.classList.toggle("hidden");
});

// email change section
emailEditBtn?.addEventListener("click", (e) => {
  emailReplaceInput.value = userInfo.email;
  emailReplaceInput.disabled = false;
  emailEditBtn.classList.toggle("hidden");
  emailCancelBtn?.classList.toggle("hidden");
  emailSaveBtn?.classList.toggle("hidden");
});

// username change section
usernameEditBtn?.addEventListener("click", (e) => {
  usernameReplaceInput.value = userInfo.email;
  usernameReplaceInput.disabled = false;
  usernameEditBtn.classList.toggle("hidden");
  usernameCancelBtn?.classList.toggle("hidden");
  usernameSaveBtn?.classList.toggle("hidden");
});

//password change section
function setupPasswordPeek(
  inputId: string,
  btnId: string,
  openId: string,
  closeId: string,
) {
  const input = document.getElementById(inputId) as HTMLInputElement;
  const btn = document.getElementById(btnId) as HTMLButtonElement;
  const open = document.getElementById(openId);
  const close = document.getElementById(closeId);
  if (btn) {
    btn.onclick = function () {
      open?.classList.toggle("hidden");
      close?.classList.toggle("hidden");
      if (input) {
        input.type = input.type === "password" ? "text" : "password";
      }
    };
  }
}
setupPasswordPeek(
  "old-password-input",
  "password-peek-btn",
  "eye-icon-open",
  "eye-icon-close",
);
setupPasswordPeek(
  "new-password-input",
  "new-password-peek-btn",
  "new-eye-icon-open",
  "new-eye-icon-close",
);
setupPasswordPeek(
  "re-enter-password-input",
  "re-enter-password-peek-btn",
  "re-enter-eye-icon-open",
  "re-enter-eye-icon-close",
);

function checkIfUserVerifiedEmail() {
  const isEmailVerified = JSON.parse(
    localStorage.getItem("isEmailVerified") as any,
  );

  if (!isEmailVerified) {
    verifyEmailContainer?.classList.remove("hidden");
  }
}
checkIfUserVerifiedEmail();

verifyEmailButton?.addEventListener("click", (e) => {
  const userCredentials = JSON.parse(
    localStorage.getItem("userCredentials") as any,
  );
  emailVerification(
    userCredentials,
    "Please check your email inbox for verification",
  );
});
