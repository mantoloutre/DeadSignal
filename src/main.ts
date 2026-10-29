import {
  clearTheLocalStorage,
  currentState,
  exportSaveFile,
  GAME_INITIAL_STATE,
  importSaveFile,
  loadFromTheLocalStorage,
  resetGameState,
  saveTheDataToLocalStorage,
} from "./core/gameState.js";
import {
  getFormattedBuffer,
  handleFrequency,
  queueQGMessage,
  setBuffer,
} from "./core/radioFrequency.js";
import { setFocus, ZONES, type Zone, type ZoneAction } from "./core/world.js";
import { ITEMS, type Item } from "./data/items.js";
import { closeRadioInterface } from "./ui/radioInterface.js";

interface UIElements {
  // buttons ( test )
  "btn-print-hi-system": HTMLButtonElement;
  "btn-print-hi-log": HTMLButtonElement;
  "btn-print-hi-alert": HTMLButtonElement;
  "btn-apply-zone-truck-cabin": HTMLButtonElement;
  "btn-apply-zone-snowy-forest": HTMLButtonElement;
  // buttons
  "button-open-side-menu": HTMLButtonElement;
  "button-close-side-menu": HTMLButtonElement;
  "btn-export": HTMLButtonElement;
  "btn-import": HTMLButtonElement;
  "btn-close-inventory": HTMLButtonElement;
  "btn-open-inventory": HTMLButtonElement;
  "btn-restart": HTMLButtonElement;
  "btn-save": HTMLButtonElement;
  "btn-open-radio-interface": HTMLButtonElement;
  "btn-close-radio-interface": HTMLButtonElement;
  "btn-k1": HTMLButtonElement;
  "btn-k2": HTMLButtonElement;
  "btn-k3": HTMLButtonElement;
  "btn-k4": HTMLButtonElement;
  "btn-k5": HTMLButtonElement;
  "btn-k6": HTMLButtonElement;
  "btn-k7": HTMLButtonElement;
  "btn-k8": HTMLButtonElement;
  "btn-k9": HTMLButtonElement;
  "btn-p": HTMLButtonElement;
  "btn-k0": HTMLButtonElement;
  "btn-tune": HTMLButtonElement;
  "btn-delete-key": HTMLButtonElement;
  "btn-skip-to-outside-watch-tower": HTMLButtonElement;
  "btn-close-cheat-menu": HTMLButtonElement;
  // div elements
  "side-menu": HTMLDivElement;
  "cheat-menu": HTMLDivElement;
  "menu-overlay": HTMLDivElement;
  inventory: HTMLDivElement;
  "inventory-items-list": HTMLDivElement;
  "terminal-output": HTMLDivElement;
  "terminal-input": HTMLDivElement;
  "zone-action": HTMLDivElement;
  "zone-tag": HTMLParagraphElement;
  "radio-interface": HTMLDivElement;
  // paragraph elements
  "inventory-item-details": HTMLParagraphElement;
  "radio-current-frequency": HTMLParagraphElement;
  frequency: HTMLParagraphElement;
}

/*
used to optimize the instanciation of elements
 */
export const elementCache = new Map<string, HTMLElement>();

/*
get an element from the ui
@param id the id of the element we want
 */
export function getEl<Key extends keyof UIElements>(id: Key): UIElements[Key] {
  const cached = elementCache.get(id);
  if (cached) {
    return cached as UIElements[Key];
  }
  const element = document.getElementById(id);
  if (!element) {
    throw new Error(`Element ${id} not found in DOM`);
  }
  elementCache.set(id, element);
  return element as UIElements[Key];
}

export type fromType = "system" | "alert" | "QG" | "log" | "action" | "YOU";

/*
load a zone
@param zone the zone we want to load
 */
export async function loadZone(zone: Zone): Promise<void> {
  setFocus(null);
  currentState.currentZone = zone.id;
  saveTheDataToLocalStorage();
  getEl("zone-tag").textContent = `${zone.name}`;
  await printToTerminal(`ZONE: ${zone.name}`, "system");
  await printToTerminal(zone.description, "system");
  renderZoneActions(zone);
}

