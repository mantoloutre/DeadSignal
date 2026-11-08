import * as actionsFunc from "../actions/subRelayA01Actions.js";
import { toggleInt1 } from "../actions/subRelayA01Actions.js";
export const RELAY_A01_OUTSIDE_ACTIONS = {
    ENTER_BUNKER: {
        command: "enter bunker",
        description: "enter the bunker ( a.k.a the relays station a-01 )",
        execute: actionsFunc.enterBunkerStationA01,
    },
    INSPECT_FOUNDATION: {
        command: "inspect foundation",
        description: "inspect the foundation of the bunker's door",
        execute: actionsFunc.inspectBunkerFoundation,
        oneTime: true,
    },
};
export const RELAY_A01_ACTIONS = {
    GO_OUTSIDE_BUNKER: {
        command: "go back outside",
        description: "go back outside of the bunker",
        execute: actionsFunc.goOutsideBunkerStationA01,
    },
    // make it only available if breaker panel is closed
    OPEN_BREAKER_PANEL: {
        command: "open breaker panel",
        description: "open the breaker panel to access it",
        execute: actionsFunc.openBreakerPanel,
    },
    // make it only available if breaker panel is open
    CLOSE_BREAKER_PANEL: {
        command: "close breaker panel",
        description: "close the door of the breaker panel",
        execute: actionsFunc.closeBreakerPanel,
    },
    INT_1: {
        command: "INT 1",
        description: "toggle the first switch",
        execute: toggleInt1,
    },
    INT_2: {
        command: "INT 2",
        description: "toggle the second switch",
        execute: async () => { }, //TODO do the action
    },
    INT_3: {
        command: "INT 3",
        description: "toggle the third switch",
        execute: async () => { }, //TODO do the action
    },
    // Keller cut it and maybe left a note?
    INSPECT_CONNECTIONS: {
        command: "inspect connections",
        description: "inspect the connection of the switches to see what happened here",
        execute: async () => { }, //TODO do the action
    },
};
export const REPAIR_CONNECTION = {
    DO_SOMETHING_ELSE: {
        command: "Do something else",
        description: "simply get out of the puzzle's focus and do something else",
        execute: async () => { }, //todo do the action
    },
    TRY_CROWBAR: {
        command: "try crowbar",
        description: "try to wedge the crowbar so the two end of the " + "wire connects",
        execute: async () => { }, //TODO do the action
    },
    //At this point in game if player doesn't have either crowbar or duct tape well he's
    //blocked until he gets one of the two ( he should have it )
    TRY_DUCT_TAPE: {
        command: "try duct tape",
        description: "try to join the two end of the wire with duct tape", //TODO upgrade description?
        execute: async () => { }, //todo do the action
    },
};
