import {addFlag, hasFlag, StoryFlags} from "./gameState.js";
import {loadZone, printToTerminal} from "./main.js";
import {addItemToInventory} from "./inventory.js";
import {ZONES} from "./world.js";


export async function lookAroundYou(): Promise<void> {

}

/*
pretty self explanatory function
 */
export async function checkTruckTrunk(): Promise<void> {
    if (!hasFlag("CHECKED_TRUCK_TRUNK")) {
        addFlag(StoryFlags.CHECKED_TRUCK_TRUNK);
        await printToTerminal("You force the frozen trunk open with your bare hands. Inside, you spot" +
            " a heavy toolbox, a small black barrel full of wine and two spare tires.", "action")
    } else {
        await printToTerminal("Inside the truck, nothing changed, still a heavy toolbox, " +
            "the barrel of wine and the two spare tire.", "system");
    }
}

export async function getOutOfTheDamnTruck(): Promise<void> {
    await loadZone(ZONES.SNOWY_FOREST);
}

/*
pretty self explanatory function x1
 */
export async function addCrowBarToThePlayerInventory(): Promise<void> {
    await addItemToInventory("crowbar");
}

/*
pretty self explanatory function x2
 */
export async function addWinterGlovesToThePlayerInventory(): Promise<void> {
    await addItemToInventory("winter_gloves");
}

export async function lookInGloveBoxInTruckCabin(): Promise<void> {
    await printToTerminal("You open the glove box you look inside. you find 2 flares and " +
        "the truck's insurance paper", "action");
    addFlag("OPENED_GLOVE_BOX");
}

export async function addFlareTruckCabin(): Promise<void> {
    await addANumberOfFlares(2);
}

async function addANumberOfFlares(count: number): Promise<void> {
    if (count > 1) {
        await printToTerminal(`You take ${count} flares`, "action");
        await addItemToInventory("flare", count);
    } else if (count === 1) {
        await printToTerminal("You take 1 flare", "action");
        await addItemToInventory("flare");
    }
}