/*
//TODO correct the documentation <br>
function to render in a dynamic way the actions for a zone<br>
detailed explanation:
-
1. remove every button from the terminal input area
2. get the choice from the zone
3. make button for each action
4. bind it to its action
@param zone the zone we want to render the actions
 */
export function renderZoneActions(zone: Zone): void {
  //step 1
  getEl("zone-action").innerHTML = "";
  //step 2
  const actions: ZoneAction[] = zone.getActions();
  //step 3
  for (const action of actions) {
    if (
      action.oneTime &&
      currentState.inactiveCommands.includes(action.command)
    ) {
      continue;
    }
    createButtonZoneActions(action, zone);
  }
}

/*
function to render the player inventory
 */
export function renderThePlayerInventory(): void {
  const inventoryItemList: HTMLDivElement = getEl("inventory-items-list");
  const inventoryItemDetails: HTMLParagraphElement = getEl(
    "inventory-item-details",
  );
  inventoryItemList.innerHTML = "";
  inventoryItemDetails.textContent = "Select an item to inspect.";
  if (currentState.playerInventory.length === 0) {
    const nothingToSeeThereMsg: HTMLParagraphElement =
      document.createElement("p");
    nothingToSeeThereMsg.textContent = "Nothing to see there, its empty";
    nothingToSeeThereMsg.className = "nothing-here-msg";
    inventoryItemList.append(nothingToSeeThereMsg);
    //if the inventory is not there or no item
    return;
  }
  currentState.playerInventory.forEach((slot): void => {
    const item: Item = ITEMS[slot.itemId];
    if (!item) return;
    const buttonForDaItem: HTMLButtonElement = document.createElement("button");
    buttonForDaItem.className = "inventory-item-btn";

    //we need to not forget the little counter for consumable item :D!
    if (item.type === "consumable") {
      buttonForDaItem.textContent = `> ${item.name} x${slot.count}`;
    } else {
      buttonForDaItem.textContent = `> ${item.name}`;
    }
    buttonForDaItem.addEventListener("click", (): void => {
      document.querySelectorAll(".inventory-item-btn").forEach((btn) => {
        btn.classList.remove("TheOneAndOnlySelectedInventoryItemButton");
      });
      buttonForDaItem.classList.add("TheOneAndOnlySelectedInventoryItemButton");
      inventoryItemDetails.textContent = `[${item.type.toUpperCase()}] ${item.description}`;
    });
    inventoryItemList.append(buttonForDaItem);
  });
}

/*
simple function to toggle the overlay cuz I don't want to repeat myself
 */
export function toggleOverlay(): void {
  getEl("menu-overlay").classList.toggle("hidden");
}

/*
binding a button and an async action
@param button the button we want to bind the action to
@param action the action we want to bind to the button
 @note only usable with async function that gives a void promise, with only void it doesn't work
 */
function bindingAsyncAction(
  button: HTMLButtonElement,
  action: () => Promise<void>,
): void {
  button.addEventListener("click", async (): Promise<void> => {
    if (isPrinting) {
      flashButton(button);
      return;
    }
    await action();
  });
}

/*
binding a button and an action while making sure nothing is being printed to terminalOutput
 @param button the HTMLButtonElement we want to bind the action to
 @param action the action we want to bind to the button
 @note only usable with function that return void
 */
export function bindingAction(
  button: HTMLButtonElement,
  action: () => void,
): void {
  button.addEventListener("click", (): void => {
    if (isPrinting) {
      flashButton(button);
      return;
    }
    action();
  });
}

function skipToZoneOutsideWatchpost(): void {}

//close or open the side menu
function openOrCloseCheatMenu(): void {
  //TODO maybe add a menu-overlay? maybe not cuz no?
  if (!getEl("side-menu").classList.contains("hidden")) {
    openOrCloseMenu();
  }
  getEl("cheat-menu").classList.toggle("hidden");
}

