import * as actionsFunc from "../actions/checkPointActions.js";
export const GATE_CHECKPOINT_ACTION = {
    WALK_BACK_FOREST_TRAIL: {
        command: "walk back to forest trail",
        description: "walk back to the snowy forest",
        execute: actionsFunc.walkBackSnowyForestTowardTruck,
    },
    WALK_TOWARD_POST: {
        command: "walk toward the watch post",
        description: "walk to the watch post",
        execute: actionsFunc.walkTowardMainWatchPost,
    },
    ENTER_GUARD_SHACK: {
        command: "enter guard shack",
        description: "enter the guard shack",
        execute: actionsFunc.goInTheShack_GateCheckpoint,
    },
};
export const GATE_CHECKPOINT_SHACK_ACTIONS = {
    GO_BACK_OUTSIDE_THE_SHACK: {
        command: "Go Back Outside",
        description: "Go back outside of the shack",
        execute: actionsFunc.goOutsideTheShack_GateCheckpoint, //TODO bind the action
    },
    SEARCH_THE_SHACK: {
        command: "Search the room",
        description: "search the messy room for anything that could be useful",
        execute: actionsFunc.searchTheGuardShack, //TODO bind the action
    },
};
/*
###################################################
 */
