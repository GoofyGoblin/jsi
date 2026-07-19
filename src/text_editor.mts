import { uploadSubcollection, getUploadedSubCollection } from "./saveConfigSettings.mts";
import { userSession } from "./userSession.mts";
import { downloadFile, nvimGenerator } from "./generator.mts";

const recordBtn = document.getElementById("record-btn") as HTMLElement;
const keyDisplay = document.getElementById("key-display") as HTMLElement;
const recordIcon: any = document.getElementById("recordicon");
const recordIconSlash: any = document.getElementById("recordicon-slash");
const sideNote = document.getElementById("side-note-text") as HTMLElement;
const sideNoteDoc = document.getElementById("side-note-doc") as HTMLElement;
const pluginCheckboxIds = {
  telescope: "telescope-check-box",
  treesitter: "tree-sitter-check-box",
  lualine: "lualine-plugin",
  nvimtree: "nvim-tree-plugin",
  undotree: "undotree-plugin",
};
const languageCheckboxIds = {
  c: "c-lang",
  haskell: "haskell-lang",
  python: "python-lang",
  typescript: "typescript-lang",
  cpp: "cpp-lang",
};
const telescopeCheckBox = document.getElementById(
  pluginCheckboxIds.telescope,
) as HTMLInputElement;
const treeSitterCheckBox = document.getElementById(
  pluginCheckboxIds.treesitter,
) as HTMLInputElement;
const lualineCheckBox = document.getElementById(
  pluginCheckboxIds.lualine,
) as HTMLInputElement;
const nvimTreeCheckBox = document.getElementById(
  pluginCheckboxIds.nvimtree,
) as HTMLInputElement;
const undotreeCheckBox = document.getElementById(
  pluginCheckboxIds.undotree,
) as HTMLInputElement;
const cCheckBox = document.getElementById(
  languageCheckboxIds.c,
) as HTMLInputElement;
const haskellCheckBox = document.getElementById(
  languageCheckboxIds.haskell,
) as HTMLInputElement;
const pythonCheckBox = document.getElementById(
  languageCheckboxIds.python,
) as HTMLInputElement;
const tsLangCheckBox = document.getElementById(
  languageCheckboxIds.typescript,
) as HTMLInputElement;
const cppCheckBox = document.getElementById(
  languageCheckboxIds.cpp,
) as HTMLInputElement;
const lineNumbersCheckBox = document.getElementById(
  "line-numbers-checkbox",
) as HTMLInputElement;
const relativeLineNumbersCheckBox = document.getElementById(
  "relative-line-numbers-checkbox",
) as HTMLInputElement;
const lineBreakCheckBox = document.getElementById(
  "line-break-checkbox",
) as HTMLInputElement;
const statusLineCheckBox = document.getElementById(
  "status-line-checkbox",
) as HTMLInputElement;
const gruvboxRadio = document.getElementById(
  "gruvbox-radio",
) as HTMLInputElement;
const catpuccinRadio = document.getElementById(
  "catpuccin-radio",
) as HTMLInputElement;
const tokyonightRadio = document.getElementById(
  "tokyonight-radio",
) as HTMLInputElement;
const onedarkRadio = document.getElementById(
  "onedark-radio",
) as HTMLInputElement;
let languages: Record<string, boolean> = {
  c: false,
  haskell: false,
  python: false,
  typescript: false,
  cpp: false,
};
let plugins: Record<string, boolean | string> = {
  colorscheme: "",
  lualine: false,
  nvimtree: false,
  telescope: false,
  treesitter: false,
  undotree: false,
};
let generalSettings: Record<string, boolean | string> = {
  leaderKey: " ",
  lineNumbers: false,
  relativeLineNumbers: false,
  lineBreak: false,
  statusLine: false,
};

const saveBtn = document.getElementById("save-btn")
const importBtn = document.getElementById("import-btn")
const fileInput = document.getElementById("import-input")
const downloadBtn = document.getElementById("download-btn")

let isRecording = false;

function formatVimKey(key: any) {
  if (key == " ") return '" "';
  if (key == "\\") return '"\\\\"';
  return `"${key}"`;
}

recordBtn.addEventListener("click", (e) => {
  e.preventDefault();
  isRecording = true;

  keyDisplay.textContent = "Press a key...";

  recordIcon.classList.toggle("hidden");
  recordIconSlash.classList.toggle("hidden");

  window.addEventListener("keydown", handleKeyPress, true);
});

function handleKeyPress(e: any) {
  if (!isRecording) return;
  e.preventDefault();
  e.stopPropagation();
  let pressedKey = e.key;
  if (pressedKey == " ") {
    keyDisplay.textContent = "Space";
  } else {
    keyDisplay.textContent = pressedKey;
  }

  generalSettings.leaderKey = formatVimKey(e.key);
  recordIcon.classList.toggle("hidden");
  recordIconSlash.classList.toggle("hidden");
  isRecording = false;
  window.removeEventListener("keydown", handleKeyPress, true);
}

sideNote.addEventListener("click", (e) => {
  e.preventDefault();
  sideNoteDoc.classList.toggle("hidden");
});