/*
toggle the hidden class to open or close the menu
 */
function openOrCloseMenu(): void {
  const cheatMenu: HTMLDivElement = getEl("cheat-menu");
  if (!cheatMenu.classList.contains("hidden")) {
    cheatMenu.classList.add("hidden");
  }
  getEl("side-menu").classList.toggle("hidden");
  if (
    !getEl("inventory").classList.contains("inventory-active") &&
    !getEl("radio-interface").classList.contains("radio-interface-active")
  ) {
    toggleOverlay();
  }
}

/*
function to toggle the hidden / active class to open or close the inventory
 */
function openInventory(): void {
  getEl("inventory").classList.toggle("inventory-active");
  renderThePlayerInventory();
  getEl("menu-overlay").classList.remove("hidden");
}

/*
function to close the inventory
 */
function closeInventory(): void {
  getEl("inventory").classList.toggle("inventory-active");
  renderThePlayerInventory();
  if (getEl("side-menu").classList.contains("hidden")) {
    toggleOverlay();
  }
}

/*
function for opening or closing the radio interface for tuning the radio
 */

/*
open the interface for the radio tuning
 */

async function saveGame(): Promise<void> {
  saveTheDataToLocalStorage();
  await printToTerminal("Game Saved", "system");
}

// buttons
bindingAction(getEl("btn-open-inventory"), openInventory);
bindingAction(getEl("btn-close-inventory"), closeInventory);

bindingAction(getEl("btn-close-radio-interface"), closeRadioInterface);
bindingAction(getEl("btn-close-cheat-menu"), openOrCloseCheatMenu);
//general
bindingAction(getEl("button-open-side-menu"), openOrCloseMenu);
bindingAction(getEl("button-close-side-menu"), openOrCloseMenu);
getEl("btn-export").addEventListener("click", exportSaveFile);
getEl("btn-import").addEventListener("click", async (): Promise<void> => {
  getEl("terminal-output").innerHTML = "";
  importSaveFile(
    async (): Promise<void> => {
      setDisplayFrequency();
      await loadZone(ZONES[currentState.currentZone]);
      await printToTerminal("Save file loaded with success", "system");
    },
    async (errorMsg: string): Promise<void> => {
      await printToTerminal(`Import error: ${errorMsg}`, "alert");
    },
  );
});
//test
// zone 1
//bindingAsyncAction(getEl("btn-apply-zone-truck-cabin"), applyZone1Test);
//zone 2
//bindingAsyncAction(getEl("btn-apply-zone-snowy-forest"), applyZone2Test);
// others
bindingAsyncAction(getEl("btn-save"), saveGame);

/*
function to close the correct interface ( i don't wanna redo a overlay for everything so
im just going to reuse the sideMenuOverlay
 */
function closeInterface(): void {
  if (!getEl("side-menu").classList.contains("hidden")) {
    openOrCloseMenu();
  } else if (getEl("inventory").classList.contains("inventory-active")) {
    closeInventory();
  } else if (
    getEl("radio-interface").classList.contains("radio-interface-active")
  ) {
    closeRadioInterface();
  }
}

getEl("menu-overlay").addEventListener("click", closeInterface);

/*
shortcut ( press escape to close/open side menu, instead of having to click a small button )
 */
window.addEventListener("keydown", (keyEvent: KeyboardEvent): void => {
  if (isPrinting) return; //clause guard if it's writing in terminal
  if (keyEvent.key === "Escape") {
    openOrCloseMenu();
  }
  if (keyEvent.key === "p" || keyEvent.key === "p") {
    openOrCloseCheatMenu();
  }
});
export let isPrinting: boolean = false;

export function flashButton(btn: HTMLButtonElement): void {
  btn.classList.add("btn-error-flash");
  setTimeout((): void => btn.classList.remove("btn-error-flash"), 300);
}

