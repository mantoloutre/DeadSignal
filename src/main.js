import { exportSaveFile } from "./gameState.js";
import { addCrowBarToThePlayerInventory, checkTruckTrunk } from "./actions.js";
import { ZONES } from "./world.js";
import { playerInventory } from "./inventory.js";
import { ITEMS } from "./items.js";
// buttons
const buttonOpenSideMenu = document.getElementById("btn-menu-open");
const buttonCloseSideMenu = document.getElementById("btn-menu-close");
const buttonPrintHi = document.getElementById("btn-print-hello");
const buttonPrintHiAlert = document.getElementById("btn-print-hello-alert");
const buttonExport = document.getElementById("btn-export");
const buttonImport = document.getElementById("btn-import");
const buttonPrintHiLog = document.getElementById("btn-print-hello-log");
const buttonOpenInventory = document.getElementById("btn-open-inventory");
const buttonCloseInventory = document.getElementById("btn-close-inventory");
// zone 1
const buttonOpenTrunk = document.getElementById("btn-open-truck-trunk");
const buttonPickUpCrowBar = document.getElementById("btn-test-1");
const buttonApplyZone1 = document.getElementById("applyZone1");
// div elements
const sideMenu = document.getElementById("side-menu");
const sideMenuOverlay = document.getElementById("menu-overlay");
const terminalOutput = document.getElementById("terminal-output");
const inventory = document.getElementById("inventory");
const inventoryDesc = document.getElementById("inventory-item-details");
const terminalInput = document.getElementById("terminal-input");
const zoneActions = document.getElementById("zone-action");
const inventoryItemList = document.getElementById("inventory-items-list");
const zoneTag = document.getElementById("zone");
export async function loadZone(zone) {
    zoneActions.textContent = `${zone.name}`;
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
    if (!terminalInput)
        return;
    //step 1
    zoneActions.innerHTML = "";
    //step 2
    const actions = zone.getActions();
    //sstep 3
    actions.forEach((action) => {
        const button = document.createElement("button");
        button.textContent = `${action.command}`;
        button.className = "action-btn";
        button.title = action.description;
        // step 4
        bindingAction(button, async () => {
            await action.execute();
            /*
            this can be added its to reload the zone again but for
            now useless cuz inventory deal with it
            renderZoneActions(zone);
            */
        });
        zoneActions.appendChild(button);
    });
}
export function renderThePlayerInventory() {
    if (!inventory || !inventoryDesc)
        return;
    inventoryItemList.innerHTML = "";
    inventoryDesc.textContent = "Select an item to inspect.";
    if (playerInventory.length === 0) {
        const nothingToSeeThereMsg = document.createElement("p");
        nothingToSeeThereMsg.textContent = "Nothing to see there, its empty";
        nothingToSeeThereMsg.className = "nothing-here-msg";
        inventoryItemList.appendChild(nothingToSeeThereMsg);
        //if the inventory is not there or no item
        return;
    }
    playerInventory.forEach((slot) => {
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
            inventoryDesc.textContent = `[${item.type.toUpperCase()}] ${item.description}`;
        });
        inventoryItemList.appendChild(buttonForDaItem);
    });
}
/*
simple function to open the menu by removing
the "hidden" class from their classList
 */
function openMenu() {
    sideMenu.classList.remove("hidden");
    sideMenuOverlay.classList.remove("hidden");
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
    sideMenu.classList.add("hidden");
    sideMenuOverlay.classList.add("hidden");
}
function openInventory() {
    inventory.classList.add("inventory-active");
    sideMenuOverlay.classList.remove("hidden");
    renderThePlayerInventory();
}
function closeInventory() {
    inventory.classList.remove("inventory-active");
    sideMenuOverlay.classList.add("hidden");
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
    await loadZone(ZONES.SNOWY_FOREST);
}
// buttons
//general
buttonOpenSideMenu.addEventListener("click", openMenu);
buttonCloseSideMenu.addEventListener("click", closeMenu);
buttonExport.addEventListener("click", exportSaveFile);
buttonOpenInventory.addEventListener("click", openInventory);
buttonCloseInventory.addEventListener("click", closeInventory);
//test
/*
bindingAction(buttonPrintHi, printHiNormal);
bindingAction(buttonPrintHiLog, printHiLog);
bindingAction(buttonPrintHiAlert, printHiAlert);
*/
//zone 1
bindingAction(buttonOpenTrunk, checkTruckTrunk);
bindingAction(buttonPickUpCrowBar, addCrowBarToThePlayerInventory);
bindingAction(buttonApplyZone1, applyZone1Test);
// others
/*
function to close the correct interface ( i dont wanna redo a overlay for everything so
im just going to reuse the sideMenuOverlay
 */
function closeInterface() {
    if (!sideMenu.classList.contains("hidden")) {
        closeMenu();
    }
    else if (inventory.classList.contains("inventory-active")) {
        closeInventory();
    }
}
sideMenuOverlay.addEventListener("click", closeInterface);
/*
shortcut ( press escape to close/open side menu, instead of having to click a smoll button )
 */
window.addEventListener("keydown", (keyEvent) => {
    if (!sideMenu.classList.contains("hidden") && keyEvent.key === "Escape") {
        closeMenu();
    }
    else if (sideMenu.classList.contains("hidden") && keyEvent.key === "Escape") {
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
    if (!terminalOutput)
        return;
    isPrinting = true;
    const prettyLine = document.createElement("div");
    prettyLine.className = `terminal-line ${from}`;
    terminalOutput.appendChild(prettyLine);
    const textNode = document.createTextNode("");
    prettyLine.appendChild(textNode);
    for (let i = 0; i < text.length; ++i) {
        textNode.appendData(text[i]);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
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
    await printToTerminal("sorry, the game story has not been started yet :c", "alert");
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
