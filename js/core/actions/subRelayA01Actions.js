import { printDrawing, printToTerminal } from "../../ui/dom.js";
import { gameBridge } from "../gameBridge.js";
/*
#############
zone : BUNKER
#############
 */
/**
 * action to go outside the bunker
 */
export async function goOutsideBunkerStationA01() {
    await printToTerminal("not yet done, sorry :c", "alert"); //todo finish it
    await gameBridge.loadZone("RELAY_A01_OUTSIDE");
}
export async function openBreakerPanel() {
    await printToTerminal("not yet done, sorry :c", "alert");
    //await printDrawing()
    //todo
}
export async function closeBreakerPanel() {
    await printToTerminal("not yet done, sowy :c", "alert");
    //todo
}
/*
#####################
zone : OUTSIDE_BUNKER
#####################
 */
/**
 * inspect the mark on the bunker door foundation basically
 */
export async function inspectBunkerFoundation() {
    // here I feel like maybe player is going to discover a mark of some sort
    await printToTerminal("not yet done, sorry :c", "alert");
    //todo
}
/**
 * enter the bunker of the station A-01
 */
export async function enterBunkerStationA01() {
    await printToTerminal("not yet done, sorry :c", "alert"); //todo finish it
    await gameBridge.loadZone("RELAY_A01");
}
