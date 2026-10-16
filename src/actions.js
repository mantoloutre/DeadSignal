import { addFlag, hasFlag, StoryFlags } from "./gameState.js";
import { printToTerminal } from "./main.js";
import { addItemToInventory } from "./inventory.js";
export async function lookAroundYou() {
}
/*
pretty self explanatory function
 */
export async function checkTruckTrunk() {
    if (!hasFlag("CHECKED_TRUCK_TRUNK")) {
        addFlag(StoryFlags.CHECKED_TRUCK_TRUNK);
        await printToTerminal("You force the frozen trunk open with your bare hands. Inside, you spot" +
            " a heavy toolbox, a small black barrel full of wine and two spare tires.", "action");
    }
    else {
        await printToTerminal("Inside the truck, nothing changed, still a heavy toolbox, " +
            "the barrel of wine and the two spare tire.", "system");
    }
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
    await addItemToInventory("winterGlove");
}
export async function lookInGloveBoxInTruckCabin() {
    await printToTerminal("You open the glove box you look what is inside. you find 2 flares and " +
        "the truck's insurance paper", "action");
    addFlag("OPENED_GLOVE_BOX");
}
export async function addFlareTruckCabin() {
    await addANumberOfFlares(2);
}
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
