import { exportSaveFile, currentState, importSaveFile, clearTheLocalStorage, GAME_INITIAL_STATE, resetGameState, loadFromTheLocalStorage, saveTheDataToLocalStorage } from "./gameState.js";
import { setFocus, ZONES } from "./world.js";
import { ITEMS } from "./items.js";
/*
used to optimize a bit the performance
 */
export const elementCache = new Map();
/*
function to get an element from the ui
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
function to render in a dynamic way the actions for a zone<br>
detailed explanation:
-
1. remove every buttons from the terminal input area
2. get the choice from the zone
3. make button for each action
4. bind it to its action
 */
export function renderZoneActions(zone) {
    if (!(getEl("terminal-input")))
        return;
    //step 1
    getEl("zone-action").innerHTML = "";
    //step 2
    const actions = zone.getActions();
    //step 3
    for (const action of actions) {
        if (action.oneTime && currentState.inactiveCommands.includes(action.command)) {
            continue;
        }
        const button = document.createElement("button");
        button.textContent = `${action.command}`;
        button.className = "action-btn";
        button.title = action.description;
        // step 4
        bindingAction(button, async () => {
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
        getEl("zone-action").append(button);
    }
}
export function renderThePlayerInventory() {
    if (!getEl("inventory") || !getEl("inventory-item-details"))
        return;
    getEl("inventory-items-list").innerHTML = "";
    getEl("inventory-item-details").textContent = "Select an item to inspect.";
    if (currentState.playerInventory.length === 0) {
        const nothingToSeeThereMsg = document.createElement("p");
        nothingToSeeThereMsg.textContent = "Nothing to see there, its empty";
        nothingToSeeThereMsg.className = "nothing-here-msg";
        getEl("inventory-items-list").append(nothingToSeeThereMsg);
        //if the inventory is not there or no item
        return;
    }
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
            getEl("inventory-item-details").textContent = `[${item.type.toUpperCase()}] ${item.description}`;
        });
        getEl("inventory-items-list").append(buttonForDaItem);
    });
}
/*
binding a button and an action in a better way
 ( no repeating myself by always adding a guard clause)
 @note only usable with function that Promise<void>, with only void it doesnt work
 */
function bindingAction(button, action) {
    button.addEventListener("click", async () => {
        if (isPrinting) {
            flashButton(button);
            return;
        }
        await action();
    });
}
/*
function to toggle the hidden class to open or close the menu
 */
function openOrCloseMenu() {
    getEl("side-menu").classList.toggle("hidden");
    if (!(getEl("inventory").classList.contains("inventory-active"))) {
        getEl("menu-overlay").classList.toggle("hidden");
    }
}
/*
function to toggle the hidden / active class to open or close the inventory
 */
function openOrCloseInventory() {
    getEl("inventory").classList.toggle("inventory-active");
    getEl("menu-overlay").classList.toggle("hidden");
    renderThePlayerInventory();
}
async function printHiNormal() {
    await printToTerminal("hi :D", "system");
}
async function printHiAlert() {
    await printToTerminal("hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii :D", "alert");
}
async function printHiLog() {
    await printToTerminal("hi :D", "log");
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
//general
getEl("button-open-side-menu").addEventListener("click", openOrCloseMenu);
getEl("button-close-side-menu").addEventListener("click", openOrCloseMenu);
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
getEl("btn-open-inventory").addEventListener("click", openOrCloseInventory);
getEl("btn-close-inventory").addEventListener("click", openOrCloseInventory);
//test
/*
bindingAction(buttonPrintHi, printHiNormal);
bindingAction(buttonPrintHiLog, printHiLog);
bindingAction(buttonPrintHiAlert, printHiAlert);
*/
// zone 1
bindingAction(getEl("btn-apply-zone-truck-cabin"), applyZone1Test);
//zone 2
bindingAction(getEl("btn-apply-zone-snowy-forest"), applyZone2Test);
// others
bindingAction(getEl("btn-save"), saveGame);
/*
function to close the correct interface ( i dont wanna redo a overlay for everything so
im just going to reuse the sideMenuOverlay
 */
function closeInterface() {
    if (!getEl("side-menu").classList.contains("hidden")) {
        openOrCloseMenu();
    }
    else if (getEl("inventory").classList.contains("inventory-active")) {
        openOrCloseInventory();
    }
}
getEl("menu-overlay").addEventListener("click", closeInterface);
/*
shortcut ( press escape to close/open side menu, instead of having to click a smoll button )
 */
window.addEventListener("keydown", (keyEvent) => {
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
    if (!getEl("terminal-output"))
        return;
    isPrinting = true;
    const prettyLine = document.createElement("div");
    prettyLine.className = `terminal-line ${from}`;
    getEl("terminal-output").append(prettyLine);
    const textNode = document.createTextNode("");
    prettyLine.append(textNode);
    for (let i = 0; i < text.length; ++i) {
        textNode.appendData(text[i]);
        getEl("terminal-output").scrollTop = getEl("terminal-output").scrollHeight;
        await sleep(speedMs);
    }
    isPrinting = false;
}
let confirmingReset = false;
let resetTimeout = null;
getEl("btn-restart").addEventListener("click", async () => {
    if (!confirmingReset) {
        // first click
        confirmingReset = true;
        getEl("btn-restart").textContent = "Are you sure? (click again)";
        flashButton(getEl("btn-restart"));
        // 4 seconds timeout
        resetTimeout = window.setTimeout(() => {
            confirmingReset = false;
            getEl("btn-restart").textContent = "Restart the whole game";
        }, 4000);
        return;
    }
    if (resetTimeout !== null) {
        window.clearTimeout(resetTimeout);
    }
    confirmingReset = false;
    getEl("btn-restart").textContent = "Restart the whole game";
    clearTheLocalStorage();
    resetGameState();
    //reloading the game
    location.reload();
});
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
