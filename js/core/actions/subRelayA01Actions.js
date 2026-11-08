import { getBreakerPanelV2, isDrawingPanelOpenOrNot, setIsOpenDrawingPanel, } from "../../data/drawings.js";
import { makeCanvaAppearOrDisappear, printDrawing, printToTerminal, } from "../../ui/dom.js";
import { gameBridge } from "../gameBridge.js";
import { BreakerStateRelayA01, currentState } from "../gameState.js";
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
    await printToTerminal("ik its really simple... its in early stage forgive me :c", "alert");
    setIsOpenDrawingPanel(true);
    makeCanvaAppearOrDisappear(true);
    await printDrawing(getBreakerPanelV2(BreakerStateRelayA01), false);
    //await printDrawing()
    //todo
}
export async function closeBreakerPanel() {
    await printToTerminal("ik its really simple... its in early stage forgive me :c", "alert");
    setIsOpenDrawingPanel(false);
    makeCanvaAppearOrDisappear(true);
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
/*
###################
breaker panel focus
###################
 */
export async function toggleInt1() {
    if (!isDrawingPanelOpenOrNot()) {
        await printToTerminal("The breaker panel is not open, how did you do that...?", "alert");
        return;
    }
    BreakerStateRelayA01.int1 = !BreakerStateRelayA01.int1;
    await printDrawing(getBreakerPanelV2(BreakerStateRelayA01), true);
}
