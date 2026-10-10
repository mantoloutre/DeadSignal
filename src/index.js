"use strict";
const buttonOpen = document.getElementById("btn-menu-open");
const buttonClose = document.getElementById("btn-menu-close");
const sideMenu = document.getElementById("side-menu");
const menuOverlay = document.getElementById("menu-overlay");
/*
simple function to open the menu by removing
the "hidden" class from their classList
 */
function openMenu() {
    sideMenu.classList.remove("hidden");
    menuOverlay.classList.remove("hidden");
}
function closeMenu() {
    sideMenu.classList.add("hidden");
    menuOverlay.classList.add("hidden");
}
buttonOpen.addEventListener("click", openMenu);
buttonClose.addEventListener("click", closeMenu);
menuOverlay.addEventListener("click", closeMenu);
/*
shortcut ( press escape to close side menu, instead of having to click a smoll button )
 */
window.addEventListener("keydown", (keyEvent) => {
    if (!sideMenu.classList.contains("hidden") && keyEvent.key === "Escape") {
        closeMenu();
    }
});
const terminalOutput = document.getElementById("terminal-output");
/*
function printterminal, take text and is void
make sure it exist
make a div as the line
give it classname for it to be able to modify easier
give it the text
appendchild to terminal output
add scroll to the terminal output?
 */ 