/*
function to print to the terminal :D
@param from the place the text come from(log(yellow), alert(red), normal(green) )
 */
export async function printToTerminal(
  text: string,
  from: fromType,
  speedMs: number = 15,
): Promise<void> {
  const outputTerminal: HTMLDivElement = getEl("terminal-output");
  isPrinting = true;
  const prettyLine: HTMLDivElement = document.createElement("div");
  prettyLine.className = `terminal-line ${from}`;
  outputTerminal.append(prettyLine);
  const textNode = document.createTextNode("");
  prettyLine.append(textNode);
  for (let i = 0; i < text.length; ++i) {
    textNode.appendData(text[i]);
    outputTerminal.scrollTop = outputTerminal.scrollHeight;
    await sleep(speedMs);
  }
  isPrinting = false;
}

let confirmingReset: boolean = false;
let resetTimeout: number | null = null;
getEl("btn-restart").addEventListener("click", async (): Promise<void> => {
  const buttonRestart: HTMLButtonElement = getEl("btn-restart");
  if (!confirmingReset) {
    // first click
    confirmingReset = true;
    buttonRestart.textContent = "Are you sure? (click again)";
    flashButton(buttonRestart);
    // 4 seconds timeout
    resetTimeout = window.setTimeout((): void => {
      confirmingReset = false;
      buttonRestart.textContent = "Restart the whole game";
    }, 4000);
    return;
  }
  if (resetTimeout !== null) {
    window.clearTimeout(resetTimeout);
  }
  confirmingReset = false;
  buttonRestart.textContent = "Restart the whole game";
  clearTheLocalStorage();
  resetGameState();
  //reloading the game
  location.reload();
});
/*
function to create the button for each action in a zone
 */
function createButtonZoneActions(action: ZoneAction, zone: Zone) {
  const actionZone: HTMLDivElement = getEl("zone-action");
  const button: HTMLButtonElement = document.createElement("button");
  button.textContent = `${action.command}`;
  button.className = "action-btn";
  button.title = action.description;
  // step 4
  bindingAsyncAction(button, async (): Promise<void> => {
    if (action.oneTime) {
      currentState.inactiveCommands.push(action.command);
    }
    await action.execute();
    //we need to make sure we are still in the same zone
    if (currentState.currentZone === zone.id) {
      // needed to reload missing actions that needed a flag to appear
      renderZoneActions(zone);
    }
  });
  actionZone.append(button);
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/*
to set the display and current frequency to the right values
 */
function setDisplayFrequency(): void {
  setBuffer(currentState.currentFrequency);
  const theFrequency: string = getFormattedBuffer();
  getEl("frequency").textContent = theFrequency;
  getEl("radio-current-frequency").textContent = theFrequency;
}

/*
function that is called to initialize game
 */
async function initGame(): Promise<void> {
  const hasSave: boolean = loadFromTheLocalStorage();
  if (hasSave) {
    await printToTerminal("Restoring previous session...", "system");
    setDisplayFrequency();
    //if (currentState.currentFrequency === "112.400") await handleFrequency();
    await handleFrequency();
    await loadZone(ZONES[currentState.currentZone]);
  } else {
    await printToTerminal(
      "the game story is really far from being finished, sorry :c",
      "alert",
    );
    await printToTerminal("CRITICAL ALERT: engine failure detected.", "alert");
    await loadZone(ZONES[GAME_INITIAL_STATE.currentZone]);
    getEl("frequency").textContent = currentState.currentFrequency;
    await queueQGMessage("TRUCK_STOPPED_START");
  }
}

/*
function in case there is an error while trying to initialize game
 */
function startGame(): void {
  initGame().catch((err: unknown): void => {
    console.error("failed to initialize game: ", err);
  });
}
/*
ready state the document
 */
if (document.readyState === "loading") {
  window.addEventListener("DOMContentLoaded", startGame);
} else {
  startGame();
}
