//TODO make the room interface
//TODO make the player interface
//imports
import { exportSaveFile } from "./gameState.js";
// buttons
const buttonOpenSideMenu = document.getElementById("btn-menu-open");
const buttonCloseSideMenu = document.getElementById("btn-menu-close");
const buttonPrintHi = document.getElementById("btn-print-hello");
const buttonPrintHiAlert = document.getElementById("btn-print-hello-alert");
const buttonExport = document.getElementById("btn-export");
const buttonImport = document.getElementById("btn-import");
const buttonPrintHiLog = document.getElementById("btn-print-hello-log");
// elements
const sideMenu = document.getElementById("side-menu");
const sideMenuOverlay = document.getElementById("menu-overlay");
const terminalOutput = document.getElementById("terminal-output");
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
async function printHiNormal() {
    await printToTerminal("hi :D", "system");
}
async function printHiAlert() {
    await printToTerminal("hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii :D", "alert");
}
async function printHiLog() {
    await printToTerminal("hi :D", "log");
}
// buttons
bindingAction(buttonPrintHi, printHiNormal);
bindingAction(buttonPrintHiLog, printHiLog);
bindingAction(buttonPrintHiAlert, printHiAlert);
buttonOpenSideMenu.addEventListener("click", openMenu);
buttonCloseSideMenu.addEventListener("click", closeMenu);
buttonExport.addEventListener("click", exportSaveFile);
// others
sideMenuOverlay.addEventListener("click", closeMenu);
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
    await printToTerminal("TACTICAL TRUCK 04 - MAIN ENGINE DOWN.", "system");
    await printToTerminal("LOADING FILE FOR MISSION #882...", "system");
    await printToTerminal("ERROR, I HAVEN'T DONE MORE THAN THIS FOR NOW T-T, sorry", "alert");
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
