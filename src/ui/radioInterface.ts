import { currentState } from "../core/gameState.js";
import {
  appendDigitToFrequency,
  getFormattedBuffer,
  handleFrequency,
  removeOneFromBuffer,
} from "../core/radioFrequency.js";
import { bindingAction, toggleOverlay } from "../main.js";
import { flashButton, getEl } from "./dom.js";

// buttons ( radio interface )
const keypadButtons: NodeListOf<HTMLButtonElement> =
  document.querySelectorAll<HTMLButtonElement>(".radio-key");
const currentFrequencyDisplay: HTMLParagraphElement = getEl(
  "radio-current-frequency",
);
keypadButtons.forEach((btn: HTMLButtonElement): void => {
  btn.addEventListener("click", (): void => {
    const value: string = btn.value;
    if (!btn.value || !currentFrequencyDisplay) return;
    currentFrequencyDisplay.textContent = appendDigitToFrequency(value);
  });
});
getEl("btn-delete-key").addEventListener("click", (): void => {
  currentFrequencyDisplay.textContent = removeOneFromBuffer().toString();
});
getEl("btn-tune").addEventListener("click", async (): Promise<void> => {
  const buffer: string = getFormattedBuffer();
  if (buffer.length === 7 && buffer !== "---.---") {
    currentState.currentFrequency = buffer;
    getEl("frequency").textContent = buffer;
    closeRadioInterface();
    await handleFrequency();
  } else {
    flashButton(getEl("btn-tune"));
  }
});

export function closeRadioInterface(): void {
  getEl("radio-interface").classList.toggle("radio-interface-active");
  toggleOverlay();
  if (!getEl("side-menu").classList.contains("hidden")) {
    toggleOverlay();
  }
}
export function openRadioInterface(): void {
  getEl("radio-interface").classList.add("radio-interface-active");
  if (getEl("side-menu").classList.contains("hidden")) {
    toggleOverlay();
  }
}
bindingAction(getEl("btn-open-radio-interface"), openRadioInterface);
