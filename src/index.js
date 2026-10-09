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
