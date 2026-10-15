import { addFlag, hasFlag, StoryFlags } from "./gameState.js";
import { printToTerminal } from "./main.js";
import { addItemToInventory } from "./inventory.js";
export async function OpenInventory() {
}
/*
pretty self explanatory function
 */
export async function checkTruckTrunk() {
    if (!hasFlag("CHECKED_TRUCK_TRUNK")) {
        addFlag(StoryFlags.CHECKED_TRUCK_TRUNK);
        await printToTerminal("You force the frozen trunk open with your bare hands. Inside, you spot" +
            " a heavy toolbox, a small black barrel full of wine and two spare tires.", "system");
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
