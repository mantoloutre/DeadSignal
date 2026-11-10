import type { fromType } from "../data/types.js";

export interface UIElements {
  // buttons
  "button-open-side-menu": HTMLButtonElement;
  "button-close-side-menu": HTMLButtonElement;
  "btn-export": HTMLButtonElement;
  "btn-import": HTMLButtonElement;
  "btn-close-inventory": HTMLButtonElement;
  "btn-open-inventory": HTMLButtonElement;
  "btn-restart": HTMLButtonElement;
  "btn-save": HTMLButtonElement;
  "btn-open-radio-interface": HTMLButtonElement;
  "btn-close-radio-interface": HTMLButtonElement;
  "btn-k1": HTMLButtonElement;
  "btn-k2": HTMLButtonElement;
  "btn-k3": HTMLButtonElement;
  "btn-k4": HTMLButtonElement;
  "btn-k5": HTMLButtonElement;
  "btn-k6": HTMLButtonElement;
  "btn-k7": HTMLButtonElement;
  "btn-k8": HTMLButtonElement;
  "btn-k9": HTMLButtonElement;
  "btn-p": HTMLButtonElement;
  "btn-k0": HTMLButtonElement;
  "btn-tune": HTMLButtonElement;
  "btn-delete-key": HTMLButtonElement;
  "btn-skip-to-outside-watch-tower": HTMLButtonElement;
  "btn-close-cheat-menu": HTMLButtonElement;
  "btn-die": HTMLButtonElement;
  "btn-reset-game": HTMLButtonElement;
  "btn-skip-to-after-memory-module": HTMLButtonElement;
  // div elements
  "side-menu": HTMLDivElement;
  "cheat-menu": HTMLDivElement;
  "menu-overlay": HTMLDivElement;
  "die-overlay": HTMLDivElement;
  inventory: HTMLDivElement;
  "inventory-items-list": HTMLDivElement;
  "terminal-output": HTMLDivElement;
  "terminal-input": HTMLDivElement;
  "zone-action": HTMLDivElement;
  "zone-tag": HTMLParagraphElement;
  "radio-interface": HTMLDivElement;
  "radio-interface-help": HTMLDivElement;
  "death-message": HTMLDivElement;
  "drawing-panel": HTMLDivElement;
  "drawing-panel-print": HTMLDivElement;
  // paragraph elements
  "inventory-item-details": HTMLParagraphElement;
  "radio-current-frequency": HTMLParagraphElement;
  frequency: HTMLParagraphElement;
  // list element
  "radio-interface-help-list": HTMLUListElement;
  // pre formatted text elements
  "drawing-canva": HTMLPreElement;
}
/*
used to optimize the instanciation of elements
 */
export const elementCache = new Map<string, HTMLElement>();
//for the printing stuff
export let isPrinting: boolean = false;
/**
 * get an element from the ui
 * @param id the id of the element we want
 */
export function getEl<Key extends keyof UIElements>(id: Key): UIElements[Key] {
  const cached: HTMLElement | undefined = elementCache.get(id);
  if (cached) {
    return cached as UIElements[Key];
  }
  const element: HTMLElement | null = document.getElementById(id);
  if (!element) {
    throw new Error(`Element ${id} not found in DOM`);
  }
  elementCache.set(id, element);
  return element as UIElements[Key];
}

/**
 * flash the button ( mainly used when you want
 * to show the player that he can't do the action right now )
 * @param btn the button you want to flash
 */
export function flashButton(btn: HTMLButtonElement): void {
  btn.classList.add("btn-error-flash");
  setTimeout((): void => btn.classList.remove("btn-error-flash"), 300);
}

/**
 * function to make the drawing panel appear or disappear
 * @param appear do you want it to appear? ( true ) or disappear ( false )
 * @note When panel disappear, the innerHTML of the drawing canva gets wiped.
 * @note Had some problem with toggle, so im trying it like that.
 */
export function makeCanvaAppearOrDisappear(appear: boolean): void {
  const drawingPanel: HTMLDivElement = getEl("drawing-panel");
  if (appear) {
    drawingPanel.classList.add("active");
  } else {
    drawingPanel.classList.remove("active");
  }
}
/**
 * function to print to the drawing panel
 * @param drawingLines the string[] containing the lines to prints
 * @param fast do you want it fast or no?
 * @note this require the panel to be visible or else you won't see the drawing
 */
export async function printDrawing(
  drawingLines: string[],
  fast: boolean,
): Promise<void> {
  isPrinting = true;
  const canva: HTMLPreElement = getEl("drawing-canva");
  let drawing: string = "";
  for (const line of drawingLines) {
    drawing += `${drawing ? "\n" : ""}${line}`;
    canva.textContent = drawing;
    if (!fast) await sleep(100); //TODO find the right number
  }
  isPrinting = false;
}
/**
 * function to print in the terminal :D
 * @param text the text you want to print
 * @param from who is supposed to be sending it?
 * @param speedMs the speed of the printing (already defined)
 */
export async function printToTerminal(
  text: string,
  from: fromType,
  speedMs: number = 15,
): Promise<void> {
  const outputTerminal: HTMLDivElement = getEl("terminal-output");
  isPrinting = true;
  const prettyLine: HTMLDivElement = document.createElement("div");
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
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * function used to display death message
 * @param text the text you want to print
 * @param speedMs speed of the printing ( already defined )
 */
export async function printDeathMessage(
  text: string,
  speedMs: number = 15,
): Promise<void> {
  const outPutDeathMessage: HTMLDivElement = getEl("death-message");
  isPrinting = true;
  const deathLine: HTMLDivElement = document.createElement("div");
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
export async function die(): Promise<void> {
  getEl("cheat-menu").classList.add("hidden");
  getEl("die-overlay").classList.remove("die-hidden");
}

/**
 * function to print in the drawing panel, cuz the player wont see the rest..
 * @param text
 * @param speedMs
 */
export async function drawingPanelPrintLine(
  text: string,
  speedMs: number = 15,
): Promise<void> {
  const panelPrint: HTMLDivElement = getEl("drawing-panel-print");
  isPrinting = true;
  const panelLine: HTMLDivElement = document.createElement("div");
  panelLine.className = `terminal-line`;
  panelPrint.append(panelLine);
  const textNode: Text = document.createTextNode("");
  panelLine.append(textNode);
  for (let i: number = 0; i < text.length; ++i) {
    textNode.appendData(text[i]);
    await sleep(speedMs);
  }
  isPrinting = false;
}
