import { exportSaveFile, currentState, importSaveFile, clearTheLocalStorage, GAME_INITIAL_STATE, resetGameState, loadFromTheLocalStorage, saveTheDataToLocalStorage } from "./gameState.js";
import { setFocus, ZONES } from "./world.js";
import { ITEMS } from "./items.js";
import { appendDigitToFrequency, removeOneFromBuffer } from "./radioFrequency.js";
/*
used to optimize a bit the performance
 */
export const elementCache = new Map();
/*
get an element from the ui
@param id the id of the element we want
 */
export function getEl(id) {
    const cached = elementCache.get(id);
    if (cached) {
        return cached;
    }
    const element = document.getElementById(id);
    if (!element) {
        throw new Error(`Element ${id} not found in DOM`);
    }
    elementCache.set(id, element);
    return element;
}
/*
load a zone
@param zone the zone we want to load
 */
export async function loadZone(zone) {
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
export function renderZoneActions(zone) {
    //step 1
    getEl("zone-action").innerHTML = "";
    //step 2
    const actions = zone.getActions();
    //step 3
    for (const action of actions) {
        if (action.oneTime && currentState.inactiveCommands.includes(action.command)) {
            continue;
        }
        createButtonZoneActions(action, zone);
    }
}
/*
function to render the player inventory
 */
export function renderThePlayerInventory() {
    const inventoryItemList = getEl("inventory-items-list");
    const inventoryItemDetails = getEl("inventory-item-details");
    inventoryItemList.innerHTML = "";
    inventoryItemDetails.textContent = "Select an item to inspect.";
    if (currentState.playerInventory.length === 0) {
        const nothingToSeeThereMsg = document.createElement("p");
        nothingToSeeThereMsg.textContent = "Nothing to see there, its empty";
        nothingToSeeThereMsg.className = "nothing-here-msg";
        inventoryItemList.append(nothingToSeeThereMsg);
        //if the inventory is not there or no item
        return;
    }
    const fragment = document.createDocumentFragment();
    currentState.playerInventory.forEach((slot) => {
        const item = ITEMS[slot.itemId];
        if (!item)
            return;
        const buttonForDaItem = document.createElement("button");
        buttonForDaItem.className = "inventory-item-btn";
        //we need to not forget the little counter for consumable item :D!
        if (item.type === "consumable") {
            buttonForDaItem.textContent = `> ${item.name} x${slot.count}`;
        }
        else {
            buttonForDaItem.textContent = `> ${item.name}`;
        }
        buttonForDaItem.addEventListener("click", () => {
            document.querySelectorAll(".inventory-item-btn").forEach(btn => {
                btn.classList.remove("TheOneAndOnlySelectedInventoryItemButton");
            });
            buttonForDaItem.classList.add("TheOneAndOnlySelectedInventoryItemButton");
            inventoryItemDetails.textContent = `[${item.type.toUpperCase()}] ${item.description}`;
        });
        inventoryItemList.append(buttonForDaItem);
    });
}
// buttons ( radio interface )
const keypadButtons = document.querySelectorAll(".radio-key");
const currentFrequencyDisplay = getEl("radio-current-frequency");
keypadButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const value = btn.value;
        if (!btn.value || !currentFrequencyDisplay)
            return;
        currentFrequencyDisplay.textContent = appendDigitToFrequency(value);
    });
});
getEl("btn-delete-key").addEventListener("click", () => {
    currentFrequencyDisplay.textContent = removeOneFromBuffer();
});
/*
simple function to toggle the overlay cuz I don't want to repeat myself
 */
function toggleOverlay() {
    getEl("menu-overlay").classList.toggle("hidden");
}
/*
binding a button and an async action
@param button the button we want to bind the action to
@param action the action we want to bind to the button
 @note only usable wifunction to th function that Promise<void>, with only void it doesn't work
 */
