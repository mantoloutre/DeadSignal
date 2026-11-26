import {
  Drawings,
  type DrawingsName,
  isDrawingPanelOpenOrNot,
  setIsOpenDrawingPanel,
} from "../../data/drawings.ts";
import {
  drawingPanelPrintLine,
  getEl,
  makeCanvaAppearOrDisappear,
  printDrawing,
  printToTerminal,
} from "../../ui/dom.ts";
import { gameBridge } from "../gameBridge.ts";
import { addFlag, currentState, hasFlag, setFocus } from "../gameState.ts";
import { doesThePlayerHasTheItem } from "../inventory.ts";
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
  const terminalOutput: HTMLDivElement = getEl("terminal-output");
  terminalOutput.classList.add("breaker-panel-open");
  terminalOutput.scrollTo(0, 0);
  setIsOpenDrawingPanel(true);
  makeCanvaAppearOrDisappear(true);
  await draw("BREAKER_PANEL_RELAY_A01", false);
}
//todo make a variable to not do the setfocus ig..
export async function closeBreakerPanel(): Promise<void> {
  if (hasFlag("ENCOUNTER_IN_PROGRESS_NOW")) {
    setFocus("FIRST_ENCOUNTER");
  } else {
    setFocus(null);
  }
  const terminalOutput: HTMLDivElement = getEl("terminal-output");
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
export async function inspectBunkerFoundation(): Promise<void> {
  await printToTerminal(
    "You scrape the frost off the base of the bunker and find grooves " +
      "cut into the concrete.",
    "action",
  );
  await printToTerminal(
    "Not cracks. Grooves. Deliberate, Long parallel lines, like something " +
      "dragged its claws along the wall, or like someone was scoring " +
      "it to mesure something.",
    "system",
  );
  await printToTerminal(
    "At the deepest groove, there's a symbol you don't reconize: a circle " +
      "with a wave passing through it.",
    "log",
  );
  await printToTerminal("Someone carved this from the inside.", "alert");
  addFlag("EXAMINED_TOWER_STRUTS");
}

/**
 * enter the bunker of the station A-01
 */
export async function enterBunkerStationA01(): Promise<void> {
  await printToTerminal(
    "warning - stuff might be broken ( prob not but just warning you )",
    "alert",
  );
  if (doesThePlayerHasTheItem("keller_keycard")) {
    await printToTerminal(
      "You swipe the keycard in the slot and the big bunker's doors opens.",
      "action",
    );
    await printToTerminal(
      "The seals around the frame crack free one by one. exhaling stale " +
        "air that smells like dust and old machines.",
      "system",
    );
    await printToTerminal(
      "The lights inside kick on, row by row, leading down. " +
        "Something down here is still drawing power",
      "system",
    );
    await gameBridge.loadZone("RELAY_A01");
  } else {
    await printToTerminal(
      "There is a visible keycard slot," +
        " however, you have no keycard to fill that slot",
      "system",
    );
  }
}
export async function killRelayFirstEncounter(): Promise<void> {
  //to not repeat myself
  //todo close breaker panel before settings the frequency like during the set of the frequency 940.700
  await closeBreakerPanel();
  const closed: boolean = await verifyDrawingPanelClosed();
  const printer = closed
    ? (msg: string): Promise<void> => printToTerminal(msg, "system")
    : (msg: string): Promise<void> => drawingPanelPrintLine(msg);
  //shut down every interrupter
  currentState.relayA01BreakerPanel.int1 = false;
  currentState.relayA01BreakerPanel.int2 = false;
  currentState.relayA01BreakerPanel.int3 = false;
  await printer(
    closed
      ? "You sprint hastily toward the breaker panel and slam every interrupter down."
      : "You hastily slam every interrupter down.",
  );
}
export async function killRelayFirstEncounterV2(): Promise<void> {
  await closeBreakerPanel();
}
/*
###################
breaker panel focus
###################
 */
/**
 * utility function to not repeat my self to draw
 * this one is only for the breaker panel.
 * @param whichDrawing which drawing do you want?
 * @param speed fast ( true ) or slow ( false )
 */
async function draw(whichDrawing: DrawingsName, speed: boolean): Promise<void> {
  await printDrawing(
    Drawings[whichDrawing].executing(currentState.relayA01BreakerPanel),
    speed,
  );
}

/**
 * function to toggle the third interrupter
 */
export async function toggleInt3(): Promise<void> {
  if (!(await verifyDrawingPanelClosed())) return;
  currentState.relayA01BreakerPanel.int3 =
    !currentState.relayA01BreakerPanel.int3;
  await draw("BREAKER_PANEL_RELAY_A01", true);
}

/**
 * function to toggle the second interrupter
 */
export async function toggleInt2(): Promise<void> {
  if (!(await verifyDrawingPanelClosed())) return;
  currentState.relayA01BreakerPanel.int2 =
    !currentState.relayA01BreakerPanel.int2;
  await draw("BREAKER_PANEL_RELAY_A01", true);
}
/**
 * function to toggle the first interrupter
 */
export async function toggleInt1(): Promise<void> {
  if (!(await verifyDrawingPanelClosed())) return;
  currentState.relayA01BreakerPanel.int1 =
    !currentState.relayA01BreakerPanel.int1;
  await draw("BREAKER_PANEL_RELAY_A01", true);
}

//focus for the wire

/**
 * self-explanatory function ( for the breaker panel )
 */
export async function tryWithWireCutter(): Promise<void> {
  await printToTerminal(
    "You remove the plastic grip of the wire cutter's handles, " +
      "revealing the metal.",
    "action",
  );
  await printToTerminal(
    "You attach each end of the wire to a handle of the wireCutter, " +
      "connection is now up.",
    "action",
  );
  addFlag("REPAIRED_CONNEXION_WITH_WIRECUTTER");
  currentState.relayA01BreakerPanel.wire1 = true;
  setFocus("BREAKER_PANEL");
}
export async function tryWithCrowbar(): Promise<void> {
  if (doesThePlayerHasTheItem("duct_tape")) {
    await printToTerminal(
      "You take the crowbar and some duct tape and you stick it on the " +
        "breakerPanel.",
      "action",
    );
    await printToTerminal(
      "You then take both end of the wire and carefully link them using " +
        "the metal from the crowbar.",
      "action",
    );
    //just a funny thing if the player doesnt have gloves to
    //at lest insulate his hands from the electricity
    //todo maybe remove this i guess?
    if (!doesThePlayerHasTheItem("winter_gloves")) {
      await printToTerminal(
        "As you connect the second end of the wire, you feel " +
          "a little tingly sensation, (like that you get when you " +
          "test the end of a cable low voltage on your tongue)," +
          "but it isn't too bad.",
        "system",
      );
      await printToTerminal(
        "DO NOT TRY THIS AT HOME, I WILL NOT BE HELD RESPONSIBLE",
        "alert",
      );
    }
  } else {
    await printToTerminal(
      "You take the crowbar and you do your best to make it stay " +
        "in place even if you don't have any duct tape.",
      "action",
    );
    await printToTerminal(
      "You then do you best to connect the two end of the wires " +
        "together using the crowbar as a link for electricity.",
      "action",
    );
  }
}

/**
 * pretty self-explanatory function
 */
export async function smtElseThanBreakerPanelConnection(): Promise<void> {
  await drawingPanelPrintLine(
    "You decide its better to not try to repair the connection yet.",
  );
  setFocus("BREAKER_PANEL");
}
/**
 * self-explanatory function ( for the breaker panel )
 */
export async function tryWithDuctTape(): Promise<void> {
  await printToTerminal(
    "You take both end of the wire and attach them with tape, " +
      "connection is now up.",
    "action",
  );
  addFlag("REPAIRED_CONNEXION_WITH_DUCT_TAPE");
  currentState.relayA01BreakerPanel.wire1 = true;
  setFocus("BREAKER_PANEL");
}
export async function inspectConnection(): Promise<void> {
  await drawingPanelPrintLine(
    "The connection from the first switch to the calibrator was cut " +
      "to prevent it from being turned back on.",
  );
  await drawingPanelPrintLine(
    "The cut is clean. Not sabotage from outside. This was done from " +
      "inside, calmly, by someone who knew exactly which wire mattered.",
  );
  await drawingPanelPrintLine("how do you want to try and repair it?");
  setFocus("BREAKER_PANEL_CONNECTION");
  gameBridge.renderZoneActions("RELAY_A01");
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
