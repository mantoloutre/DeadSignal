/*
######################
ZONE : GATE_CHECKPOINT
######################
 */

import { printToTerminal } from "../../ui/dom.js";
import { gameBridge } from "../gameBridge.js";
import { addFlag, hasFlag } from "../gameState.js";
import { queueQGMessage } from "../radioFrequency.js";

// go in the shack (checkpoint)
export async function goInTheShack_GateCheckpoint(): Promise<void> {
  await printToTerminal("You walk inside the destroyed shack", "action");
  await gameBridge.loadZone("GATE_CHECKPOINT_SHACK");
}
/*
walk toward the intersection of : outside watchpost, broken down truck, frozen lake
 */
export async function walkBackSnowyForestTowardTruck(): Promise<void> {
  await printToTerminal(
    "You go back in the forest toward the intersection" +
      " of the frozen lake and the truck",
    "action",
  );
  await gameBridge.loadZone("SNOWY_FOREST");
}
/*
#############################
ZONE : GATE_CHECKPOINT_SHACK
############################
 */
export async function goOutsideTheShack_GateCheckpoint(): Promise<void> {
  await printToTerminal("You go back outside of the shack", "action");
  await gameBridge.loadZone("GATE_CHECKPOINT");
}
export async function searchTheGuardShack(): Promise<void> {
  await printToTerminal(
    "You search the shack, you ", //TODO finish this
    "action",
  );
  addFlag("SEARCHED_GUARD_SHACK");
}
export async function walkTowardMainWatchPost(): Promise<void> {
  await printToTerminal(
    "You walk toward the main watch tower and you arrive at destination",
    "action",
  );
  await printToTerminal(
    "You are now standing outside the watch tower",
    "system",
  );
  await gameBridge.loadZone("WATCH_POST_OUTSIDE");
  if (!hasFlag("GOT_QG_MESSAGE_GOT_TO_TOWER")) {
    addFlag("GOT_QG_MESSAGE_GOT_TO_TOWER");
    await queueQGMessage("QG_MESSAGE_GOT_TOWER_FIRST_TIME");
  }
  //TODO add lore ?
}
