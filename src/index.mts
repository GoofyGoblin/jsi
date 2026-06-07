import { userSession } from "./userSession.mts";

let lastTilingWMBox: HTMLElement;
let lastEditorBox: HTMLElement;
let currentTilingChoice: string | undefined;
let currentEditorChoice: string | undefined;
let boxClicked: boolean = true;
let editorBoxClicked: boolean = true;

const sourceBtn = document.getElementById(
  "sourcecode-btn",
) as HTMLButtonElement;
const accountBtn = document.getElementById("account-btn") as HTMLButtonElement;
const accountMenu = document.getElementById(
  "account-menu",
) as HTMLButtonElement;
const signOutBtn = document.getElementById("signout-btn") as HTMLButtonElement;
const usernameInfo = document.getElementById("username-info") as HTMLElement;

const hyprlandBox = document.getElementById("hyprland_box") as HTMLElement;
const swayBox = document.getElementById("sway_box") as HTMLElement;
const i3Box = document.getElementById("i3_box") as HTMLElement;
const bspwmBox = document.getElementById("bspwm_box") as HTMLElement;

const nvimBox = document.getElementById("neovim_box") as HTMLElement;
const emacsBox = document.getElementById("emacs_box") as HTMLElement;
const codeBox = document.getElementById("code_box") as HTMLElement;
const hxBox = document.getElementById("helix_box") as HTMLElement;

const submitBtn = document.getElementById("submit_btn") as HTMLElement;

sourceBtn.addEventListener("click", () => {
  window.open("https://github.com/GoofyGoblin/jsi");
});

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

const userSesh = JSON.parse(
  localStorage.getItem(userSession.sessionKey) as any,
);

usernameInfo.innerText = userSesh.username;

interface user_option {
  tilingWM: string | undefined;
  editor: string | undefined;
}

function onTilingWMBoxClick() {
  hyprlandBox.addEventListener("click", (e) => {
    e.preventDefault();
    currentTilingChoice = "hyprland";
    addTilingBoxBorder(hyprlandBox);
  });
  swayBox.addEventListener("click", (e) => {
    e.preventDefault();
    currentTilingChoice = "sway";
    addTilingBoxBorder(swayBox);
  });
  i3Box.addEventListener("click", (e) => {
    e.preventDefault();
    currentTilingChoice = "i3";
    addTilingBoxBorder(i3Box);
  });
  bspwmBox.addEventListener("click", (e) => {
    e.preventDefault();
    currentTilingChoice = "bspwm";
    addTilingBoxBorder(bspwmBox);
  });
}
onTilingWMBoxClick();

function onEditorBoxClick() {
  nvimBox.addEventListener("click", (e) => {
    e.preventDefault();
    currentEditorChoice = "nvim";
    addEditorBoxBorder(nvimBox);
  });
  // emacsBox.addEventListener("click", (e) => {
  //   e.preventDefault();
  //   addEditorBoxBorder(emacsBox);
  //   currentEditorChoice = "emacs";
  // });
  // codeBox.addEventListener("click", (e) => {
  //   e.preventDefault();
  //   addEditorBoxBorder(codeBox);
  //   currentEditorChoice = "code";
  // });
  // hxBox.addEventListener("click", (e) => {
  //   e.preventDefault();
  //   addEditorBoxBorder(hxBox);
  //   currentEditorChoice = "hx";
  // });
}
onEditorBoxClick();

function addTilingBoxBorder(box: HTMLElement) {
  if (lastTilingWMBox && lastTilingWMBox != box) {
    lastTilingWMBox.classList.remove("border-primary/20");
    lastTilingWMBox.classList.remove("border");
  }

  box.classList.add("border");
  box.classList.add("border-primary/20");

  if (lastTilingWMBox == box) {
    if (boxClicked == false) {
      box.classList.add("border");
      box.classList.add("border-primary/20");
      boxClicked = true;
    } else {
      currentTilingChoice = undefined;
      box.classList.remove("border");
      box.classList.remove("border-primary/20");
      boxClicked = false;
    }
  }

  lastTilingWMBox = box;
}

function addEditorBoxBorder(box: HTMLElement) {
  if (lastEditorBox && lastEditorBox != box) {
    lastEditorBox.classList.remove("border-primary/20");
    lastEditorBox.classList.remove("border");
  }

  box.classList.add("border");
  box.classList.add("border-primary/20");

  if (lastEditorBox == box) {
    if (editorBoxClicked == false) {
      box.classList.add("border");
      box.classList.add("border-primary/20");
      editorBoxClicked = true;
    } else {
      currentEditorChoice = undefined;
      box.classList.remove("border");
      box.classList.remove("border-primary/20");
      editorBoxClicked = false;
    }
  }

  lastEditorBox = box;
}

submitBtn.addEventListener("click", () => {
  if (currentEditorChoice || currentTilingChoice) {
    addUserOption();
    return;
  }
  alert("Choose at least one option, an editor or a tiling window manager");
  return;
});

function addUserOption() {
  let userOption = {
    tilingWM: `${currentTilingChoice}`,
    editor: `${currentEditorChoice}`,
  };
  localStorage.setItem("userOption", JSON.stringify(userOption));
  checkIfLoggedIn(userOption);
}

function checkIfLoggedIn(userOption: user_option) {
  const userInfo = localStorage.getItem(userSession.sessionKey);
  if (!userInfo) {
    window.location.href = "login.html#";
    return;
  }
  sendUserToConfigPage(userOption);
}

function sendUserToConfigPage(userOption: user_option) {
  debugger;
  if (userOption.tilingWM == "undefined") {
    window.location.href = "texteditor_config_editor.html";
  } else {
    window.location.href = "tilingWM_config_editor.html";
  }
}
