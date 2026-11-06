/*
used to optimize the instanciation of elements
 */
export const elementCache = new Map();
//for the printing stuff
export let isPrinting = false;
/**
 * get an element from the ui
 * @param id the id of the element we want
 */
export function getEl(id) {
    const cached = elementCache.get(id);
    if (cached) {
        return cached;
    }
    const element = document.getElementById(id);
    if (!element) {
        throw new Error(`Element ${id} not found in DOM`);
    }
    elementCache.set(id, element);
    return element;
}
/**
 * flash the button ( mainly used when you want
 * to show the player that he can't do the action right now )
 * @param btn the button you want to flash
 */
export function flashButton(btn) {
    btn.classList.add("btn-error-flash");
    setTimeout(() => btn.classList.remove("btn-error-flash"), 300);
}
/**
 * function to print in the terminal :D
 * @param text the text you want to print
 * @param from who is supposed to be sending it?
 * @param speedMs the speed of the printing (already defined)
 */
export async function printToTerminal(text, from, speedMs = 15) {
    const outputTerminal = getEl("terminal-output");
    isPrinting = true;
    const prettyLine = document.createElement("div");
    prettyLine.className = `terminal-line ${from}`;
    outputTerminal.append(prettyLine);
    const textNode = document.createTextNode("");
    prettyLine.append(textNode);
    for (let i = 0; i < text.length; ++i) {
        textNode.appendData(text[i]);
        outputTerminal.scrollTop = outputTerminal.scrollHeight;
        await sleep(speedMs);
    }
    isPrinting = false;
}
export function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
/**
 * function used to display death message
 * @param text the text you want to print
 * @param speedMs speed of the printing ( already defined )
 */
export async function printDeathMessage(text, speedMs = 15) {
    const outPutDeathMessage = getEl("death-message");
    isPrinting = true;
    const deathLine = document.createElement("div");
    deathLine.className = `terminal-line death`;
    outPutDeathMessage.append(deathLine);
    const textNode = document.createTextNode("");
    deathLine.append(textNode);
    for (let i = 0; i < text.length; ++i) {
        textNode.appendData(text[i]);
        await sleep(speedMs);
    }
    isPrinting = false;
}
/**
 * pretty self-explanatory function
 */
export async function die() {
    getEl("cheat-menu").classList.add("hidden");
    getEl("die-overlay").classList.remove("die-hidden");
}
