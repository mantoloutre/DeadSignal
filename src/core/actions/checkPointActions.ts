/*
######################
ZONE : GATE_CHECKPOINT
######################
 */

import {die, printDeathMessage, printToTerminal} from "../../ui/dom.js";
import { gameBridge } from "../gameBridge.js";
import { addFlag, hasFlag } from "../gameState.js";
import { addItemToInventory } from "../inventory.js";
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
    "You search the shack, you find the robot's head, it seems to still have its memory module intact.",
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
    await queueQGMessage("GOT_TOWER_FIRST_TIME");
  }
}
export async function salvageMemoryModule(): Promise<void> {
  await printToTerminal(
    "You take the memory modules from the the " +
    "robot's head and then put the head back down",
    "action",
  );
  await addItemToInventory("robot_memory_module");
}
/*
############################
FIRST ENCOUNTER SHACK ACTION
############################
*/
export async function jumpOutsideWindowFirstEncounterShack(): Promise<void> {
  //TODO finish this
  await printToTerminal(
    "you grab the window frame and jump throught it.",
    "action",
  );
  await die();
  await printDeathMessage(
    "You roll, coughing, trying to get up. The pressure in you ears is gone.",
  );
  await printDeathMessage("'Its gone?', you ask yourself.");
  await printDeathMessage(
    "Suddenly, you drop on one knee even if you didn't do it on your own.",
  );
  await printDeathMessage(
    "The last thing you hear is the shack getting pulled toward you.",
  );
}
export async function hideUnderDeskFirstEncounterShack(): Promise<void> {
  //TODO finish this
  await printToTerminal(
    "You go under the guard's desk, knees to your chest, " +
    "hands over your ears",
    "action",
  );
  await printToTerminal(
    "Through the floor you feel it... " + "A hum, slow and patient.",
    "system",
  );
  await die();
  await printDeathMessage(
    "The remaining glass in the broken window starts to ring.",
  );
  await printDeathMessage("Then, the desk starts to resonate too.");
  await printDeathMessage(
    "Everything metal in the room is resonating, and your skeleton is " +
    "made of calcium, which resonates too.",
  );
  await printDeathMessage(
    "You bit down hard but you can't stop your own jaw from humming along...",
  );
  await printDeathMessage(
    "The desk above you folds flat like paper and Everything fades to black before it crushes you.",
  );
}
/*
 #######################
 FIRST ENCOUNTER ACTION
 #######################
 */
//todo do documentation
export async function hideInShowFirstEncounter(): Promise<void> {
  //todo do this :D
  await printToTerminal("work in progress", "alert");
}
/**
 * for the encouter actions outside the shack
 */
export async function makeRunForItTowardTruckFirstEncounter(): Promise<void> {
  //todo do this :D
  await printToTerminal("work in progress", "alert");
  await printToTerminal(
    "You try to make a run for toward the truck, nuh uhhh",
    "alert",
  );
}
//todo do documentation
export async function makeRunForItTowardForestFirstEncounter(): Promise<void> {
  //todo do this
  await printToTerminal("work in progress", "alert");
}
