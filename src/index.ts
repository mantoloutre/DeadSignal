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

const buttonOpen: HTMLButtonElement = document.getElementById("btn-menu-open") as HTMLButtonElement;
const buttonClose: HTMLButtonElement = document.getElementById("btn-menu-close") as HTMLButtonElement;
const sideMenu: HTMLElement = document.getElementById("side-menu") as HTMLElement;
const menuOverlay: HTMLElement = document.getElementById("menu-overlay") as HTMLElement;

/*
simple function to open the menu by removing
the "hidden" class from their classList
 */
function openMenu(): void {
    sideMenu.classList.remove("hidden");
    menuOverlay.classList.remove("hidden");
}

function closeMenu(): void {
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

const terminalOutput: HTMLDivElement = document.getElementById("terminal-output") as HTMLDivElement;
/*
function printterminal, take text and is void
make sure it exist
make a div as the line
give it classname for it to be able to modify easier
give it the text
appendchild to terminal output
add scroll to the terminal output?
 */