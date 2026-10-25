import {
    addCrowBarToThePlayerInventory,
    addFlareTruckCabin,
    addWinterGlovesToThePlayerInventory,
    checkTruckTrunk,
    forceToolBoxOpenWithHand,
    getOutOfTheDamnTruck,
    goBackInThePrettyTruck, goBackToTheTruck, goInsideTheWatchPost, inspectDirectionSign,
    lookInGloveBoxInTruckCabin, openTheHoodAndOrLookAtTheEngineInit,
    openToolBoxTruckTrunkInit, outOfToolBoxFocus, pryToolBoxWithCrowbar,
    readEmergencyManual, takeAdjustableWrenchFromToolBoxInit,
    takeDuctTapeFromToolBoxInit, walkBackOutside,
    walkBackSnowyForestTowardTruck, walkTowardMainWatchPost, walkTowardSnowyForestFromOutsideTruck
} from "./actions.js";
import {hasFlag} from "./gameState.js";
import {doesThePlayerHasTheItem} from "./inventory.js";
import {ZoneId} from "./types.js";
/*
this is for subzone ( mainly puzzle )
 */
export const FOCUS = {
    TOOLBOX: "TOOLBOX",
    JUNCTION_BOX: "JUNCTION_BOX",
} as const;

export type ZoneFocus = typeof FOCUS[keyof typeof FOCUS];

let currentFocus: ZoneFocus | null = null;

/*
basic function to get the currentFocus
 */
export function getFocus(): ZoneFocus | null {
    return currentFocus;
}

/*
basic function to set the current focus
 */
export function setFocus(focus: ZoneFocus | null): void {
    currentFocus = focus;
}


export interface ZoneAction {
    command: string;
    description: string;
    execute: () => Promise<void>;
    oneTime?: boolean;
}


export interface Zone {
    id: ZoneId;
    name: string;
    description: string;
    getActions: () => ZoneAction[];
}
/*
the const containing all the zone that I'm using in the game
 */
