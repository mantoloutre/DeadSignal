import { sleep } from "../main.js";
/*
used to optimize the instanciation of elements
 */
export const elementCache = new Map();
//for the printing stuff
export let isPrinting = false;
/*
get an element from the ui
@param id the id of the element we want
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
export function flashButton(btn) {
    btn.classList.add("btn-error-flash");
    setTimeout(() => btn.classList.remove("btn-error-flash"), 300);
}
/*
function to print to the terminal :D
@param from the place the text come from(log(yellow), alert(red), normal(green) )
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
