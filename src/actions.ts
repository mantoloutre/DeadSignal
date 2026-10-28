import {addFlag, hasFlag, isCommandInactive} from "./gameState.js";
import {loadZone, printToTerminal, renderZoneActions} from "./main.js";
import {addItemToInventory} from "./inventory.js";
import {setFocus, ZONES} from "./world.js";
import {addDiscoveredFrequency, queueQGMessage} from "./radioFrequency.js";


/*
##################
ZONE : TRUCK CABIN
##################
 */

/*
function to check the truck's trunk at the beginning of the game
 */
export async function checkTruckTrunk(): Promise<void> {
    if (!hasFlag("OPENED_TRUCK_TRUNK_INIT")) {
        addFlag("OPENED_TRUCK_TRUNK_INIT");
        await printToTerminal("You force the frozen trunk open with your hands. Inside, you spot" +
            " a heavy toolbox, a small black barrel full of wine, a crowbar and two spare tires.", "action")
    } /*else {
        await printToTerminal("Inside the truck, nothing changed, still a heavy toolbox, " +
            "the barrel of wine and the two spare tire.", "system");
    }*/ //TODO maybe add this later on
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
    await printToTerminal("you took the gloves from the glove box", "action")
    await addItemToInventory("winter_gloves");
}

/*
look inside the glove box to be able to take what's inside
 */
export async function lookInGloveBoxInTruckCabin(): Promise<void> {
    await printToTerminal("You open the glove box you look inside. you find 2 flares, " +
        "the truck's insurance paper, a pair of winter gloves and the emergency manual", "action");
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
    await printToTerminal("In case of real Emergency, please set the " +
        "radio at the following frequency: 112.400 MHz", "system");
    await printToTerminal("You are to not contact the QG as the QG will contact you first " +
        "when you set your radio at this frequency", "system");
    addFlag("READ_MANUAL");
    addDiscoveredFrequency("QG_FREQUENCY");
}

export async function addTruckInsurancePaper(): Promise<void> {
    await addItemToInventory("truck_insurance_papers");
    await printToTerminal("you took the truck's insurance papers... (why?)", "action");
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
        await printToTerminal("What you see is the engine that seem to be missing a piston, " +
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
    await printToTerminal("you pickup the adjustable wrench from the toolbox.", "action");
    await addItemToInventory("adjustable_wrench");
}

export async function takeDuctTapeFromToolBoxInit(): Promise<void> {
    await printToTerminal("you pickup the roll of duct tape from the toolbox.", "action");
    await addItemToInventory("duct_tape");
}

export async function forceToolBoxOpenWithHand(): Promise<void> {
    await printToTerminal("You try to open the latch with your hands, it doesnt seem to budge.", "action");
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
    await loadZone(ZONES.SNOWY_FOREST);
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
    await loadZone(ZONES.WATCH_POST_OUTSIDE);
    if (!hasFlag("GOT_QG_MESSAGE_GOT_TO_TOWER")) {
        addFlag("GOT_QG_MESSAGE_GOT_TO_TOWER");
        await queueQGMessage("QG_MESSAGE_GOT_TOWER_FIRST_TIME");
    }
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
    await loadZone(ZONES.SNOWY_FOREST);
}

export async function goInsideTheWatchPost(): Promise<void> {
    await printToTerminal("You go inside the watch post", "action");
    await loadZone(ZONES.WATCH_POST);
    if (!hasFlag("DISCOVERED_KELLER_BODY")) {
        addFlag("DISCOVERED_KELLER_BODY");
        await printToTerminal("You find the light switch in the dark and turn the lights back on.", "action");
        await printToTerminal("Technician Vance Keller lies slumped on his side against the lower chassis" +
            ", his body frozen in a rigid and unnatural pose", "log");

        await printToTerminal("His chest is crushed clean through his sternum, yet " +
            "the exterior fabric shows no impact, claw marks or tool strikes.", "log");
        await printToTerminal("Keller's body is coated in a fine, brittle crust of frost, far too solid " +
            "for a man whose station went dark only an hour ago.", "log");
        await printToTerminal("The crystalline residue isn't from the draft; It radiates " +
            "directly outward from his blown ear canals and across the spiderweb " +
            "fracture of his visor", "log");
        //the player choices ( multiple choice
        await printToTerminal("What do you do?", "system");
        await printToTerminal("Dead body: Tell the QG you found Keller's dead body", "system");
        await printToTerminal("Note left: Tell the QG about the note Keller wrote before dying", "system");
        //TODO do the rest
        setFocus("TELLING_QG");
        renderZoneActions(ZONES.WATCH_POST);
    }
    //TODO make player choose what he want to do next
}

/*
#################
ZONE : WATCH_POST
#################
 */

export async function walkBackOutside(): Promise<void> {
    await printToTerminal("You walk back outside the watch tower", "action");
    await loadZone(ZONES.WATCH_POST_OUTSIDE);
}

//Tell QG for the dead body
export async function tellQGAboutDeadBody(): Promise<void> {
    await printToTerminal("Found Keller. He's dead.", "YOU"); //TODO do the color for YOU ( the player )
    //TODO add response from qg by adding to the queue
    addFlag("TOLD_QG_ABOUT_BODY");
}

//Don't tell QG for the dead body
export async function tellQGNoBodyFound(): Promise<void> {
    //TODO add response from qg by adding to the queue & finish this
    await printToTerminal("I'm in the main relay watch tower, Keller is nowhere to be found.", "YOU");
    await queueQGMessage("QG_MESSAGE_DIDNT_TOLD_DEAD_BODY");
}

//Tell QG for the note Keller left
export async function tellQGAboutNoteLeft(): Promise<void> {
    //TODO add response from qg by adding to the queue & finish this
    await printToTerminal("From what i can see, Kelley left a note, apparently, there is something " +
        "dangerous that is drawn to the signal when it is running", "YOU");
    addFlag("TOLD_QG_ABOUT_NOTE");
    //TODO add the queued message from the qg
}

//Don't mention the note
export async function DontTellQGAboutNoteLeft(): Promise<void> {
    //nothing happens here it's just to satisfy the zone
}
export async function confirmingDoneTalkingtoQG(): Promise<void> {
    setFocus(null);
}
/*
######################
ZONE : EXCAVATION_CAMP
######################
 */
export async function goBackToForestTrail(): Promise<void> {
    await printToTerminal("You walk back toward the three way junction point", "action");
    await loadZone(ZONES.GATE_CHECKPOINT);
}

/*
######
OTHER
######
 */