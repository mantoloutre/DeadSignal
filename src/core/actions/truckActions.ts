import { loadZone } from "../../main.js";
import { printToTerminal } from "../../ui/dom.js";
import { addFlag, hasFlag, setFocus } from "../gameState.js";
import { addItemToInventory, removeItemFromInventory } from "../inventory.js";
import { addDiscoveredFrequency } from "../radioFrequency.js";

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
    await printToTerminal(
      "You force the frozen trunk open with your hands. Inside, you spot" +
        " a heavy toolbox, a small black barrel full of wine, a crowbar and two spare tires.",
      "action",
    );
  } /*else {
        await printToTerminal("Inside the truck, nothing changed, still a heavy toolbox, " +
            "the barrel of wine and the two spare tire.", "system");
    }*/ //TODO maybe add this later on
}

export async function getOutOfTheDamnTruck(): Promise<void> {
  await printToTerminal("You go out of the truck", "action");
  await loadZone("OUTSIDE_TRUCK");
}

/*
function to add winter gloves to the player inventory when the player look inside the glove box
and decide to take the gloves
 */
export async function addWinterGlovesToThePlayerInventory(): Promise<void> {
  addFlag("TOOK_WINTER_GLOVE");
  await printToTerminal("you took the gloves from the glove box", "action");
  await addItemToInventory("winter_gloves");
}

/*
look inside the glove box to be able to take what's inside
 */
export async function lookInGloveBoxInTruckCabin(): Promise<void> {
  await printToTerminal(
    "You open the glove box you look inside. you find 2 flares, " +
      "the truck's insurance paper, a pair of winter gloves and the emergency manual",
    "action",
  );
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
  await printToTerminal(
    "In case of real Emergency, please set the " +
      "radio at the following frequency: 112.400 MHz",
    "system",
  );
  await printToTerminal(
    "You are to not contact the QG as the QG will contact you first " +
      "when you set your radio at this frequency",
    "system",
  );
  addFlag("READ_MANUAL");
  addDiscoveredFrequency("QG_FREQUENCY");
}

export async function addTruckInsurancePaper(): Promise<void> {
  await addItemToInventory("truck_insurance_papers");
  await printToTerminal(
    "you took the truck's insurance papers... (why?)",
    "action",
  );
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
  await printToTerminal("You hop back in the truck", "action");
  await loadZone("TRUCK_CABIN");
}

/*
function that depending on if the hood is already open, will display different chat
 */
export async function openTheHoodAndOrLookAtTheEngineInit(): Promise<void> {
  if (!hasFlag("OPENED_HOOD_TRUCK_INIT")) {
    addFlag("OPENED_HOOD_TRUCK_INIT");
    await printToTerminal(
      hasFlag("TOOK_WINTER_GLOVE")
        ? "You open the truck's hood"
        : "You open the hood with your hands, its really cold out there without gloves...",
      "action",
    );
  } else {
    await printToTerminal(
      "What you see is the engine that seem to be missing a piston, " +
        "which might explain the big explosion and the hole in the hood",
      "system",
    );
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
    await printToTerminal(
      "you try to open the toolbox, but the lock appear to be frozen, " +
        "how do you want to try to open it?",
      "system",
    );
  } else {
    await printToTerminal("you look back in the toolbox", "system");
  }
}

/*
simple function to get out of the toolbox focus
*/
export async function outOfToolBoxFocus(): Promise<void> {
  await printToTerminal(
    "you decide to do something else than trying to open the toolbox.",
    "action",
  );
  setFocus(null);
}

/*
you know using a flare inside a truck ain't the best idea...
 */
export async function doArsonToHeatTheLatch(): Promise<void> {
  await printToTerminal(
    "You light up a flare and put it close to the latch.",
    "action",
  );
  await printToTerminal(
    "There is now a lot of thick red smoke  in the trunk and around the trunk.",
    "system",
  );
  await printToTerminal(
    "You wait around 50 seconds for the flare to go out and you wait" +
      " around 2 more minutes for the latches to cooldown.",
    "action",
  );
  await printToTerminal("You try and you manage to open the toolbox", "action");
  removeItemFromInventory("flare");
  addFlag("OPENED_TOOLBOX_INIT");
  setFocus(null);
}

export async function takeAdjustableWrenchFromToolBoxInit(): Promise<void> {
  await printToTerminal(
    "you pickup the adjustable wrench from the toolbox.",
    "action",
  );
  await addItemToInventory("adjustable_wrench");
}

export async function takeDuctTapeFromToolBoxInit(): Promise<void> {
  await printToTerminal(
    "you pickup the roll of duct tape from the toolbox.",
    "action",
  );
  await addItemToInventory("duct_tape");
}

export async function forceToolBoxOpenWithHand(): Promise<void> {
  await printToTerminal(
    "You try to open the latch with your hands, it doesnt seem to budge.",
    "action",
  );
  //TODO something else?
}

export async function pryToolBoxWithCrowbar(): Promise<void> {
  await printToTerminal(
    "you hit a few time the latch with your crowbar and manage to break it." +
      " The toolbox is now open",
    "action",
  );
  addFlag("OPENED_TOOLBOX_INIT");
  setFocus(null);
}

export async function walkTowardSnowyForestFromOutsideTruck(): Promise<void> {
  await printToTerminal(
    "You walk toward the forest away from the truck",
    "action",
  );
  //TODO load zone
  await loadZone("SNOWY_FOREST");
}
