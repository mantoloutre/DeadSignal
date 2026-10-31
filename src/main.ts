import {
  currentState,
  exportSaveFile,
  GAME_INITIAL_STATE,
  importSaveFile,
  loadFromTheLocalStorage,
  saveTheDataToLocalStorage,
  setFocus,
  setGameState,
} from "./core/gameState.js";
import "./ui/sideMenu.js";
import { gameBridge } from "./core/gameBridge.js";
import { handleFrequency, queueQGMessage } from "./core/radioFrequency.js";
import { ZONES, type ZoneId } from "./core/world.js";
import { presetBeforeDiscoveringBody } from "./data/devPresets.js";
import { ITEMS, type Item } from "./data/items.js";
import type { Zone, ZoneAction } from "./data/types.js";
import { flashButton, getEl, isPrinting, printToTerminal } from "./ui/dom.js";
import {
  closeRadioInterface,
  setDisplayFrequency,
} from "./ui/radioInterface.js";

gameBridge.loadZone = loadZone;
gameBridge.renderZoneActions = renderZoneActions;
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
export function renderZoneActions(zone: ZoneId): void {
  //step 1
  getEl("zone-action").innerHTML = "";
  //step 2
  const actions: ZoneAction[] = ZONES[zone].getActions();
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
load a zone
@param zone the zone we want to load
 */

export async function loadZone(zoneId: ZoneId): Promise<void> {
  const zone: Zone = ZONES[zoneId];
  setFocus(null);
  currentState.currentZone = zoneId;
  saveTheDataToLocalStorage();
  getEl("zone-tag").textContent = `${zone.name}`;
  await printToTerminal(`ZONE: ${zone.name}`, "system");
  await printToTerminal(zone.description, "system");
  renderZoneActions(zoneId);
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
//bind the skip zone action to its function
async function skipToZoneOutsideWatchpost(): Promise<void> {
  setGameState(presetBeforeDiscoveringBody);
}
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
bindingAsyncAction(
  getEl("btn-skip-to-outside-watch-tower"),
  skipToZoneOutsideWatchpost,
);
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
      await loadZone(currentState.currentZone);
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

/*
function to create the button for each action in a zone
 */
function createButtonZoneActions(action: ZoneAction, zoneId: ZoneId): void {
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
    if (currentState.currentZone === zoneId) {
      // needed to reload missing actions that needed a flag to appear
      renderZoneActions(zoneId);
    }
  });
  actionZone.append(button);
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
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
    await loadZone(currentState.currentZone);
  } else {
    await printToTerminal(
      "the game story is really far from being finished, sorry :c",
      "alert",
    );
    await printToTerminal("CRITICAL ALERT: engine failure detected.", "alert");
    await loadZone(GAME_INITIAL_STATE.currentZone);
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
