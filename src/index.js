"use strict";
/*
button to open side menu
 */
const buttonOpen = document.getElementById("btn-menu-open");
const buttonCloseSideMenu = document.getElementById("btn-menu-close");
const sideMenu = document.getElementById("side-menu");
const sideMenuOverlay = document.getElementById("menu-overlay");
/*
the terminal output place
 */
const terminalOutput = document.getElementById("terminal-output");
/*
button to test print hello!
 */
const buttonPrintHi = document.getElementById("btn-print-hello");
const buttonExport = document.getElementById("btn-export");
const buttonImport = document.getElementById("btn-import");
/*
simple function to open the menu by removing
the "hidden" class from their classList
 */
function openMenu() {
    sideMenu.classList.remove("hidden");
    sideMenuOverlay.classList.remove("hidden");
}
/*
function to close side menu
 */
function closeMenu() {
    sideMenu.classList.add("hidden");
    sideMenuOverlay.classList.add("hidden");
}
function printHi() {
    printToTerminal("hi :D");
}
buttonOpen.addEventListener("click", openMenu);
buttonCloseSideMenu.addEventListener("click", closeMenu);
sideMenuOverlay.addEventListener("click", closeMenu);
buttonPrintHi.addEventListener("click", printHi);
/*
shortcut ( press escape to close side menu, instead of having to click a smoll button )
 */
window.addEventListener("keydown", (keyEvent) => {
    if (!sideMenu.classList.contains("hidden") && keyEvent.key === "Escape") {
        closeMenu();
    }
    else if (sideMenu.classList.contains("hidden") && keyEvent.key === "Escape") {
        openMenu();
    }
});
/*
function to print to the terminal :D
 */
function printToTerminal(text) {
    if (!terminalOutput)
        return;
    const prettyLine = document.createElement("div");
    prettyLine.className = "terminal-line";
    prettyLine.textContent = text;
    terminalOutput.appendChild(prettyLine);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}
