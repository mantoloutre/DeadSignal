import { die, printDeathMessage, printToTerminal } from "../../ui/dom.js";
import { gameBridge } from "../gameBridge.js";
import { addFlag, setFocus } from "../gameState.js";

/*
###################
ZONE : SNOWY FOREST
###################
 */
//TODO do the documentation
export async function goBackToTheTruck(): Promise<void> {
  await printToTerminal("You walk back to the truck", "action");
  await gameBridge.loadZone("OUTSIDE_TRUCK");
}
//TODO do the documentation
export async function inspectDirectionSign(): Promise<void> {
  await printToTerminal("You inspect the sign...", "action");
  await printToTerminal(
    "on the sign you see: left for frost basin and right to go to the gate checkpoint.",
    "system",
  );
  addFlag("INSPECTED_DIRECTION_SIGN");
}
//TODO do the documentation
export async function walkTowardCheckpoint(): Promise<void> {
  await printToTerminal("You walk toward the gate checkpoint.", "action");
  await gameBridge.loadZone("GATE_CHECKPOINT");
}
//TODO do the documentation
export async function walkTowardFrostBasin(): Promise<void> {
  await printToTerminal(
    "i'm warning you, stuff doesnt work 100% for now, if you are experiencing problem, its normal",
    "alert",
  );
  await printToTerminal(
    "You walk toward the frost basin, you see a big satellite " +
      "dish and not far from it the doors to a bunker.",
    "system",
  );
  await gameBridge.loadZone("RELAY_A01_OUTSIDE");
}
//TODO do the documentation
export function getOutOfBreakerFocus(): void {
  setFocus(null);
}

/*
############################
first encounter snowy forest
############################
 */
//TODO do the documentation
export async function firstEncounterHideBehindTree(): Promise<void> {
  await printToTerminal(
    "You flatten behind the widest pine you can find and stop moving.",
    "action",
  );
  await printToTerminal(
    "The pressure keeps building, then everything goes silent.",
    "system",
  );
  await die();
  await printDeathMessage(
    "You watch the snow around the base of your tree starting to swirld upward, gently, like it's being poured.",
  );
  await printDeathMessage(
    "The tree begins to hum. Bark cracks in long lines. Sap boils out of them as steam.",
  );
  await printDeathMessage(
    "You back away. From the threeline ahead of you, twelve more trees begin to hum in the same key.",
  );
  await printDeathMessage(
    "You were never hiding, You were standing in the choir.",
  );
}
//TODO do the documentation
export async function firstEncounterHideInSnow(): Promise<void> {
  await printToTerminal("You drop your radio on the ground. Then,", "action");
  await printToTerminal(
    "You drop and dig yourself into the snow, laying flat against the frozen ground.",
    "action",
  );
  await printToTerminal(
    "Above you the pressure peaks, then releases all at once, ears popping(in a good way)",
    "system",
  );
  await printToTerminal(
    "footsteps. slow. unhurried. crossing the clearing, stopping near your hiding spot",
    "alert",
  );
  await printToTerminal(
    "It waits, you don't breathe, eventually, the steps move away.",
    "system",
  );
  await printToTerminal(
    "You stay buried for a long time, When you finally surface, to your surpise, " +
      "Your radio was left untouched.",
    "system",
  );
  addFlag("HAD_FIRST_ENCOUNTER");
  setFocus(null);
  gameBridge.renderZoneActions("SNOWY_FOREST");
}
