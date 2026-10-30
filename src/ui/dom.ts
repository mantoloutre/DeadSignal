import type { fromType } from "../data/types.js";
import { sleep } from "../main.js";

export interface UIElements {
  // buttons ( test )
  "btn-print-hi-system": HTMLButtonElement;
  "btn-print-hi-log": HTMLButtonElement;
  "btn-print-hi-alert": HTMLButtonElement;
  "btn-apply-zone-truck-cabin": HTMLButtonElement;
  "btn-apply-zone-snowy-forest": HTMLButtonElement;
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
  // div elements
  "side-menu": HTMLDivElement;
  "cheat-menu": HTMLDivElement;
  "menu-overlay": HTMLDivElement;
  inventory: HTMLDivElement;
  "inventory-items-list": HTMLDivElement;
  "terminal-output": HTMLDivElement;
  "terminal-input": HTMLDivElement;
  "zone-action": HTMLDivElement;
  "zone-tag": HTMLParagraphElement;
  "radio-interface": HTMLDivElement;
  // paragraph elements
  "inventory-item-details": HTMLParagraphElement;
  "radio-current-frequency": HTMLParagraphElement;
  frequency: HTMLParagraphElement;
}
/*
used to optimize the instanciation of elements
 */
export const elementCache = new Map<string, HTMLElement>();
//for the printing stuff
export let isPrinting: boolean = false;
/*
get an element from the ui
@param id the id of the element we want
 */
export function getEl<Key extends keyof UIElements>(id: Key): UIElements[Key] {
  const cached = elementCache.get(id);
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
export function flashButton(btn: HTMLButtonElement): void {
  btn.classList.add("btn-error-flash");
  setTimeout((): void => btn.classList.remove("btn-error-flash"), 300);
}

/*
function to print to the terminal :D
@param from the place the text come from(log(yellow), alert(red), normal(green) )
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
