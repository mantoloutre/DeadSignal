import {
    exportSaveFile,
    currentState, importSaveFile, clearTheLocalStorage, GAME_INITIAL_STATE, resetGameState, loadFromTheLocalStorage,
    saveTheDataToLocalStorage
} from "./gameState.js";
import {Zone, ZoneActions, ZONES} from "./world.js";
import {Item, ITEMS} from "./items.js";

interface UIElements {
    // buttons ( test )
    "btn-side-menu-open": HTMLButtonElement;
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
    // div elements
    "side-menu": HTMLDivElement;
    "menu-overlay": HTMLDivElement;
    "inventory": HTMLDivElement;
    "inventory-items-list": HTMLDivElement;
    "inventory-item-details": HTMLParagraphElement;
    "terminal-output": HTMLDivElement;
    "terminal-input": HTMLDivElement;
    "zone-action": HTMLDivElement;
    "zone-tag": HTMLParagraphElement;
}

/*
used to optimize a bit the performance
 */
export const elementCache = new Map<string, HTMLElement>();

/*
function to get an element from the ui
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

export type fromType = "system" | "alert" | "QG" | "log" | "action";

export async function loadZone(zone: Zone): Promise<void> {
    saveTheDataToLocalStorage();
    currentState.currentZone = zone.id;
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
export function renderZoneActions(zone: Zone): void {
    if (!(getEl("terminal-input"))) return;
    //step 1
    getEl("zone-action").innerHTML = "";
    //step 2
    const actions: ZoneActions[] = zone.getActions();
    //step 3
    for (const action of actions) {
        if (action.oneTime && currentState.inactiveCommands.includes(action.command)) {
            continue;
        }
        const button: HTMLButtonElement = document.createElement("button");
        button.textContent = `${action.command}`;
        button.className = "action-btn";
        button.title = action.description;
        // step 4
        bindingAction(button, async (): Promise<void> => {
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

export function renderThePlayerInventory(): void {
    if (!getEl("inventory") || !getEl("inventory-item-details")) return;
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
function openMenu(): void {
    getEl("side-menu").classList.remove("hidden");
    getEl("menu-overlay").classList.remove("hidden");
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
    getEl("side-menu").classList.add("hidden");
    getEl("menu-overlay").classList.add("hidden");
}

function openInventory(): void {
    getEl("inventory").classList.add("inventory-active");
    getEl("menu-overlay").classList.remove("hidden");
    renderThePlayerInventory();
}

function closeInventory(): void {
    getEl("inventory").classList.remove("inventory-active");
    getEl("menu-overlay").classList.add("hidden");
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

async function applyZone1Test(): Promise<void> {
    await loadZone(ZONES.TRUCK_CABIN);
}

async function applyZone2Test(): Promise<void> {
    await loadZone(ZONES.SNOWY_FOREST);
}

async function saveGame(): Promise<void> {
    saveTheDataToLocalStorage();
    await printToTerminal("Game Saved", "system");
}

// buttons
//general
getEl("button-open-side-menu").addEventListener("click", openMenu);
getEl("button-close-side-menu").addEventListener("click", closeMenu);
getEl("btn-export").addEventListener("click", exportSaveFile);
getEl("btn-import").addEventListener("click", async (): Promise<void> => {
    getEl("terminal-output").innerHTML = "";
    importSaveFile(
        async (): Promise<void> => {
            await loadZone(ZONES[currentState.currentZone]);
            await printToTerminal("Save file loaded with success", "system");
        },
        async (errorMsg: string): Promise<void> => {
            await printToTerminal(`Import error: ${errorMsg}`, "alert");
        }
    );
});
getEl("btn-open-inventory").addEventListener("click", openInventory);
getEl("btn-close-inventory").addEventListener("click", closeInventory)
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
function closeInterface(): void {
    if (!getEl("side-menu").classList.contains("hidden")) {
        closeMenu();
    } else if (getEl("inventory").classList.contains("inventory-active")) {
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
    } else if (getEl("side-menu").classList.contains("hidden") && keyEvent.key === "Escape") {
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
    if (!getEl("terminal-output")) return;
    isPrinting = true;
    const prettyLine: HTMLDivElement = document.createElement("div");
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

let confirmingReset: boolean = false;
let resetTimeout: number | null = null;
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


function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/*
function that is called to initialize game
 */
async function initGame(): Promise<void> {
    const hasSave = loadFromTheLocalStorage();
    if (hasSave) {
        await printToTerminal("Restoring previous session...", "system");
        await loadZone(ZONES[currentState.currentZone]);
    } else {
        await printToTerminal("the game story is really far from being finished, sorry :c", "alert");
        await loadZone(ZONES[GAME_INITIAL_STATE.currentZone]);
    }

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