import {addFlag, hasFlag} from "./gameState.js";
import {loadZone, printToTerminal} from "./main.js";
import {addItemToInventory} from "./inventory.js";
import {setFocus, ZONES} from "./world.js";


/*
##################
ZONE : TRUCK CABIN
##################
 */

/*
function to check the truck's trunk at the begining of the game
 */
export async function checkTruckTrunk(): Promise<void> {
    if (!hasFlag("OPENED_TRUCK_TRUNK_INIT")) {
        addFlag("OPENED_TRUCK_TRUNK_INIT");
        await printToTerminal("You force the frozen trunk open with your hands. Inside, you spot" +
            " a heavy toolbox, a small black barrel full of wine and two spare tires.", "action")
    } else {
        await printToTerminal("Inside the truck, nothing changed, still a heavy toolbox, " +
            "the barrel of wine and the two spare tire.", "system");
    }
}

export async function getOutOfTheDamnTruck(): Promise<void> {
    await loadZone(ZONES.OUTSIDE_TRUCK);
}

/*
function to add winter gloves to the player inventory when the player look inside the glove box
and decide to take the gloves
 */
export async function addWinterGlovesToThePlayerInventory(): Promise<void> {
    addFlag("TOOK_WINTER_GLOVE");
    await printToTerminal("you take the gloves in the glove box", "action")
    await addItemToInventory("winter_gloves");
}

/*
look inside the glove box to be able to take what's inside
 */
export async function lookInGloveBoxInTruckCabin(): Promise<void> {
    await printToTerminal("You open the glove box you look inside. you find 2 flares, " +
        "the truck's insurance paper and a pair of winter gloves.", "action");
    addFlag("OPENED_GLOVE_BOX");
}

/*
function to add 2 flare to inventory when the player take them from the glove box
 */
export async function addFlareTruckCabin(): Promise<void> {
    await addItemToInventory("flare", 2);
    await printToTerminal("you took 2 flares from the glove's box", "action");
}

export async function readEmergencyManual(): Promise<void> {
    await printToTerminal("")
}

/*
#####################
ZONE : OUTSIDE TRUCK
#####################
 */

/*
function to load the zone truck cabin, in case the player want to go back inside the truck
 */
export async function goBackInThePrettyTruck(): Promise<void> {
    await loadZone(ZONES.TRUCK_CABIN);
}

/*
function that depending on if the hood is already open, will display different chat
 */
export async function openTheHoodAndOrLookAtTheEngineInit(): Promise<void> {
    if (!hasFlag("OPENED_HOOD_TRUCK_INIT")) {
        addFlag("OPENED_HOOD_TRUCK_INIT");
        await printToTerminal(hasFlag("TOOK_WINTER_GLOVE")
            ? "You open the truck's hood"
            : "You open the hood with your hands, its really cold out there without gloves...", "action");
    } else {
        await printToTerminal("What you see is the engine that see to be missing a piston, " +
            "which might explain the big explosion and the hole in the hood", "system");
    }
}

/*
add a crowbar to the player inventory when the player decide to take it from the truck's trunk
 */
export async function addCrowBarToThePlayerInventory(): Promise<void> {
    await printToTerminal("you take the crowbar from the trunk", "action");
    await addItemToInventory("crowbar");
}

/*
open the truck's trunk when the player decides to do so
 */
export async function openToolBoxTruckTrunkInit(): Promise<void> {
    if (!hasFlag("OPENED_TOOLBOX_INIT")) {
        setFocus("TOOLBOX");
        await printToTerminal("you try to open the toolbox, but the lock appear to be frozen, " +
            "how do you want to try to open it?", "system");
    } else {
        await printToTerminal("you look back in the toolbox", "system");
    }
}

/*
simple function to get out of the toolbox focus
*/
export async function outOfToolBoxFocus(): Promise<void> {
    await printToTerminal("you decide to do something else than trying to open the toolbox", "action");
    setFocus(null);
}

export async function takeAdjustableWrenchFromToolBoxInit(): Promise<void> {
    await printToTerminal("you pickup the adjustable wrench from the toolbox", "action");
    await addItemToInventory("adjustable_wrench");
}

export async function takeDuctTapeFromToolBoxInit(): Promise<void> {
    await printToTerminal("you pickup the roll of duct tape from the toolbox", "action");
    await addItemToInventory("duct_tape");
}

export async function forceToolBoxOpenWithHand(): Promise<void> {
    await printToTerminal("You try to open the latch with your hands, it doesnt seem to budge", "action");
    //TODO something else?
}

export async function pryToolBoxWithCrowbar(): Promise<void> {
    await printToTerminal("you hit a few time the latch with your crowbar and manage to break it." +
        " The toolbox is now open", "action");
    addFlag("OPENED_TOOLBOX_INIT");
    setFocus(null);
}

export async function walkTowardSnowyForestFromOutsideTruck(): Promise<void> {
    await printToTerminal("You walk toward the forest away from the truck", "action");
    //TODO load zone
    loadZone(ZONES.SNOWY_FOREST);
}

/*
###################
ZONE : SNOWY FOREST
###################
 */

export async function goBackToTheTruck(): Promise<void> {
    await printToTerminal("You walk back to the truck", "action");
    //TODO maybe do another thing here idk?
    await loadZone(ZONES.OUTSIDE_TRUCK);
}

export async function walkTowardMainWatchPost(): Promise<void> {
    await printToTerminal("You walk toward the main watch tower and you arrive at destination", "action");
    await printToTerminal("You are now standing outside the watch tower", "system");
    loadZone(ZONES.WATCH_POST_OUTSIDE);
    //TODO add lore ?

}

export async function inspectDirectionSign(): Promise<void> {
    await printToTerminal("You inspect the sign...", "action");
    await printToTerminal("on the sign you see: left for frozen lake and right to go to the gate checkpoint", "system");
    addFlag("INSPECTED_DIRECTION_SIGN");
    //TODO continue?
}

/*
########################
ZONE : OUTSIDE WATCHPOST
########################
 */

/*
walk toward the intersection of : outside watchpost, broken down truck, frozen lake
 */
export async function walkBackSnowyForestTowardTruck(): Promise<void> {
    await printToTerminal("You go back in the forest toward the intersection" +
        " of the frozen lake and the truck", "action");
    loadZone(ZONES.SNOWY_FOREST);
}
export async function goInsideTheWatchPost(): Promise<void> {
    await printToTerminal("You go inside the watch post", "action"); //TODO make the lore
    loadZone(ZONES.WATCH_POST);
}

/*
#################
ZONE : WATCH_POST
#################
 */

export async function walkBackOutside(): Promise<void> {
    await printToTerminal("You walk back outside the watch tower", "action");
    loadZone(ZONES.WATCH_POST_OUTSIDE)
}
/*
######
OTHER
######
 */