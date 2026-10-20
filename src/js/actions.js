import { addFlag, hasFlag } from "./gameState.js";
import { loadZone, printToTerminal } from "./main.js";
import { addItemToInventory } from "./inventory.js";
import { setFocus, ZONES } from "./world.js";
export async function lookAroundYou() {
}
/*
##################
ZONE : TRUCK CABIN
##################
 */
/*
pretty self explanatory function
 */
export async function checkTruckTrunk() {
    if (!hasFlag("OPENED_TRUCK_TRUNK_INIT")) {
        addFlag("OPENED_TRUCK_TRUNK_INIT");
        await printToTerminal("You force the frozen trunk open with your hands. Inside, you spot" +
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
pretty self explanatory function x2
 */
export async function addWinterGlovesToThePlayerInventory() {
    addFlag("TOOK_WINTER_GLOVE");
    await printToTerminal("you take the gloves in the glove box", "action");
    await addItemToInventory("winter_gloves");
}
export async function lookInGloveBoxInTruckCabin() {
    await printToTerminal("You open the glove box you look inside. you find 2 flares, " +
        "the truck's insurance paper and a pair of winter gloves.", "action");
    addFlag("OPENED_GLOVE_BOX");
}
/*
function to add 2 flare to inventory
 */
export async function addFlareTruckCabin() {
    await addItemToInventory("flare", 2);
    await printToTerminal("you took 2 flares from the glove's box", "action");
}
/*
###################
ZONE : SNOWY FOREST
###################
 */
export async function goBackInThePrettyTruck() {
    await loadZone(ZONES.TRUCK_CABIN);
}
export async function openTheHoodAndOrLookAtTheEngineInit() {
    if (!hasFlag("OPENED_HOOD_TRUCK_INIT")) {
        addFlag("OPENED_HOOD_TRUCK_INIT");
        await printToTerminal(hasFlag("TOOK_WINTER_GLOVE")
            ? "You open the truck's hood"
            : "You open the hood with your hands, its really cold out there without gloves...", "action");
    }
    else {
        await printToTerminal("What you see is the engine that see to be missing a piston, " +
            "which might explain the big explosion and the hole in the hood", "system");
    }
}
export async function addCrowBarToThePlayerInventory() {
    await printToTerminal("you take the crowbar from the trunk", "action");
    await addItemToInventory("crowbar");
}
export async function openToolBoxTruckTrunkInit() {
    if (!hasFlag("OPENED_TOOLBOX_INIT")) {
        setFocus("TOOLBOX");
        await printToTerminal("you try to open the toolbox, but the lock appear to be frozen, " +
            "how do you want to try to open it?", "system");
    }
    else {
        await printToTerminal("you look back in the toolbox", "system");
    }
}
/*
simple function to get out of the toolbox focus
*/
export async function outOfToolBoxFocus() {
    await printToTerminal("you decide to do something else than trying to open the toolbox", "action");
    setFocus(null);
}
export async function takeAjustableWrenchFromToolBoxInit() {
    await printToTerminal("you pickup the ajustable wrench from the toolbox", "action");
    await addItemToInventory("ajustable_wrench");
}
export async function takeDuctTapeFromToolBoxInit() {
    await printToTerminal("you pickup the roll of duct tape from the toolbox", "action");
    await addItemToInventory("duct_tape");
}
export async function forceToolBoxOpenWithHand() {
    await printToTerminal("You try to open the latch with your hands, it doesnt seem to budge", "action");
    //TODO something else?
}
export async function pryToolBoxWithCrowbar() {
    await printToTerminal("you hit a few time the latch with your crowbar and manage to break it." +
        " The toolbox is now open", "action");
    addFlag("OPENED_TOOLBOX_INIT");
    setFocus(null);
}
/*
######
OTHER
######
 */ 
