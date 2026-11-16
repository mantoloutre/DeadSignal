import { Drawings, isDrawingPanelOpenOrNot, setIsOpenDrawingPanel, } from "../../data/drawings.js";
import { drawingPanelPrintLine, getEl, makeCanvaAppearOrDisappear, printDrawing, printToTerminal, } from "../../ui/dom.js";
import { gameBridge } from "../gameBridge.js";
import { addFlag, currentState, setFocus } from "../gameState.js";
import { doesThePlayerHasTheItem } from "../inventory.js";
/*
#############
zone : BUNKER
#############
 */
/**
 * action to go outside the bunker
 */
export async function goOutsideBunkerStationA01() {
    await printToTerminal("You walk toward the bunker, which serve as the first relay station", "action");
    await gameBridge.loadZone("RELAY_A01_OUTSIDE");
}
export async function goBackToDirectionSign() {
    await gameBridge.loadZone("SNOWY_FOREST");
}
export async function openBreakerPanel() {
    setFocus("BREAKER_PANEL");
    const terminalOutput = getEl("terminal-output");
    terminalOutput.classList.add("breaker-panel-open");
    terminalOutput.scrollTo(0, 0);
    setIsOpenDrawingPanel(true);
    makeCanvaAppearOrDisappear(true);
    await draw("BREAKER_PANEL_RELAY_A01", false);
}
export async function closeBreakerPanel() {
    setFocus(null);
    const terminalOutput = getEl("terminal-output");
    terminalOutput.classList.remove("breaker-panel-open");
    terminalOutput.scrollTo(0, terminalOutput.scrollHeight);
    setIsOpenDrawingPanel(false);
    makeCanvaAppearOrDisappear(false);
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
    await printToTerminal("you inspect the base of the bunker and you see something ( nothing ) " +
        "( not yet done done ) :c", "action");
    //todo
}
/**
 * enter the bunker of the station A-01
 */
export async function enterBunkerStationA01() {
    await printToTerminal("warning - stuff might be broken ( prob not but just warning you )", "alert");
    if (doesThePlayerHasTheItem("keller_keycard")) {
        await printToTerminal("You swipe the keycard in the slot and the big bunker's doors opens.", "action"); //todo finish the text
        await gameBridge.loadZone("RELAY_A01");
    }
    else {
        await printToTerminal("There is a visible keycard slot," +
            " however, you have no keycard to fill that slot", "system");
    }
}
/*
###################
breaker panel focus
###################
 */
/**
 * utility function to not repeat my self to draw
 * @param whichDrawing which drawing do you want?
 * @param speed fast ( true ) or slow ( false )
 */
async function draw(whichDrawing, speed) {
    await printDrawing(Drawings[whichDrawing].executing(currentState.relayA01BreakerPanel), speed);
}
/**
 * function to toggle the third interrupter
 */
export async function toggleInt3() {
    if (!(await verifyDrawingPanelClosed()))
        return;
    currentState.relayA01BreakerPanel.int3 =
        !currentState.relayA01BreakerPanel.int3;
    await draw("BREAKER_PANEL_RELAY_A01", true);
}
/**
 * function to toggle the second interrupter
 */
export async function toggleInt2() {
    if (!(await verifyDrawingPanelClosed()))
        return;
    currentState.relayA01BreakerPanel.int2 =
        !currentState.relayA01BreakerPanel.int2;
    await draw("BREAKER_PANEL_RELAY_A01", true);
}
/**
 * function to toggle the first interrupter
 */
export async function toggleInt1() {
    if (!(await verifyDrawingPanelClosed()))
        return;
    currentState.relayA01BreakerPanel.int1 =
        !currentState.relayA01BreakerPanel.int1;
    await draw("BREAKER_PANEL_RELAY_A01", true);
}
//focus for the wire
/**
 * self-explanatory function ( for the breaker panel )
 */
export async function tryWithWireCutter() {
    await printToTerminal("You remove the plastic grip of the wire cutter's handles, " +
        "revealing the metal.", "action");
    await printToTerminal("You attach each end of the wire to a handle of the wireCutter, " +
        "connection is now up.", "action");
    addFlag("REPAIRED_CONNEXION_WITH_WIRECUTTER");
    currentState.relayA01BreakerPanel.wire1 = true;
}
/**
 * pretty self-explanatory function
 */
export async function smtElseThanBreakerPanelConnection() {
    await drawingPanelPrintLine("You decide its better to not try to repair the connection yet.");
    setFocus("BREAKER_PANEL");
}
/**
 * self-explanatory function ( for the breaker panel )
 */
export async function tryWithDuctTape() {
    await printToTerminal("You take both end of the wire and attach them with tape, " +
        "connection is now up.", "action");
    addFlag("REPAIRED_CONNEXION_WITH_DUCT_TAPE");
    currentState.relayA01BreakerPanel.wire1 = true;
}
export async function inspectConnection() {
    await drawingPanelPrintLine("The connection from the first switch to the calibrator was cut " +
        "to prevent it from being turned back on.");
    await drawingPanelPrintLine("how do you want to try and repair it?");
    setFocus("BREAKER_PANEL_CONNECTION");
    gameBridge.renderZoneActions("RELAY_A01");
    //todo
}
/**
 * nuh uh ( for drawing panel )
 */
export async function nuhUh() {
    await drawingPanelPrintLine("NUH UHHH ( not done yet forgive me )");
}
/**
 * function to not repeat myself when verifying if
 * the drawing panel is open
 * @returns true if its closed, false if not
 */
async function verifyDrawingPanelClosed() {
    if (!isDrawingPanelOpenOrNot()) {
        await printToTerminal("The breaker panel is not open, how did you do that...?", "alert");
        return false;
    }
    return true;
}
