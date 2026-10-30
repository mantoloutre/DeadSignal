import { loadZone } from "../../main";
import { printToTerminal } from "../../ui/dom";
import { addFlag } from "../gameState";
/*
###################
ZONE : SNOWY FOREST
###################
 */
export async function goBackToTheTruck() {
    await printToTerminal("You walk back to the truck", "action");
    //TODO maybe do another thing here idk?
    await loadZone("OUTSIDE_TRUCK");
}
export async function inspectDirectionSign() {
    await printToTerminal("You inspect the sign...", "action");
    await printToTerminal("on the sign you see: left for frozen lake and right to go to the gate checkpoint", "system");
    addFlag("INSPECTED_DIRECTION_SIGN");
    //TODO continue?
}
