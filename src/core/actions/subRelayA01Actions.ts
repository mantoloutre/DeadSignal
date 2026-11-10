import {
  Drawings,
  type DrawingsName,
  getBreakerPanelV2,
  isDrawingPanelOpenOrNot,
  setIsOpenDrawingPanel,
} from "../../data/drawings.ts";
import type { Drawing } from "../../data/types.ts";
import {
  drawingPanelPrintLine,
  makeCanvaAppearOrDisappear,
  printDrawing,
  printToTerminal,
} from "../../ui/dom.ts";
import { gameBridge } from "../gameBridge.ts";
import { BreakerStateRelayA01, setFocus } from "../gameState.ts";
/*
#############
zone : BUNKER
#############
 */
/**
 * action to go outside the bunker
 */
export async function goOutsideBunkerStationA01(): Promise<void> {
  await printToTerminal(
    "You walk toward the bunker, which serve as the first relay station",
    "action",
  );
  await gameBridge.loadZone("RELAY_A01_OUTSIDE");
}
export async function goBackToDirectionSign(): Promise<void> {
  await gameBridge.loadZone("SNOWY_FOREST");
}
export async function openBreakerPanel(): Promise<void> {
  setFocus("BREAKER_PANEL");
  setIsOpenDrawingPanel(true);
  makeCanvaAppearOrDisappear(true);
  await draw("BREAKER_PANEL_RELAY_A01", false);
  //await printDrawing()
  //todo
}
export async function closeBreakerPanel(): Promise<void> {
  setFocus(null);
  setIsOpenDrawingPanel(false);
  makeCanvaAppearOrDisappear(false);

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
export async function inspectBunkerFoundation(): Promise<void> {
  // here I feel like maybe player is going to discover a mark of some sort
  await printToTerminal("not yet done, sorry :c", "alert");
  //todo
}

/**
 * enter the bunker of the station A-01
 */
export async function enterBunkerStationA01(): Promise<void> {
  await printToTerminal(
    "i'm warning you, stuff doesnt work 100% for now, if you are experiencing problem with the drawing panel, please " +
      "reload your page, it might help make it show up cuz its supposed to show up, if it doesnt work, press ctrl + f5 to " +
      "reload the cache it might also help.",
    "alert",
  ); //todo finish it
  await gameBridge.loadZone("RELAY_A01");
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
async function draw(whichDrawing: DrawingsName, speed: boolean): Promise<void> {
  await printDrawing(
    Drawings[whichDrawing].executing(BreakerStateRelayA01),
    speed,
  );
}

/**
 * function to toggle the third interrupter
 */
export async function toggleInt3(): Promise<void> {
  if (!(await verifyDrawingPanelClosed())) return;
  BreakerStateRelayA01.int3 = !BreakerStateRelayA01.int3;
  await draw("BREAKER_PANEL_RELAY_A01", true);
}

/**
 * function to toggle the second interrupter
 */
export async function toggleInt2(): Promise<void> {
  if (!(await verifyDrawingPanelClosed())) return;
  BreakerStateRelayA01.int2 = !BreakerStateRelayA01.int2;
  await draw("BREAKER_PANEL_RELAY_A01", true);
}
/**
 * function to toggle the first interrupter
 */
export async function toggleInt1(): Promise<void> {
  if (!(await verifyDrawingPanelClosed())) return;
  BreakerStateRelayA01.int1 = !BreakerStateRelayA01.int1;
  await draw("BREAKER_PANEL_RELAY_A01", true);
}

//focus for the wire
export async function tryWithCrowbar(): Promise<void> {
  //todo
}
export async function tryWithDuctTape(): Promise<void> {
  //todo
}
export async function inspectConnection(): Promise<void> {
  //todo
}
/**
 * nuh uh ( for drawing panel )
 */
export async function nuhUh(): Promise<void> {
  await drawingPanelPrintLine("NUH UHHH ( not done yet forgive me )");
}
/**
 * function to not repeat myself when verifying if
 * the drawing panel is open
 * @returns true if its closed, false if not
 */
async function verifyDrawingPanelClosed(): Promise<boolean> {
  if (!isDrawingPanelOpenOrNot()) {
    await printToTerminal(
      "The breaker panel is not open, how did you do that...?",
      "alert",
    );
    return false;
  }
  return true;
}
