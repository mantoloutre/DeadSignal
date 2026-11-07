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
  // paragraph elements
  "inventory-item-details": HTMLParagraphElement;
  "radio-current-frequency": HTMLParagraphElement;
  frequency: HTMLParagraphElement;
  // list element
  "radio-interface-help-list": HTMLUListElement;
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
export async function printDrawing(drawingLines: string[]): Promise<void> {
  let drawing: string = "";
  let oldDrawing: string = "";
  const canva: HTMLPreElement = getEl("drawing-canva");
  for (const line of drawingLines) {
    oldDrawing = drawing;
    drawing = `${oldDrawing}\n${line}`;
    canva.textContent = drawing;
  }
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