export const ZONES = {
    //###################################################################
    SNOWY_FOREST: {
        id: "SNOWY_FOREST",
        name: "PERIMETER FOREST TRAIL",
        description: "Towering ice-coated pine tree in a frozen service path. Heavy " +
            "perimeter fencing runs parallel to the trail, warping and sheared appart as if " +
            "hit by something big.",
        getActions: (): ZoneAction[] => {
            //if focus its here

            //if there is no current focus then we do the normal thing
            const actions: ZoneAction[] = [];
            actions.push({
                command: "go back to the truck",
                description: "walk back to the truck",
                execute: goBackToTheTruck,
            });

            actions.push({
                command: "inspect the direction sign",
                description: "inspect it to know where to go",
                execute: inspectDirectionSign,
            });
            if (hasFlag("INSPECTED_DIRECTION_SIGN")) {
                actions.push({
                    command: "walk toward the watch tower",
                    description: "walk toward the watch tower which also serve as the main relay tower",
                    execute: walkTowardMainWatchPost,
                });
            }
            return actions;
        }
    },
    OUTSIDE_TRUCK: {
        id: "OUTSIDE_TRUCK",
        name: "OUTSIDE THE TRUCK",
        description: "Sub-zero wind tears through the valley. The service rig rests dead" +
            " in the middle of the road, engine fuming and a hole through the hood",
        getActions: (): ZoneAction[] => {
            //for the focus of the toolbox ( "puzzle" )
            if (getFocus() === FOCUS.TOOLBOX) {
                return getToolBoxActions();
            }
            //if no focus then normal things
            const actions: ZoneAction[] = [];
            actions.push({
                command: "get back in the truck",
                description: "go back inside the truck",
                execute: goBackInThePrettyTruck
            });
            actions.push({
                command: "walk toward forest",
                description: "start walking toward the forest",
                execute: walkTowardSnowyForestFromOutsideTruck,
            })
            actions.push({
                command: hasFlag("OPENED_HOOD_TRUCK_INIT")
                    ? "look at the engine" : "open the hood and look at the engine",
                description: "look at the engine and open the hood if its in the way",
                execute: openTheHoodAndOrLookAtTheEngineInit,
            });
            actions.push({
                command: hasFlag("OPENED_TRUCK_TRUNK_INIT")
                    ? "look into the truck's trunk" : "open the truck's trunk",
                description: "check the truck trunk's to see if there is anything useful in there",
                execute: checkTruckTrunk,
                oneTime: true,
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
            if (hasFlag("OPENED_TOOLBOX_INIT")) {
                actions.push({
                    command: "pickup duct tape",
                    description: "take the roll of duct tape from the toolbox",
                    execute: takeDuctTapeFromToolBoxInit,
                    oneTime: true
                });
                actions.push({
                    command: "pickup ajustable wrench",
                    description: "take the ajustable wrench from the toolbox",
                    execute: takeAdjustableWrenchFromToolBoxInit,
                    oneTime: true
                });
            }
            return actions;
        }
    },
    //###################################################################
    TRUCK_CABIN: {
        id: "TRUCK_CABIN",
        name: "TRUCK CABIN",
        description: "The dashboard gauges flicker erratically under low battery voltage. Outside the cracked windshield, " +
            "steam slowly dissipate in the glacial crosswinds",
        getActions: (): ZoneAction[] => {
            const actions: ZoneAction[] = [];
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
            } else {
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
                actions.push({
                    command: "read emergency manual",
                    description: "read the emergency manual to know what to do in case of an emergency",
                    execute: readEmergencyManual,
                    oneTime: true,
                })
            }
            return actions;
        }
    },
    //################################################
    WATCH_POST_OUTSIDE: {
        id: "WATCH_POST_OUTSIDE",
        name: "OUTSIDE WATCH POST",
        description: "you stand just outside the watch post, not finished",
        getActions: (): ZoneAction[] => {
            //focus

            //normal actions
            const actions: ZoneAction[] = [];
            actions.push({
                command: "go back in forest toward truck",
                description: "walk back in the forest toward the truck ( to the intersection )",
                execute: walkBackSnowyForestTowardTruck,
            });
            actions.push({
                command: "go inside the watch post",
                description: "walk inside the watch post",
                execute: goInsideTheWatchPost,
            })
            return actions;
        }
    },
    //############################################
    WATCH_POST: {
        id: "WATCH_POST",
        name: "INSIDE WATCH POST",
        description: "you are now standing inside the watch post", //TODO do the lore
        getActions: (): ZoneAction[] => {
            //focus

            //normal action
            const actions: ZoneAction[] = [];
            actions.push({
                command: "go back outside",
                description: "go back outside the watch post",
                execute: walkBackOutside,
            });
            return actions;
        }
    },
    GATE_CHECKPOINT: {
        id: "GATE_CHECKPOINT",
        name: "SECURITY GATE AND BOOTH",
        description: "A metal gate squeal under a flickering floodlight. The guard shack's front window" +
            " is shattered outward into the snow.",
        getActions: (): ZoneAction[] => {
            //focus
            if (getFocus() === FOCUS.JUNCTION_BOX){
                return getJunctionBoxActions();
            }
            //normal action
            const actions: ZoneAction[] = [];
            actions.push({
                command: "walk back to forest trail",
                description: "walk back to the snowy forest",
                execute: walkBackSnowyForestTowardTruck,
            });
            /*
            actions.push({
                command: "enter guard shack",
                description: "enter the guard shack",
                execute: //TODO
            });
             */
            return actions;
        }
    }
} satisfies Record<ZoneId, Zone>;

function getJunctionBoxActions(): ZoneAction[] {
    const actions: ZoneAction[] = [];
    //TODO
    return actions;
}
/*
function to get the actions related to opening the toolbox
 */
function getToolBoxActions(): ZoneAction[] {
    const actions: ZoneAction[] = [];
    actions.push({
        command: "do something else",
        description: "do something else than trying to open the toolbox",
        execute: outOfToolBoxFocus
    });
    if (!hasFlag("OPENED_TOOLBOX_INIT")) {
        actions.push({
            command: "force latch barehanded / with gloves",
            description: "try to break / force open the latch on the toolbox with your hands",
            execute: forceToolBoxOpenWithHand
        });
        if (doesThePlayerHasTheItem("crowbar")) {
            actions.push({
                command: "force latch with crowbar",
                description: "try to pry open the toolbox with your crowbar",
                execute: pryToolBoxWithCrowbar
            });
        }
    }
    return actions;
}