function checkBoxCheck(event: any, stateObj: any, key?: string) {
  if (key !== undefined) {
    stateObj[key] =
      event.target.type === "radio" ? event.target.value : event.target.checked;
  } else {
    if (event.target.checked) {
      stateObj = true;
    } else {
      stateObj = false;
    }
  }
  console.log(generalSettings, plugins, languages);
}

const pluginCheckBoxes = new Map([
  [telescopeCheckBox, "telescope"],
  [treeSitterCheckBox, "treesitter"],
  [nvimTreeCheckBox, "nvimtree"],
  [lualineCheckBox, "lualine"],
  [undotreeCheckBox, "undotree"],
  [gruvboxRadio, "colorscheme"],
  [catpuccinRadio, "colorscheme"],
  [tokyonightRadio, "colorscheme"],
  [onedarkRadio, "colorscheme"],
])

const languagesCheckBoxes = new Map([
  [cCheckBox, "c"],
  [haskellCheckBox, "haskell"],
  [pythonCheckBox, "python"],
  [tsLangCheckBox, "typescript"],
  [cppCheckBox, "cpp"],
])

const generalSettingsCheckBoxes = new Map([
  [lineBreakCheckBox, "lineBreak"],
  [lineNumbersCheckBox, "lineNumbers"],
  [relativeLineNumbersCheckBox, "relativeLineNumbers"],
  [statusLineCheckBox, "statusLine"],
])

function checkBoxAddEventListener(element: any, string: any, type: any) {
  element.addEventListener("change", (e: any) => {
    checkBoxCheck(e, type, string)
  })
}

function callElementMaps(map: any, type: any) {
  for (const [key, value] of map) {
    checkBoxAddEventListener(key, value, type)
  }
}

callElementMaps(pluginCheckBoxes, plugins)
callElementMaps(languagesCheckBoxes, languages)
callElementMaps(generalSettingsCheckBoxes, generalSettings)

saveBtn?.addEventListener("click", (e) => {
  e.preventDefault();
  const userId = JSON.parse(localStorage.getItem("userId") as any);
  uploadSubcollection(userId, {
    editorName: "nvim",
    generalSettings,
    languages,
    plugins,
  }, "editor" )
})

function restoreSavedConfiguration(checkBoxes: HTMLInputElement, checkBoxesType: string, userConfig: any, type: string) {
  if (type == "generalSettings") {
    for (const [key, value] of Object.entries(userConfig)) {
      if (checkBoxesType.includes(key)) {
        checkBoxes.checked = value as any;
      }
      userConfig.leaderKey == " " ? keyDisplay.textContent = "Space" : keyDisplay.textContent = userConfig.leaderKey;
    }
    generalSettings = userConfig;
    return;
  }

  if (type == "languages") {
    for (const [key, value] of Object.entries(userConfig)) {
      if (checkBoxesType.includes(key)) {
        checkBoxes.checked = value as any;
      }
    }
    languages = userConfig
    return;
  }

  if (type == "plugins") {
    for (const [key, value] of Object.entries(userConfig)) {
      if (checkBoxesType.includes(key)) {
        checkBoxes.checked = value as any;
      }
    }
    plugins = userConfig
    return;
  }
}

function callRestoreSavedConfiguration(map: any, userConfig: any, type: any) {
  for (const [key, value] of map) {
    restoreSavedConfiguration(key, value, userConfig, type)
  }
}

async function restoreUserConfiguration(importedJson?: any) {
  const userInfo = JSON.parse(localStorage.getItem(userSession.sessionKey) as any)
  if (!userInfo) {
    return
  }
  const userId = JSON.parse(localStorage.getItem("userId") as string);
  const configType = "editor"
  await getUploadedSubCollection(userId, configType);
  let userConfig = JSON.parse(localStorage.getItem("user_config") as any)
  if (importedJson) {
    userConfig = JSON.parse(importedJson);
  }
  callRestoreSavedConfiguration(generalSettingsCheckBoxes, userConfig.generalSettings, "generalSettings")
  callRestoreSavedConfiguration(languagesCheckBoxes, userConfig.languages, "languages")
  callRestoreSavedConfiguration(pluginCheckBoxes,  userConfig.plugins, "plugins")
}
restoreUserConfiguration();


importBtn?.addEventListener("click", (e) => {
  e.preventDefault();
  fileInput?.click();
})

fileInput?.addEventListener('change', (e: any) => {
  const files = e.target.files;

  if (files.length > 0) {
    const file = files[0];
    const reader = new FileReader();

    reader.readAsText(file);
    reader.onload = (e: any) => {
      restoreUserConfiguration(e.target.result)
    }
  } else {
    return
  }
})

downloadBtn?.addEventListener("click", (e: any) => {
  e.preventDefault();
  const userConfig = localStorage.getItem("user_config") as any;
  nvimGenerator(JSON.parse(userConfig))
  const cleansedJson = userConfig.replace(/\u00a0/g, ' ');
  downloadFile(cleansedJson, "generatedJson.json")
})



// assign the local storage variables if page gets reloaded
if (window.performance) {
  const [navigationEntry] = performance.getEntriesByType('navigation') as any;

  if (navigationEntry && navigationEntry.type === 'reload') {
    const userConfig = JSON.parse(localStorage.getItem("user_config") as any)
    plugins = userConfig.plugins;
    generalSettings = userConfig.generalSettings;
    languages = userConfig.languages;
  }
}
