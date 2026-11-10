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
 * function to make the drawing panel appear or disappear
 * @param appear do you want it to appear? ( true ) or disappear ( false )
 * @note When panel disappear, the innerHTML of the drawing canva gets wiped.
 * @note Had some problem with toggle, so im trying it like that.
 */
export function makeCanvaAppearOrDisappear(appear) {
    const drawingPanel = getEl("drawing-panel");
    if (appear) {
        drawingPanel.classList.add("active");
    }
    else {
        drawingPanel.classList.remove("active");
    }
}
/**
 * function to print to the drawing panel
 * @param drawingLines the string[] containing the lines to prints
 * @param fast do you want it fast or no?
 * @note this require the panel to be visible or else you won't see the drawing
 */
export async function printDrawing(drawingLines, fast) {
    isPrinting = true;
    const canva = getEl("drawing-canva");
    let drawing = "";
    for (const line of drawingLines) {
        drawing += `${drawing ? "\n" : ""}${line}`;
        canva.textContent = drawing;
        if (!fast)
            await sleep(100); //TODO find the right number
    }
    isPrinting = false;
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
    isPrinting = true;
    await sleep(2000);
    isPrinting = false;
    getEl("cheat-menu").classList.add("hidden");
    getEl("die-overlay").classList.remove("die-hidden");
}
/**
 * function to print in the drawing panel, cuz the player wont see the rest..
 * @param text
 * @param speedMs
 */
export async function drawingPanelPrintLine(text, speedMs = 15) {
    const panelPrint = getEl("drawing-panel-print");
    isPrinting = true;
    const panelLine = document.createElement("div");
    panelLine.className = `terminal-line`;
    panelPrint.append(panelLine);
    const textNode = document.createTextNode("");
    panelLine.append(textNode);
    for (let i = 0; i < text.length; ++i) {
        textNode.appendData(text[i]);
        await sleep(speedMs);
    }
    isPrinting = false;
}
