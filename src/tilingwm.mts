const addNewMonitor = document.getElementById(
  "add-monitor",
) as HTMLInputElement;
const monitorPrompt = document.getElementById(
  "monitor-prompt",
) as HTMLInputElement;
const addNewMonitorBtn = document.getElementById(
  "add-new-monitor",
) as HTMLButtonElement;
const cancelNewMonitorBtn = document.getElementById(
  "cancel-new-monitor",
) as HTMLButtonElement;

addNewMonitor.addEventListener("click", (e) => {
  e.preventDefault();
  monitorPrompt.classList.remove("hidden");
});

addNewMonitorBtn.addEventListener("click", (e) => {
  e.preventDefault();
  monitorPrompt.classList.add("hidden");
});

cancelNewMonitorBtn.addEventListener("click", (e) => {
  e.preventDefault();
  monitorPrompt.classList.add("hidden");
});
