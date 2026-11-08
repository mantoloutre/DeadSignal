import { printToTerminal } from "../../ui/dom.js";
import { gameBridge } from "../gameBridge.js";
import { addFlag, setFocus } from "../gameState.js";

/*
###################
ZONE : SNOWY FOREST
###################
 */

export async function goBackToTheTruck(): Promise<void> {
  await printToTerminal("You walk back to the truck", "action");
  //TODO maybe do another thing here idk?
  await gameBridge.loadZone("OUTSIDE_TRUCK");
}

export async function inspectDirectionSign(): Promise<void> {
  await printToTerminal("You inspect the sign...", "action");
  await printToTerminal(
    "on the sign you see: left for frost basin and right to go to the gate checkpoint.",
    "system",
  );
  addFlag("INSPECTED_DIRECTION_SIGN");
  //TODO continue?
}

export async function walkTowardCheckpoint(): Promise<void> {
  await printToTerminal("You walk toward the gate checkpoint.", "action");
  await gameBridge.loadZone("GATE_CHECKPOINT");
}
export async function walkTowardFrostBasin(): Promise<void> {
  await printToTerminal(
    "the zone is not finished/in an acceptable state yet",
    "alert",
  );
  await gameBridge.loadZone("RELAY_A01_OUTSIDE");
}
export function getOutOfBreakerFocus(): void {
  setFocus(null);
}
