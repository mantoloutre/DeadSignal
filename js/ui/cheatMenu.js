import { clearTheLocalStorage, resetGameState } from "../core/gameState.js";
import { bindingAction, bindingAsyncAction } from "../main.js";
import { getEl } from "./dom.js";
bindingAsyncAction(getEl("btn-die"), die);
bindingAction(getEl("btn-reset-game"), resetGame);
// this is a button to test my death mechanic
async function die() {
    getEl("cheat-menu").classList.add("hidden");
    getEl("die-overlay").classList.remove("die-hidden");
}
function resetGame() {
    clearTheLocalStorage();
    resetGameState();
    location.reload();
}
