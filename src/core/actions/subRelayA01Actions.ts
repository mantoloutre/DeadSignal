import {
  isDrawingPanelOpenOrNot,
  setIsOpenDrawingPanel,
} from "../../data/drawings.ts";
import { makeCanvaAppearOrDisappear, printToTerminal } from "../../ui/dom.ts";
import { gameBridge } from "../gameBridge.ts";
/*
#############
zone : BUNKER
#############
 */
/**
 * action to go outside the bunker
 */
export async function goOutsideBunkerStationA01(): Promise<void> {
  await printToTerminal("not yet done, sorry :c", "alert"); //todo finish it
  await gameBridge.loadZone("RELAY_A01_OUTSIDE");
}
export async function openBreakerPanel(): Promise<void> {
  await printToTerminal(
    "ik its really simple... its in early stage forgive me :c",
    "alert",
  );
  setIsOpenDrawingPanel(true);
  makeCanvaAppearOrDisappear(true);
  //await printDrawing()
  //todo
}
export async function closeBreakerPanel(): Promise<void> {
  await printToTerminal(
    "ik its really simple... its in early stage forgive me :c",
    "alert",
  );
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
export async function inspectBunkerFoundation(): Promise<void> {
  // here I feel like maybe player is going to discover a mark of some sort
  await printToTerminal("not yet done, sorry :c", "alert");
  //todo
}

/**
 * enter the bunker of the station A-01
 */
export async function enterBunkerStationA01(): Promise<void> {
  await printToTerminal("not yet done, sorry :c", "alert"); //todo finish it
  await gameBridge.loadZone("RELAY_A01");
}
/*
###################
breaker panel focus
###################
 */

export async function toggleInt1(on: number): Promise<void> {
  if (!isDrawingPanelOpenOrNot()) {
    await printToTerminal(
      "The breaker panel is not open, how did you do that...?",
      "alert",
    );
    return;
  }
}
