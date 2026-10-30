import { clearTheLocalStorage, resetGameState } from "../core/gameState";
import { flashButton, getEl } from "./dom.js";
let confirmingReset = false;
let resetTimeout = null;
getEl("btn-restart").addEventListener("click", async () => {
    const buttonRestart = getEl("btn-restart");
    if (!confirmingReset) {
        // first click
        confirmingReset = true;
        buttonRestart.textContent = "Are you sure? (click again)";
        flashButton(buttonRestart);
        // 4 seconds timeout
        resetTimeout = window.setTimeout(() => {
            confirmingReset = false;
            buttonRestart.textContent = "Restart the whole game";
        }, 4000);
        return;
    }
    if (resetTimeout !== null) {
        window.clearTimeout(resetTimeout);
    }
    confirmingReset = false;
    buttonRestart.textContent = "Restart the whole game";
    clearTheLocalStorage();
    resetGameState();
    //reloading the game
    location.reload();
});
