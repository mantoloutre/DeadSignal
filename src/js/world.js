import { addCrowBarToThePlayerInventory, addFlareTruckCabin, addWinterGlovesToThePlayerInventory, checkTruckTrunk, forceToolBoxOpenWithHand, getOutOfTheDamnTruck, goBackInThePrettyTruck, lookInGloveBoxInTruckCabin, openTheHoodAndOrLookAtTheEngineInit, openToolBoxTruckTrunkInit, outOfToolBoxFocus, pryToolBoxWithCrowbar, takeAjustableWrenchFromToolBoxInit, takeDuctTapeFromToolBoxInit } from "./actions.js";
import { hasFlag } from "./gameState.js";
import { doesThePlayerHasTheItem } from "./inventory.js";
/*
this is for subzone ( mainly puzzle )
 */
export const FOCUS = {
    TOOLBOX: "TOOLBOX",
};
let currentFocus = null;
/*
basic function to get the currentFocus
 */
export function getFocus() {
    return currentFocus;
}
/*
basic function to set the current focus
 */
export function setFocus(focus) {
    currentFocus = focus;
}
const Chapter1 = {
    name: "chapter 0",
    zone: "snowy forest"
};
/*
the const containing all the zone that i'm using in the game
 */
export const ZONES = {
    //###################################################################
    SNOWY_FOREST: {
        id: "SNOWY_FOREST",
        name: "SNOWY FOREST",
        description: "The freezing wind howl through the pines. The truck sits engine "
            + "fuming on the side of the road and a hole through the hood",
        getActions: () => {
            //for the focus of the toolbox ( "puzzle" )
            if (getFocus() === FOCUS.TOOLBOX) {
                return getTooBoxActions();
            }
            //if there is no current focus then we do the normal thing
            const actions = [];
            actions.push({
                command: "get back in the truck",
                description: "go back inside the truck",
                execute: goBackInThePrettyTruck
            });
            actions.push({
                command: hasFlag("OPENED_HOOD_TRUCK_INIT")
                    ? "look at the engine" : "open the hood and look at the engine",
                description: "look at the engine and open the hood if its in the way",
                execute: openTheHoodAndOrLookAtTheEngineInit
            });
            actions.push({
                command: hasFlag("OPENED_TRUCK_TRUNK_INIT")
                    ? "look into the truck's trunk" : "open the truck's trunk",
                description: "check the truck trunk's to see if there is anything useful in there",
                execute: checkTruckTrunk,
            });
            if (hasFlag("OPENED_TRUCK_TRUNK_INIT")) {
                actions.push({
                    command: "add crowbar",
                    description: "take the crowbar from the trunk",
                    execute: addCrowBarToThePlayerInventory,
                    oneTime: true
                });
                actions.push({
                    command: hasFlag("OPENED_TOOLBOX_INIT") ? "look into the toolbox" : "open the toolbox",
                    description: "open the toolbox ",
                    execute: openToolBoxTruckTrunkInit,
                });
            }
            return actions;
        }
    },
    //###################################################################
    TRUCK_CABIN: {
        id: "TRUCK_CABIN",
        name: "truck cabin",
        description: "You are sitting on the driver's seat, the truck came to a sudden stop and there is smoke" +
            " coming out of the engine",
        getActions: () => {
            const actions = [];
            actions.push({
                command: "get out of the truck",
                description: "simply get out of the truck",
                execute: getOutOfTheDamnTruck,
            });
            if (!hasFlag("OPENED_GLOVE_BOX")) {
                actions.push({
                    command: "open glove box",
                    description: "open the glove box to see what's inside",
                    execute: lookInGloveBoxInTruckCabin
                });
            }
            else {
                actions.push({
                    command: "take gloves",
                    description: "take the good looking winter gloves inside the glove box",
                    execute: addWinterGlovesToThePlayerInventory,
                    oneTime: true,
                });
                actions.push({
                    command: "take flares",
                    description: "take the two flares from the glove box",
                    execute: addFlareTruckCabin,
                    oneTime: true,
                });
            }
            return actions;
        }
    }
};
/*
function to get the actions related to opening the toolbox
 */
function getTooBoxActions() {
    const actions = [];
    actions.push({
        command: "do something else",
        description: "do something else than trying to open the toolbox",
        execute: outOfToolBoxFocus
    });
    if (!hasFlag("OPENED_TOOLBOX_INIT")) {
        actions.push({
            command: "force latche barehanded / with gloves",
            description: "try to break / force open the latch on the toolbox with your hands",
            execute: forceToolBoxOpenWithHand
        });
        if (doesThePlayerHasTheItem("crowbar")) {
            actions.push({
                command: "force latche with crowbar",
                description: "try to pry open the toolbox with your crowbar",
                execute: pryToolBoxWithCrowbar
            });
        }
    }
    else {
        actions.push({
            command: "pickup duct tape",
            description: "take the roll of duct tape from the toolbox",
            execute: takeDuctTapeFromToolBoxInit,
            oneTime: true
        });
        actions.push({
            command: "pickup ajustable wrench",
            description: "take the ajustable wrench from the toolbox",
            execute: takeAjustableWrenchFromToolBoxInit,
            oneTime: true
        });
    }
    return actions;
}
