//TODO make the room interface
//TODO make the player interface


/*
button to open side menu
 */
const buttonOpenSideMenu: HTMLButtonElement = document.getElementById("btn-menu-open") as HTMLButtonElement;
const buttonCloseSideMenu: HTMLButtonElement =
    document.getElementById("btn-menu-close") as HTMLButtonElement;
const sideMenu: HTMLElement = document.getElementById("side-menu") as HTMLElement;
const sideMenuOverlay: HTMLElement = document.getElementById("menu-overlay") as HTMLElement;
const terminalOutput: HTMLDivElement = document.getElementById("terminal-output") as HTMLDivElement;
/*
button to test print hello!
 */
const buttonPrintHi: HTMLButtonElement =
    document.getElementById("btn-print-hello") as HTMLButtonElement;
const buttonPrintHiAlert: HTMLButtonElement =
    document.getElementById("btn-print-hello-alert") as HTMLButtonElement;
const buttonExport: HTMLButtonElement = document.getElementById("btn-export") as HTMLButtonElement;
const buttonImport: HTMLButtonElement = document.getElementById("btn-import") as HTMLButtonElement;

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

function printHiNormal(): void {
    printToTerminal("hi :D", "system");
}
function printHiAlert(): void {
    printToTerminal("hi :D", "alert");
}
buttonOpenSideMenu.addEventListener("click", openMenu);
buttonCloseSideMenu.addEventListener("click", closeMenu);
sideMenuOverlay.addEventListener("click", closeMenu);
buttonPrintHi.addEventListener("click", printHiNormal);
buttonPrintHiAlert.addEventListener("click", printHiAlert);
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
function printToTerminal(text: string, from: string): void {
    if (!terminalOutput) return;
    const prettyLine: HTMLDivElement = document.createElement("div");
    prettyLine.className = `terminal-line ${from}`;
    prettyLine.textContent = text;
    terminalOutput.appendChild(prettyLine);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}
/*
function that is call to initialize game
 */
function initGame():void{
    printToTerminal("TACTICAL TRUCK 04 - MAIN ENGINE DOWN.", "system");
    printToTerminal("LOADING FILE FOR MISSION #882...", "system");
    printToTerminal("ERROR, I HAVEN'T DONE MORE THAN THIS FOR NOW T-T, sorry", "alert");
}
window.addEventListener("DOMContentLoaded", initGame);