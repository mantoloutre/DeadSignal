import { printToTerminal } from "../../ui/dom.js";
import { gameBridge } from "../gameBridge.js";
import { addFlag, setFocus } from "../gameState.js";
import { doesThePlayerHasTheItem } from "../inventory.js";
/*
###################
ZONE : SNOWY FOREST
###################
 */
export async function goBackToTheTruck() {
    await printToTerminal("You walk back to the truck", "action");
    await gameBridge.loadZone("OUTSIDE_TRUCK");
}
export async function inspectDirectionSign() {
    await printToTerminal("You inspect the sign...", "action");
    await printToTerminal("on the sign you see: left for frost basin and right to go to the gate checkpoint.", "system");
    addFlag("INSPECTED_DIRECTION_SIGN");
}
export async function walkTowardCheckpoint() {
    await printToTerminal("You walk toward the gate checkpoint.", "action");
    await gameBridge.loadZone("GATE_CHECKPOINT");
}
export async function walkTowardFrostBasin() {
    await printToTerminal("i'm warning you, stuff doesnt work 100% for now, if you are experiencing problem, its normal", "alert");
    await gameBridge.loadZone("RELAY_A01_OUTSIDE");
}
export function getOutOfBreakerFocus() {
    setFocus(null);
}
