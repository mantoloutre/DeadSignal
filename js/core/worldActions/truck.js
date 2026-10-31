import * as actionsFunc from "../actions/index.js";
import { hasFlag } from "../gameState";
export const TRUCK_CABIN_INIT_ACTIONS = {
    GET_OUT_OF_TRUCK_INIT: {
        command: "get out of the truck",
        description: "simply get out of the truck",
        execute: actionsFunc.getOutOfTheDamnTruck,
    },
    TAKE_TRUCK_INSURANCE_PAPER: {
        command: "take truck insurance papers",
        description: "Take the truck's insurance paper",
        execute: actionsFunc.addTruckInsurancePaper,
        oneTime: true,
    },
    OPEN_GLOVE_BOX_TRUCK_INIT: {
        command: "open glove box",
        description: "open the glove box to see what's inside",
        execute: actionsFunc.lookInGloveBoxInTruckCabin,
    },
    TAKE_GLOVE_FROM_GLOVE_BOX: {
        command: "take gloves",
        description: "take the good looking winter gloves inside the glove box",
        execute: actionsFunc.addWinterGlovesToThePlayerInventory,
        oneTime: true,
    },
    TAKE_FLARE_FROM_GLOVE_BOX: {
        command: "take flares",
        description: "take the two flares from the glove box",
        execute: actionsFunc.addFlareTruckCabin,
        oneTime: true,
    },
    READ_EMERGENCY_MANUAL_INIT: {
        command: "read emergency manual",
        description: "read the emergency manual to know what to do in case of an emergency",
        execute: actionsFunc.readEmergencyManual,
        oneTime: true,
    },
};
export const GET_TOOL_BOX_ACTION = {
    DO_SOMETHING_ELSE: {
        command: "do something else",
        description: "do something else than trying to open the toolbox",
        execute: actionsFunc.outOfToolBoxFocus,
    },
    FORCE_LATCH_BAREHAND: {
        command: "force latch barehanded / with gloves",
        description: "try to break / force open the latch on the toolbox with your hands",
        execute: actionsFunc.forceToolBoxOpenWithHand,
    },
    FORCE_LATCH_CROWBAR: {
        command: "force latch with crowbar",
        description: "try to pry open the toolbox with your crowbar",
        execute: actionsFunc.pryToolBoxWithCrowbar,
    },
    FORCE_LATCH_HEAT: {
        command: "try with heat (-1 flare)",
        description: "try to light up a flare to try and head up the lock",
        execute: actionsFunc.doArsonToHeatTheLatch,
    },
};
export const OUTSIDE_TRUCK_INIT_ACTIONS = {
    GO_BACK_IN_TRUCK_INIT: {
        command: "get back in the truck",
        description: "go back inside the truck",
        execute: actionsFunc.goBackInThePrettyTruck,
    },
    WALK_TOWARD_FOREST_FROM_TRUCK_INIT: {
        command: "walk toward forest",
        description: "start walking toward the forest",
        execute: actionsFunc.walkTowardSnowyForestFromOutsideTruck,
    },
    LOOK_AT_ENGINE_TRUCK_INIT: {
        get command() {
            return hasFlag("OPENED_HOOD_TRUCK_INIT")
                ? "look at the engine"
                : "open the hood and look at the engine";
        },
        description: "look at the engine and open the hood if its in the way",
        execute: actionsFunc.openTheHoodAndOrLookAtTheEngineInit,
    },
    OPEN_TRUCK_TRUNK_INIT: {
        get command() {
            return hasFlag("OPENED_TRUCK_TRUNK_INIT")
                ? "look into the truck's trunk"
                : "open the truck's trunk";
        },
        description: "check the truck trunk's to see if there is anything useful in there",
        execute: actionsFunc.checkTruckTrunk,
        oneTime: true,
    },
    TAKE_CROWBAR_FROM_TRUCK_TRUNK_INIT: {
        command: "take crowbar",
        description: "take the crowbar from the trunk",
        execute: actionsFunc.addCrowBarToThePlayerInventory,
        oneTime: true,
    },
    OPEN_TOOLBOX_TRUCK_TRUNK_INIT: {
        get command() {
            return hasFlag("OPENED_TOOLBOX_INIT")
                ? "look into the toolbox"
                : "open the toolbox";
        },
        description: "open the toolbox ",
        execute: actionsFunc.openToolBoxTruckTrunkInit,
    },
    TAKE_DUCT_TAPE_FROM_TOOLBOX: {
        command: "pickup duct tape",
        description: "take the roll of duct tape from the toolbox",
        execute: actionsFunc.takeDuctTapeFromToolBoxInit,
        oneTime: true,
    },
    TAKE_ADJUSTABLE_WRENCH_FROM_TOOLBOX: {
        command: "pickup ajustable wrench",
        description: "take the ajustable wrench from the toolbox",
        execute: actionsFunc.takeAdjustableWrenchFromToolBoxInit,
        oneTime: true,
    },
};
