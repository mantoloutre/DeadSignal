import { addFlag, hasFlag } from "./gameState.js";
import { loadZone, printToTerminal } from "./main.js";
import { addItemToInventory } from "./inventory.js";
import { ZONES } from "./world.js";
import { StoryFlags } from "./storyFlags.js";
export async function lookAroundYou() {
}
/*
pretty self explanatory function
 */
export async function checkTruckTrunk() {
    if (!hasFlag("OPENED_TRUCK_TRUNK_INIT")) {
        addFlag(StoryFlags.OPENED_TRUCK_TRUNK_INIT);
        await printToTerminal("You force the frozen trunk open with your bare hands. Inside, you spot" +
            " a heavy toolbox, a small black barrel full of wine and two spare tires.", "action");
    }
    else {
        await printToTerminal("Inside the truck, nothing changed, still a heavy toolbox, " +
            "the barrel of wine and the two spare tire.", "system");
    }
}
export async function getOutOfTheDamnTruck() {
    await loadZone(ZONES.SNOWY_FOREST);
}
/*
pretty self explanatory function x1
 */
export async function addCrowBarToThePlayerInventory() {
    await addItemToInventory("crowbar");
}
/*
pretty self explanatory function x2
 */
export async function addWinterGlovesToThePlayerInventory() {
    await addItemToInventory("winter_gloves");
}
export async function lookInGloveBoxInTruckCabin() {
    await printToTerminal("You open the glove box you look inside. you find 2 flares and " +
        "the truck's insurance paper", "action");
    addFlag("OPENED_GLOVE_BOX");
}
export async function addFlareTruckCabin() {
    await addANumberOfFlares(2);
}
/*
export async function openToolBoxTruckTrunk(): Promise<void> {
    if (!hasFlag(StoryFlags.OPENED_TOOLBOX_INIT)){
        await printToTerminal("")
    }
}
*/
async function addANumberOfFlares(count) {
    if (count > 1) {
        await printToTerminal(`You take ${count} flares`, "action");
        await addItemToInventory("flare", count);
    }
    else if (count === 1) {
        await printToTerminal("You take 1 flare", "action");
        await addItemToInventory("flare");
    }
}
