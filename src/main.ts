import {
    exportSaveFile
} from "./gameState.js";
import {checkTruckTrunk} from "./actions.js";
import {Zone} from "./world.js";
import {playerInventory} from "./inventory.js";
import {Item, ITEMS} from "./items.js";

// buttons
const buttonOpenSideMenu: HTMLButtonElement = document.getElementById("btn-menu-open") as HTMLButtonElement;
const buttonCloseSideMenu: HTMLButtonElement =
    document.getElementById("btn-menu-close") as HTMLButtonElement;
const buttonPrintHi: HTMLButtonElement =
    document.getElementById("btn-print-hello") as HTMLButtonElement;
const buttonPrintHiAlert: HTMLButtonElement =
    document.getElementById("btn-print-hello-alert") as HTMLButtonElement;
const buttonExport: HTMLButtonElement = document.getElementById("btn-export") as HTMLButtonElement;
const buttonImport: HTMLButtonElement = document.getElementById("btn-import") as HTMLButtonElement;
const buttonPrintHiLog: HTMLButtonElement =
    document.getElementById("btn-print-hello-log") as HTMLButtonElement;
const buttonOpenInventory: HTMLButtonElement =
    document.getElementById("btn-open-inventory") as HTMLButtonElement;
const buttonCloseInventory: HTMLButtonElement =
    document.getElementById("btn-close-inventory") as HTMLButtonElement;
// zone 1
const buttonOpenTrunk: HTMLButtonElement =
    document.getElementById("btn-open-truck-trunk") as HTMLButtonElement;

// div elements
const sideMenu: HTMLDivElement = document.getElementById("side-menu") as HTMLDivElement;
const sideMenuOverlay: HTMLDivElement = document.getElementById("menu-overlay") as HTMLDivElement;
const terminalOutput: HTMLDivElement = document.getElementById("terminal-output") as HTMLDivElement;
const inventory: HTMLDivElement = document.getElementById("inventory") as HTMLDivElement;
const inventoryDesc: HTMLParagraphElement =
    document.getElementById("inventory-item-details") as HTMLParagraphElement;
const terminalInput: HTMLDivElement =
    document.getElementById("terminal-input") as HTMLDivElement;

export type fromType = "system" | "alert" | "QG" | "log" | "action";

export async function loadZone(zone: Zone): Promise<void> {
    await printToTerminal(`ZONE: ${zone.name}`, "system");
    await printToTerminal(zone.description, "system");
}

/*
function to render in a dynamic way the actions for a zone<br>
detailed explanation:
-
1. remove every buttons from the terminal input area
2.
 */
export function renderZoneActions(zone: Zone): void {
    if (!terminalInput) return;
    //step 1
    terminalInput.innerHTML = "";

}
export function renderThePlayerInventory(): void{
    if(!inventory || !inventoryDesc) return;
    inventory.innerHTML = "";
    inventoryDesc.textContent = "Select an item to inspect.";
    if (playerInventory.length === 0) {
        const nothingToSeeThereMsg = document.createElement("p");
        nothingToSeeThereMsg.textContent = "Nothing to see there, its empty";
        nothingToSeeThereMsg.className = "nothing-here-msg";
        inventory.appendChild(nothingToSeeThereMsg);
        //if the inventory is not there
        return;
    }
    playerInventory.forEach((slot) => {
        const item:Item = ITEMS[slot.itemId];
        if (!item) return;
        const buttonForDaItem: HTMLButtonElement = document.createElement("button");
        buttonForDaItem.className = "inventory-item-btn";

        //we need to not forget the little counter for consumable item :D!
        if (item.type === "consumable"){
            buttonForDaItem.textContent = `> ${item.name} x${slot.count}`;
        } else {
            buttonForDaItem.textContent = `> ${item.name}`;
        }
        buttonForDaItem.addEventListener("click", () => {
            document.querySelectorAll(".inventory-item-btn").forEach(btn => {
                btn.classList.remove("TheOneAndOnlySelectedInventoryItemButton");
            });
            buttonForDaItem.classList.add("TheOneAndOnlySelectedInventoryItemButton");
            inventoryDesc.textContent = `[${item.type.toUpperCase()}] ${item.description}`;
        });
        inventory.appendChild(buttonForDaItem);
    })
}

/*
simple function to open the menu by removing
the "hidden" class from their classList
 */
function openMenu(): void {
    sideMenu.classList.remove("hidden");
    sideMenuOverlay.classList.remove("hidden");
}

/*
binding a button and an action in a better way
 ( no repeating myself by always adding a guard clause)
 @note only usable with function that Promise<void>, with only void it doesnt work
 */
function bindingAction(button: HTMLButtonElement, action: () => Promise<void>): void {
    button.addEventListener("click", async (): Promise<void> => {
        if (isPrinting) {
            flashButton(button);
            return;
        }
        await action();
    })
}

/*
function to close side menu
 */
function closeMenu(): void {
    sideMenu.classList.add("hidden");
    sideMenuOverlay.classList.add("hidden");
}

function openInventory(): void {
    inventory.classList.add("inventory-active");
    sideMenuOverlay.classList.remove("hidden");
    renderThePlayerInventory();
}

function closeInventory(): void {
    inventory.classList.remove("inventory-active");
    sideMenuOverlay.classList.add("hidden");
}

async function printHiNormal(): Promise<void> {
    await printToTerminal("hi :D", "system");
}

async function printHiAlert(): Promise<void> {
    await printToTerminal("hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii :D", "alert");
}

async function printHiLog(): Promise<void> {
    await printToTerminal("hi :D", "log")
}

// buttons
//general
buttonOpenSideMenu.addEventListener("click", openMenu);
buttonCloseSideMenu.addEventListener("click", closeMenu);
buttonExport.addEventListener("click", exportSaveFile);
buttonOpenInventory.addEventListener("click", openInventory);
buttonCloseInventory.addEventListener("click", closeInventory)
//test
/*
bindingAction(buttonPrintHi, printHiNormal);
bindingAction(buttonPrintHiLog, printHiLog);
bindingAction(buttonPrintHiAlert, printHiAlert);
*/

//zone 1
bindingAction(buttonOpenTrunk, checkTruckTrunk);

// others
/*
function to close the correct interface ( i dont wanna redo a overlay for everything so
im just going to reuse the sideMenuOverlay
 */
function closeInterface(): void {
    if (!sideMenu.classList.contains("hidden")) {
        closeMenu();
    } else if (inventory.classList.contains("inventory-active")) {
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
    } else if (sideMenu.classList.contains("hidden") && keyEvent.key === "Escape") {
        openMenu();
    }
});
export let isPrinting: boolean = false;

function flashButton(btn: HTMLButtonElement): void {
    btn.classList.add("btn-error-flash");
    setTimeout((): void => btn.classList.remove("btn-error-flash"), 300);
}

/*
function to print to the terminal :D
@param from the place the text come from(log(yellow), alert(red), normal(green) )
 */
export async function printToTerminal(text: string, from: fromType, speedMs: number = 15): Promise<void> {
    if (!terminalOutput) return;
    isPrinting = true;
    const prettyLine: HTMLDivElement = document.createElement("div");
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

function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/*
function that is call to initialize game
 */
async function initGame(): Promise<void> {
    await printToTerminal("sorry, the game story has not been started yet :c", "alert");
}

/*
function in case there is an error while trying to initialize game
 */
function startGame(): void {
    initGame().catch((err: unknown): void => {
        console.error("failed to initialize game: ", err)
    });
}

if (document.readyState === "loading") {
    window.addEventListener("DOMContentLoaded", startGame);
} else {
    startGame();
}