//TODO make the room interface
//TODO make the player interface
interface User_Choice {
    label: string;
    action: () => void;
}

interface Room {
    id: string;
    name: string;
    description: string;
    getChoices: () => User_Choice[];
}
/*
button to open side menu
 */
const buttonOpen: HTMLButtonElement = document.getElementById("btn-menu-open") as HTMLButtonElement;
/*
button to close side menu
 */
const buttonClose: HTMLButtonElement = document.getElementById("btn-menu-close") as HTMLButtonElement;
/*
the side menu
 */
const sideMenu: HTMLElement = document.getElementById("side-menu") as HTMLElement;
/*
the side menu overlay
 */
const menuOverlay: HTMLElement = document.getElementById("menu-overlay") as HTMLElement;
/*
the terminal output place
 */
const terminalOutput: HTMLDivElement = document.getElementById("terminal-output") as HTMLDivElement;
/*
button to test print hello!
 */
const buttonPrintHi: HTMLButtonElement = document.getElementById("btn-print-hello") as HTMLButtonElement;

/*
simple function to open the menu by removing
the "hidden" class from their classList
 */
function openMenu(): void {
    sideMenu.classList.remove("hidden");
    menuOverlay.classList.remove("hidden");
}
/*
function to close side menu
 */
function closeMenu(): void {
    sideMenu.classList.add("hidden");
    menuOverlay.classList.add("hidden");
}
function printHi():void {
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
function printToTerminal(text: string): void {
    if (!terminalOutput) return;

    const prettyLine: HTMLDivElement = document.createElement("div");
    prettyLine.className = "terminal-line";
    prettyLine.textContent = text;
    terminalOutput.appendChild(prettyLine);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}