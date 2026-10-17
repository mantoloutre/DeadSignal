import { exportSaveFile, currentState } from "./gameState.js";
import { ZONES } from "./world.js";
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
    if (!getEl("terminal-input"))
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
        getEl("zone-action").appendChild(button);
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
        getEl("inventory-items-list").appendChild(nothingToSeeThereMsg);
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
        getEl("inventory-items-list").appendChild(buttonForDaItem);
    });
}
/*
simple function to open the menu by removing
the "hidden" class from their classList
 */
function openMenu() {
    getEl("side-menu").classList.remove("hidden");
    getEl("menu-overlay").classList.remove("hidden");
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
function to close side menu
 */
function closeMenu() {
    getEl("side-menu").classList.add("hidden");
    getEl("menu-overlay").classList.add("hidden");
}
function openInventory() {
    getEl("inventory").classList.add("inventory-active");
    getEl("menu-overlay").classList.remove("hidden");
    renderThePlayerInventory();
}
function closeInventory() {
    getEl("inventory").classList.remove("inventory-active");
    getEl("menu-overlay").classList.add("hidden");
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
// buttons
//general
getEl("button-open-side-menu").addEventListener("click", openMenu);
getEl("button-close-side-menu").addEventListener("click", closeMenu);
getEl("btn-export").addEventListener("click", exportSaveFile);
getEl("btn-open-inventory").addEventListener("click", openInventory);
getEl("btn-close-inventory").addEventListener("click", closeInventory);
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
/*
function to close the correct interface ( i dont wanna redo a overlay for everything so
im just going to reuse the sideMenuOverlay
 */
function closeInterface() {
    if (!getEl("side-menu").classList.contains("hidden")) {
        closeMenu();
    }
    else if (getEl("inventory").classList.contains("inventory-active")) {
        closeInventory();
    }
}
getEl("menu-overlay").addEventListener("click", closeInterface);
/*
shortcut ( press escape to close/open side menu, instead of having to click a smoll button )
 */
window.addEventListener("keydown", (keyEvent) => {
    if (!getEl("side-menu").classList.contains("hidden") && keyEvent.key === "Escape") {
        closeMenu();
    }
    else if (getEl("side-menu").classList.contains("hidden") && keyEvent.key === "Escape") {
        openMenu();
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
    getEl("terminal-output").appendChild(prettyLine);
    const textNode = document.createTextNode("");
    prettyLine.appendChild(textNode);
    for (let i = 0; i < text.length; ++i) {
        textNode.appendData(text[i]);
        getEl("terminal-output").scrollTop = getEl("terminal-output").scrollHeight;
        await sleep(speedMs);
    }
    isPrinting = false;
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
/*
function that is call to initialize game
 */
async function initGame() {
    await printToTerminal("the game story is really far from being finished, sorry :c", "alert");
    await loadZone(ZONES.TRUCK_CABIN);
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
