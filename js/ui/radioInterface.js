import { currentState } from "../core/gameState.js";
import { appendDigitToFrequency, getFormattedBuffer, handleFrequency, removeOneFromBuffer, setBuffer, } from "../core/radioFrequency.js";
import { bindingAction, toggleOverlay } from "../main.js";
import { flashButton, getEl } from "./dom.js";
// buttons ( radio interface )
const keypadButtons = document.querySelectorAll(".radio-key");
const currentFrequencyDisplay = getEl("radio-current-frequency");
keypadButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        const value = btn.value;
        if (!btn.value || !currentFrequencyDisplay)
            return;
        currentFrequencyDisplay.textContent = appendDigitToFrequency(value);
    });
});
getEl("btn-delete-key").addEventListener("click", () => {
    currentFrequencyDisplay.textContent = removeOneFromBuffer().toString();
});
getEl("btn-tune").addEventListener("click", async () => {
    const buffer = getFormattedBuffer();
    if (buffer.length === 7 && buffer !== "---.---") {
        currentState.currentFrequency = buffer;
        getEl("frequency").textContent = buffer;
        closeRadioInterface();
        await handleFrequency();
    }
    else {
        flashButton(getEl("btn-tune"));
    }
});
//close the radio interface
export function closeRadioInterface() {
    getEl("radio-interface").classList.toggle("radio-interface-active");
    toggleOverlay();
    if (!getEl("side-menu").classList.contains("hidden")) {
        toggleOverlay();
    }
}
//open the radio interface
export function openRadioInterface() {
    getEl("radio-interface").classList.add("radio-interface-active");
    if (getEl("side-menu").classList.contains("hidden")) {
        toggleOverlay();
    }
}
bindingAction(getEl("btn-open-radio-interface"), openRadioInterface);
/*
to set the display and current frequency to the right values
 */
export function setDisplayFrequency() {
    setBuffer(currentState.currentFrequency);
    const theFrequency = getFormattedBuffer();
    getEl("frequency").textContent = theFrequency;
    getEl("radio-current-frequency").textContent = theFrequency;
}
