/*
######################
ZONE : GATE_CHECKPOINT
######################
 */
import { die, printDeathMessage, printToTerminal } from "../../ui/dom.js";
import { gameBridge } from "../gameBridge.js";
import { addFlag, hasFlag } from "../gameState.js";
import { addItemToInventory } from "../inventory.js";
import { queueQGMessage } from "../radioFrequency.js";
// go in the shack (checkpoint)
export async function goInTheShack_GateCheckpoint() {
    await printToTerminal("You walk inside the destroyed shack", "action");
    await gameBridge.loadZone("GATE_CHECKPOINT_SHACK");
}
/*
walk toward the intersection of : outside watchpost, broken down truck, frozen lake
 */
export async function walkBackSnowyForestTowardTruck() {
    await printToTerminal("You go back in the forest toward the intersection" +
        " of the frozen lake and the truck", "action");
    await gameBridge.loadZone("SNOWY_FOREST");
}
/*
#############################
ZONE : GATE_CHECKPOINT_SHACK
############################
 */
export async function goOutsideTheShack_GateCheckpoint() {
    await printToTerminal("You go back outside of the shack", "action");
    await gameBridge.loadZone("GATE_CHECKPOINT");
}
export async function searchTheGuardShack() {
    await printToTerminal("You search the shack, you find the robot's head, it seems to still have its memory module intact.", "action");
    addFlag("SEARCHED_GUARD_SHACK");
}
export async function walkTowardMainWatchPost() {
    await printToTerminal("You walk toward the main watch tower and you arrive at destination", "action");
    await printToTerminal("You are now standing outside the watch tower", "system");
    await gameBridge.loadZone("WATCH_POST_OUTSIDE");
    if (!hasFlag("GOT_QG_MESSAGE_GOT_TO_TOWER")) {
        addFlag("GOT_QG_MESSAGE_GOT_TO_TOWER");
        await queueQGMessage("GOT_TOWER_FIRST_TIME");
    }
}
export async function salvageMemoryModule() {
    await printToTerminal("You take the memory modules from the the " +
        "robot's head and then put the head back down", "action");
    await addItemToInventory("robot_memory_module");
}
/*
############################
FIRST ENCOUNTER SHACK ACTION
############################
*/
/**
 * function for a pretty self-explanatory reason
 */
export async function jumpOutsideWindowFirstEncounterShack() {
    await printToTerminal("you grab the window frame and throw yourself through it.", "action");
    await die();
    await printDeathMessage("You roll, coughing, trying to get up. The pressure in you ears is gone.");
    await printDeathMessage("'Its gone?', you ask yourself.");
    await printDeathMessage("Suddenly, you drop on one knee even if you didn't do it on your own.");
    await printDeathMessage("The last thing you hear is the shack collapsing.. toward you as if pulled.");
}
export async function hideUnderDeskFirstEncounterShack() {
    await printToTerminal("You squeeze yourself under the guard's desk, knees to your chest, " +
        "hands over your ears.", "action");
    await printToTerminal("Through the floor you feel it: A rising hum, slow and patient.", "system");
    await die();
    await printDeathMessage("The remaining glass in the broken window starts to ring.");
    await printDeathMessage("Then, the desk starts to resonate too.");
    await printDeathMessage("Everything metal in the room is resonating, and your skeleton is " +
        "made of calcium, which resonates too.");
    await printDeathMessage("You bit down hard but you can't stop your own jaw from humming along...");
    await printDeathMessage("The desk above you folds flat like paper and Everything fades to black before it crushes you.");
}
/*
 #######################
 FIRST ENCOUNTER ACTION
 #######################
 */
/**
 * function to handle the hide in snow action for the
 * first encounter in the checkpoint
 */
export async function hideInShowFirstEncounter() {
    await printToTerminal("You jump into the snowbank beside the shack and burrow in.", "action");
    await printToTerminal("Muffled, cold, blind, the hum in the air passes over you like a searchlight.", "system");
    await die();
    await printDeathMessage("It passes. It stops. Then it goes back.");
    await printDeathMessage("The snow around you begins to hum all together, even through your coat.");
    await printDeathMessage("You realize too late the snow is conducting it straight into you.");
    await printDeathMessage("Yours ears pop. Warmth blood spreads down your collar as " +
        "everything fades to black.");
}
/**
 * for the encouter actions outside the shack
 */
export async function makeRunForItTowardTruckFirstEncounter() {
    await printToTerminal("You start sprinting toward the truck.", "action");
    await printToTerminal("Every crunch of snow underfoot sounds impossibly loud...", "system");
    await die();
    await printDeathMessage("Halfway there, the humming catches up to you, not chasing, " +
        "matching your pace exactly.");
    await printDeathMessage("You risk one glance only once back. The shape keeps perfect distance, gliding, not running.");
    await printDeathMessage("'It isnt't hunting. it's herding.' The thought arruves alkready knowing its awnser.");
    await printDeathMessage("The truck driver's door swing open ahead of you, welcoming, and you never slow down...");
}
/**
 * function to handle the action fo running toward the forest
 * for the first encounter in the checkpoint
 */
export async function makeRunForItTowardForestFirstEncounter() {
    await printToTerminal("You run the other way, toward the forest, puttings trees between you and whatever is incoming.", "action");
    await die();
    await printDeathMessage("Trees whip past. The hum doesn't fade. Between the trunks you catch silhouettes moving parallel to you.");
    await printDeathMessage("Whatever is following you doesn't seem alone... or happy...");
    await printDeathMessage("The trees stop. You hit the edge of a clearing you swear was supposed to be forest, and the vibration surrounds you.");
    await printDeathMessage("You keep running into the black until the black runs out of ground.");
}
