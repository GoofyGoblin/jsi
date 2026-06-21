// Monitor variables
const addNewMonitor = document.getElementById(
  "add-monitor",
) as HTMLButtonElement;
const monitorPrompt = document.getElementById("monitor-prompt") as HTMLElement;
const addNewMonitorBtn = document.getElementById(
  "add-new-monitor",
) as HTMLButtonElement;
const cancelNewMonitorBtn = document.getElementById(
  "cancel-new-monitor",
) as HTMLButtonElement;
const newMonitorDisplay = document.getElementById(
  "display-new-monitors",
) as HTMLElement;

const monitorName = document.getElementById("mon-name") as HTMLInputElement;
const monitorWidth = document.getElementById("mon-w") as HTMLInputElement;
const monitorHeight = document.getElementById("mon-h") as HTMLInputElement;
const monitorPosX = document.getElementById("mon-x") as HTMLInputElement;
const monitorPosY = document.getElementById("mon-y") as HTMLInputElement;
const monitorRefreshRate = document.getElementById(
  "mon-hz",
) as HTMLInputElement;

let monitorsArray: any = [];

//Color Picker variables
const focusedColor = document.getElementById(
  "focused-color",
) as HTMLInputElement;
const focusedInactiveColor = document.getElementById(
  "focused-inactive-color",
) as HTMLInputElement;
const inactiveColor = document.getElementById(
  "inactive-color",
) as HTMLInputElement;
const urgentColor = document.getElementById("urgent-color") as HTMLInputElement;

const focusedColorText = document.getElementById(
  "focused-color-text",
) as HTMLSpanElement;
const focusedInactiveColorText = document.getElementById(
  "focused-inactive-color-text",
) as HTMLSpanElement;
const inactiveColorText = document.getElementById(
  "inactive-color-text",
) as HTMLSpanElement;
const urgentColorText = document.getElementById(
  "urgent-color-text",
) as HTMLSpanElement;

// Keyboard variables
const repeatRateInput = document.getElementById(
  "kb-repeat-rate",
) as HTMLInputElement;

//Keybind variables
const addNewBindBtn = document.getElementById(
  "add-new-bind-btn",
) as HTMLElement;
const addNewKeybindPromptBtn = document.getElementById("add-new-keybind");
const cancelNewKeybindBtn = document.getElementById("cancel-new-keybind");
const keybindPrompt = document.getElementById("keybind-prompt") as HTMLElement;
const recordBtn = document.getElementById("record-btn") as HTMLElement;
const keyDisplay = document.getElementById("key-display") as HTMLElement;
const recordIcon: any = document.getElementById("recordicon");
const recordIconSlash: any = document.getElementById("recordicon-slash");
const keybindActionOptions: any = document.getElementById("kb-action-options");

let isRecording = false;

let colorPickerMap: Record<string, string> = {
  focused: "#ffffff",
  focusedInactive: "#ffffff",
  inactive: "#ffffff",
  urgent: "#ffffff",
};

let userConfig: any = {
  terminal: "",
  repeatRate: 0,
  monitors: [],
  colors: {
    focused: "#ffffff",
    focusedInactive: "#ffffff",
    inactive: "#ffffff",
    urgent: "#ffffff",
  },
  keyboardLayout: "",
  modkey: "",
  keybindings: [],
};

// Monitor functions
addNewMonitor.addEventListener("click", (e) => {
  e.preventDefault();
  monitorPrompt.classList.remove("hidden");
});

function addNewMonitorInputToDom(
  obj: Record<string, string | Array<string | number>>,
) {
  const container = document.createElement("div");
  container.className = "flex flex-row gap-6 mt-2";
  container.innerHTML = `
    <div>
        <label class="block text-sm font-medium mb-1"
            >Name</label
        >
        <div class="flex items-center gap-4">
            <span
                class="dark:text-white bg-[#f7f9fc] dark:bg-[#20262c] h-7 p-2 rounded-sm flex items-center w-full"
                >${obj.name}</span
            >
        </div>
    </div>

    <div>
        <label
            class="block text-sm font-medium mb-1"
            >Resolution</label
        >
        <div class="flex flex-row gap-4">
            <span
                class="dark:text-white bg-[#f7f9fc] dark:bg-[#20262c] h-7 p-2 rounded-sm flex items-center"
                >${obj.resolution[0]}</span
            >
            <span class="text-gray-500">x</span>
            <span
                class="dark:text-white bg-[#f7f9fc] dark:bg-[#20262c] h-7 p-2 rounded-sm flex items-center"
                >${obj.resolution[1]}</span
            >
        </div>
    </div>

    <div>
        <label
            class="block text-sm font-medium mb-1"
            >Refresh Rate</label
        >
        <div class="flex items-center gap-2">
            <span
                class="w-full dark:text-white bg-[#f7f9fc] dark:bg-[#20262c] h-7 p-2 rounded-sm flex items-center"
                >${obj.refreshRates}</span
            >
            <span class="text-gray-500 text-sm"
                >Hz</span
            >
        </div>
    </div>

    <div>
        <label
            class="block text-sm font-medium mb-1"
            >Position</label
        >
        <div class="flex items-center gap-2">
            <div class="flex flex-row gap-4">
                <span
                    class="dark:text-white bg-[#f7f9fc] dark:bg-[#20262c] h-7 p-2 rounded-sm flex items-center"
                    >${obj.position[0]}</span
                >
                <span class="text-gray-500">x</span>
                <span
                    class="dark:text-white bg-[#f7f9fc] dark:bg-[#20262c] h-7 p-2 rounded-sm flex items-center"
                    >${obj.position[1]}</span
                >
            </div>
        </div>
    </div>
    <div>
        <label class="block text-sm font-medium mb-1">⠀⠀⠀</label>
        <button
            class="bg-red-500 text-white rounded-sm pl-2 pr-2 mt-0.5"
            id="delete-monitorcfg-btn"
        >
            x
        </button>
    </div>
    `;

  newMonitorDisplay.append(container);
  const deleteBtn = document.getElementById("delete-monitorcfg-btn");

  deleteBtn?.addEventListener("click", (e) => {
    container.remove();
    userConfig.monitors = userConfig.monitors.filter(
      (m: any) => m.name !== obj.name,
    );
  });
}

