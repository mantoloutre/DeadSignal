import { clearTheLocalStorage, resetGameState } from "../core/gameState.ts";
import { bindingAction, bindingAsyncAction } from "../main.ts";
import { getEl } from "./dom.ts";

bindingAsyncAction(getEl("btn-die"), die);
bindingAction(getEl("btn-reset-game"), resetGame);
// this is a button to test my death mechanic
async function die(): Promise<void> {
  getEl("cheat-menu").classList.add("hidden");
  getEl("die-overlay").classList.remove("die-hidden");
}

function resetGame(): void {
  clearTheLocalStorage();
  resetGameState();
  location.reload();
}
