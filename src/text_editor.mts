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
const languages: Record<string, boolean> = {
  c: false,
  haskell: false,
  python: false,
  typescript: false,
  cpp: false,
};
const plugins: Record<string, boolean | string> = {
  colorscheme: "",
  lualine: false,
  nvimtree: false,
  telescope: false,
  treesitter: false,
  undotree: false,
};
const generalSettings: Record<string, boolean | string> = {
  leaderKey: " ",
  lineNumbers: false,
  relativeLineNumbers: false,
  lineBreak: false,
  statusLine: false,
};
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

telescopeCheckBox.addEventListener("change", (e: any) =>
  checkBoxCheck(e, plugins, "telescope"),
);

treeSitterCheckBox.addEventListener("change", (e: any) =>
  checkBoxCheck(e, plugins, "treesitter"),
);

lualineCheckBox.addEventListener("change", (e: any) =>
  checkBoxCheck(e, plugins, "lualine"),
);

nvimTreeCheckBox.addEventListener("change", (e: any) =>
  checkBoxCheck(e, plugins, "nvimtree"),
);

undotreeCheckBox.addEventListener("change", (e: any) =>
  checkBoxCheck(e, plugins, "undotree"),
);

cCheckBox.addEventListener("change", (e: any) =>
  checkBoxCheck(e, languages, "c"),
);

haskellCheckBox.addEventListener("change", (e: any) =>
  checkBoxCheck(e, languages, "haskell"),
);

pythonCheckBox.addEventListener("change", (e: any) =>
  checkBoxCheck(e, languages, "python"),
);

tsLangCheckBox.addEventListener("change", (e: any) =>
  checkBoxCheck(e, languages, "typescript"),
);

cppCheckBox.addEventListener("change", (e: any) =>
  checkBoxCheck(e, languages, "cpp"),
);

lineNumbersCheckBox.addEventListener("change", (e: any) =>
  checkBoxCheck(e, generalSettings, "lineNumbers"),
);

relativeLineNumbersCheckBox.addEventListener("change", (e: any) =>
  checkBoxCheck(e, generalSettings, "relativeLineNumbers"),
);

lineBreakCheckBox.addEventListener("change", (e: any) =>
  checkBoxCheck(e, generalSettings, "lineBreak"),
);

statusLineCheckBox.addEventListener("change", (e: any) =>
  checkBoxCheck(e, generalSettings, "statusLine"),
);

gruvboxRadio.addEventListener("change", (e: any) =>
  checkBoxCheck(e, plugins, "colorscheme"),
);

catpuccinRadio.addEventListener("change", (e: any) =>
  checkBoxCheck(e, plugins, "colorscheme"),
);

tokyonightRadio.addEventListener("change", (e: any) =>
  checkBoxCheck(e, plugins, "colorscheme"),
);

onedarkRadio.addEventListener("change", (e: any) =>
  checkBoxCheck(e, plugins, "colorscheme"),
);
