//TODO make the room interface
//TODO make the player interface
//imports
import {
    exportSaveFile
} from "./gameState.js";

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

// elements
const sideMenu: HTMLElement = document.getElementById("side-menu") as HTMLElement;
const sideMenuOverlay: HTMLElement = document.getElementById("menu-overlay") as HTMLElement;
const terminalOutput: HTMLDivElement = document.getElementById("terminal-output") as HTMLDivElement;


/*
simple function to open the menu by removing
the "hidden" class from their classList
 */
function openMenu(): void {
    sideMenu.classList.remove("hidden");
    sideMenuOverlay.classList.remove("hidden");
}

/*
function to close side menu
 */
function closeMenu(): void {
    sideMenu.classList.add("hidden");
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
buttonOpenSideMenu.addEventListener("click", openMenu);
buttonCloseSideMenu.addEventListener("click", closeMenu);
buttonPrintHi.addEventListener("click", printHiNormal);
buttonPrintHiAlert.addEventListener("click", printHiAlert);
buttonExport.addEventListener("click", exportSaveFile);
buttonPrintHiLog.addEventListener("click", printHiLog);

// others
sideMenuOverlay.addEventListener("click", closeMenu);

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


/*
function to print to the terminal :D
@param from the place the text come from(log(yellow), alert(red), normal(green) )
 */
async function printToTerminal(text: string, from: string, speedMs: number = 15): Promise<void> {
    if (!terminalOutput) return;
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

}

function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}
/*
function that is call to initialize game
 */
async function initGame(): Promise<void> {
    await printToTerminal("TACTICAL TRUCK 04 - MAIN ENGINE DOWN.", "system");
    await printToTerminal("LOADING FILE FOR MISSION #882...", "system");
    await printToTerminal("ERROR, I HAVEN'T DONE MORE THAN THIS FOR NOW T-T, sorry", "alert");
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