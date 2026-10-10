"use strict";
/*
button to open side menu
 */
const buttonOpen = document.getElementById("btn-menu-open");
/*
button to close side menu
 */
const buttonClose = document.getElementById("btn-menu-close");
/*
the side menu
 */
const sideMenu = document.getElementById("side-menu");
/*
the side menu overlay
 */
const menuOverlay = document.getElementById("menu-overlay");
/*
the terminal output place
 */
const terminalOutput = document.getElementById("terminal-output");
/*
button to test print hello!
 */
const buttonPrintHi = document.getElementById("btn-print-hello");
/*
simple function to open the menu by removing
the "hidden" class from their classList
 */
function openMenu() {
    sideMenu.classList.remove("hidden");
    menuOverlay.classList.remove("hidden");
}
/*
function to close side menu
 */
function closeMenu() {
    sideMenu.classList.add("hidden");
    menuOverlay.classList.add("hidden");
}
function printHi() {
    printToTerminal("hi :D");
}
buttonOpen.addEventListener("click", openMenu);
buttonClose.addEventListener("click", closeMenu);
menuOverlay.addEventListener("click", closeMenu);
buttonPrintHi.addEventListener("click", printHi);
/*
shortcut ( press escape to close side menu, instead of having to click a smoll button )
 */
window.addEventListener("keydown", (keyEvent) => {
    if (!sideMenu.classList.contains("hidden") && keyEvent.key === "Escape") {
        closeMenu();
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