function bindingAsyncAction(button, action) {
    button.addEventListener("click", async () => {
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
function bindingAction(button, action) {
    button.addEventListener("click", () => {
        if (isPrinting) {
            flashButton(button);
            return;
        }
        action();
    });
}
/*
toggle the hidden class to open or close the menu
 */
function openOrCloseMenu() {
    getEl("side-menu").classList.toggle("hidden");
    if (!(getEl("inventory").classList.contains("inventory-active"))
        && !(getEl("radio-interface").classList.contains("radio-interface-active"))) {
        toggleOverlay();
    }
}
/*
function to toggle the hidden / active class to open or close the inventory
 */
function openInventory() {
    getEl("inventory").classList.toggle("inventory-active");
    renderThePlayerInventory();
    getEl("menu-overlay").classList.remove("hidden");
}
/*
function to close the inventory
 */
function closeInventory() {
    getEl("inventory").classList.toggle("inventory-active");
    renderThePlayerInventory();
    if ((getEl("side-menu").classList.contains("hidden"))) {
        toggleOverlay();
    }
}
/*
function for opening or closing the radio interface for tuning the radio
 */
function closeRadioInterface() {
    getEl("radio-interface").classList.toggle("radio-interface-active");
    toggleOverlay();
    if (!(getEl("side-menu").classList.contains("hidden"))) {
        toggleOverlay();
    }
}
/*
open the interface for the radio tuning
 */
function openRadioInterface() {
    getEl("radio-interface").classList.add("radio-interface-active");
    if ((getEl("side-menu").classList.contains("hidden"))) {
        toggleOverlay();
    }
}
async function applyZone1Test() {
    await loadZone(ZONES.TRUCK_CABIN);
}
async function applyZone2Test() {
    await loadZone(ZONES.SNOWY_FOREST);
}
async function saveGame() {
    saveTheDataToLocalStorage();
    await printToTerminal("Game Saved", "system");
}
// buttons
bindingAction(getEl("btn-open-inventory"), openInventory);
bindingAction(getEl("btn-close-inventory"), closeInventory);
bindingAction(getEl("btn-open-radio-interface"), openRadioInterface);
bindingAction(getEl("btn-close-radio-interface"), closeRadioInterface);
//general
bindingAction(getEl("button-open-side-menu"), openOrCloseMenu);
bindingAction(getEl("button-close-side-menu"), openOrCloseMenu);
getEl("btn-export").addEventListener("click", exportSaveFile);
getEl("btn-import").addEventListener("click", async () => {
    getEl("terminal-output").innerHTML = "";
    importSaveFile(async () => {
        await loadZone(ZONES[currentState.currentZone]);
        await printToTerminal("Save file loaded with success", "system");
    }, async (errorMsg) => {
        await printToTerminal(`Import error: ${errorMsg}`, "alert");
    });
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
function closeInterface() {
    if (!getEl("side-menu").classList.contains("hidden")) {
        openOrCloseMenu();
    }
    else if (getEl("inventory").classList.contains("inventory-active")) {
        closeInventory();
    }
    else if (getEl("radio-interface").classList.contains("radio-interface-active")) {
        closeRadioInterface();
    }
}
getEl("menu-overlay").addEventListener("click", closeInterface);
/*
shortcut ( press escape to close/open side menu, instead of having to click a small button )
 */
window.addEventListener("keydown", (keyEvent) => {
    if (isPrinting)
        return; //clause guard if it's writing in terminal
    const sideMenu = getEl("side-menu");
    if (!getEl("side-menu").classList.contains("hidden") && keyEvent.key === "Escape") {
        openOrCloseMenu();
    }
    else if (getEl("side-menu").classList.contains("hidden") && keyEvent.key === "Escape") {
        openOrCloseMenu();
    }
});
export let isPrinting = false;
function flashButton(btn) {
    btn.classList.add("btn-error-flash");
    setTimeout(() => btn.classList.remove("btn-error-flash"), 300);
}
/*
function to print to the terminal :D
@param from the place the text come from(log(yellow), alert(red), normal(green) )
 */
export async function printToTerminal(text, from, speedMs = 15) {
    const outputTerminal = getEl("terminal-output");
    isPrinting = true;
    const prettyLine = document.createElement("div");
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
let confirmingReset = false;
let resetTimeout = null;
getEl("btn-restart").addEventListener("click", async () => {
    const buttonRestart = getEl("btn-restart");
    if (!confirmingReset) {
        // first click
        confirmingReset = true;
        buttonRestart.textContent = "Are you sure? (click again)";
        flashButton(buttonRestart);
        // 4 seconds timeout
        resetTimeout = window.setTimeout(() => {
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
function createButtonZoneActions(action, zone) {
    const actionZone = getEl("zone-action");
    const button = document.createElement("button");
    button.textContent = `${action.command}`;
    button.className = "action-btn";
    button.title = action.description;
    // step 4
    bindingAsyncAction(button, async () => {
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
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
/*
function that is called to initialize game
 */
async function initGame() {
    const hasSave = loadFromTheLocalStorage();
    if (hasSave) {
        await printToTerminal("Restoring previous session...", "system");
        await loadZone(ZONES[currentState.currentZone]);
    }
    else {
        await printToTerminal("the game story is really far from being finished, sorry :c", "alert");
        await printToTerminal("You were sent up the mountain pass to reach the summit observation tower.", "log");
        await printToTerminal("Originally a fire watch post, it now houses the master broadcast relay that feeds " +
            "three smaller repeater stations across the valley", "log");
        await loadZone(ZONES[GAME_INITIAL_STATE.currentZone]);
    }
}
/*
function in case there is an error while trying to initialize game
 */
function startGame() {
    initGame().catch((err) => {
        console.error("failed to initialize game: ", err);
    });
}
if (document.readyState === "loading") {
    window.addEventListener("DOMContentLoaded", startGame);
}
else {
    startGame();
}
