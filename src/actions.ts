import {addFlag, hasFlag} from "./gameState.js";
import {loadZone, printToTerminal} from "./main.js";
import {addItemToInventory} from "./inventory.js";
import {FOCUS, setFocus, ZONES} from "./world.js";
import {StoryFlags} from "./storyFlags.js";


export async function lookAroundYou(): Promise<void> {

}

/*
##################
ZONE : TRUCK CABIN
##################
 */

/*
pretty self explanatory function
 */
export async function checkTruckTrunk(): Promise<void> {
    if (!hasFlag("OPENED_TRUCK_TRUNK_INIT")) {
        addFlag(StoryFlags.OPENED_TRUCK_TRUNK_INIT);
        await printToTerminal("You force the frozen trunk open with your hands. Inside, you spot" +
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
pretty self explanatory function x2
 */
export async function addWinterGlovesToThePlayerInventory(): Promise<void> {
    addFlag("TOOK_WINTER_GLOVE");
    await addItemToInventory("winter_gloves");
}

export async function lookInGloveBoxInTruckCabin(): Promise<void> {
    await printToTerminal("You open the glove box you look inside. you find 2 flares and " +
        "the truck's insurance paper", "action");
    addFlag("OPENED_GLOVE_BOX");
}

/*
function to add 2 flare to inventory
 */
export async function addFlareTruckCabin(): Promise<void> {
    await addANumberOfFlares(2);
}

/*
###################
ZONE : SNOWY FOREST
###################
 */

export async function goBackInThePrettyTruck(): Promise<void> {
    await loadZone(ZONES.TRUCK_CABIN);
}

export async function openTheHoodAndOrLookAtTheEngineInit(): Promise<void> {
    if (!hasFlag(StoryFlags.OPENED_HOOD_TRUCK_INIT)) {
        await printToTerminal(hasFlag("TOOK_WINTER_GLOVE")
            ? "You open the truck's hood"
            : "You open the hood with your hands, its really cold out there without gloves...", "action");
    }
    addFlag("OPENED_HOOD_TRUCK_INIT");
}

export async function addCrowBarToThePlayerInventory(): Promise<void> {
    await addItemToInventory("crowbar");
}

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

export async function takeAjustableWrenchFromToolBoxInit(): Promise<void> {
    await addItemToInventory("ajustableWrench");
}

export async function takeDuctTapeFromToolBoxInit(): Promise<void> {
    await addItemToInventory("ductTape");
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

/*
######
OTHER
######
 */

async function addANumberOfFlares(count: number): Promise<void> {
    if (count > 1) {
        await printToTerminal(`You take ${count} flares`, "action");
        await addItemToInventory("flare", count);
    } else if (count === 1) {
        await printToTerminal("You take 1 flare", "action");
        await addItemToInventory("flare");
    }
}