addNewMonitorBtn.addEventListener("click", (e) => {
  e.preventDefault();
  monitorPrompt.classList.add("hidden");

  const newMonitorInput: Record<string, string | Array<any>> = {
    name: monitorName.value,
    resolution: [monitorWidth.value, monitorHeight.value],
    position: [monitorPosX.value, monitorPosY.value],
    refreshRates: monitorRefreshRate.value,
  };

  if (monitorsArray.find((e: any) => e.name == newMonitorInput.name)) {
    return;
  }

  userConfig.monitors.push(newMonitorInput);
  addNewMonitorInputToDom(newMonitorInput);
});

cancelNewMonitorBtn.addEventListener("click", (e) => {
  e.preventDefault();
  monitorPrompt.classList.add("hidden");
});

// Color picker functions

function getCurrentColorPickerValue(
  color: HTMLInputElement,
  display: HTMLSpanElement,
) {
  color.value = display.textContent;
}

function colorPickerChanger(
  color: HTMLInputElement,
  display: HTMLSpanElement,
  key: keyof typeof colorPickerMap,
) {
  color.addEventListener("input", (e: any) => {
    e.preventDefault();
    display.textContent = e.target.value;
    userConfig.colors[key] = e.target.value;
  });
}

getCurrentColorPickerValue(focusedColor, focusedColorText);
getCurrentColorPickerValue(focusedInactiveColor, focusedInactiveColorText);
getCurrentColorPickerValue(inactiveColor, inactiveColorText);
getCurrentColorPickerValue(urgentColor, urgentColorText);

colorPickerChanger(focusedColor, focusedColorText, "focused");
colorPickerChanger(
  focusedInactiveColor,
  focusedInactiveColorText,
  "focusedInactive",
);
colorPickerChanger(inactiveColor, inactiveColorText, "inactive");
colorPickerChanger(urgentColor, urgentColorText, "urgent");

//Updater
const updateConfigValue = <K extends keyof typeof userConfig>(
  userConf: typeof userConfig,
  key: K,
  value: (typeof userConfig)[K],
) => ({
  ...userConf,
  [key]: value,
});

// Terminal listeners
document.querySelectorAll('input[name="termAnswer"]').forEach((input) => {
  input.addEventListener("change", (e) => {
    const target = e.target as HTMLInputElement;
    if (target.checked) {
      userConfig = updateConfigValue(userConfig, "terminal", target.value);
      console.log(userConfig);
    }
  });
});

// Kb repeat rate listener

repeatRateInput?.addEventListener("input", (e) => {
  const target = e.target as HTMLInputElement;
  userConfig = updateConfigValue(
    userConfig,
    "repeatRate",
    Number(target.value) || 0,
  );
  console.log(userConfig);
});

// Keyboard layout listener
document.querySelectorAll('input[name="keyboardValue"]').forEach((input) => {
  input.addEventListener("change", (e) => {
    const target = e.target as HTMLInputElement;
    if (target.checked) {
      userConfig = updateConfigValue(
        userConfig,
        "keyboardLayout",
        target.value,
      );
    }
    console.log(userConfig);
  });
});

// Keyboard modkey on sway listener
document.querySelectorAll('input[name="modkeyInput"]').forEach((input) => {
  input.addEventListener("change", (e) => {
    const target = e.target as HTMLInputElement;
    if (target.checked) {
      userConfig = updateConfigValue(userConfig, "modkey", target.value);
    }
    console.log(userConfig);
  });
});

// keybindings
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

  recordIcon.classList.toggle("hidden");
  recordIconSlash.classList.toggle("hidden");
  isRecording = false;
  window.removeEventListener("keydown", handleKeyPress, true);
}

addNewBindBtn.addEventListener("click", (e) => {
  e.preventDefault();
  keybindPrompt.classList.remove("hidden");
});

addNewKeybindPromptBtn?.addEventListener("click", (e) => {
  e.preventDefault();
  keybindPrompt.classList.add("hidden");
});

cancelNewKeybindBtn?.addEventListener("click", (e) => {
  e.preventDefault();
  keybindPrompt.classList.add("hidden");
});
