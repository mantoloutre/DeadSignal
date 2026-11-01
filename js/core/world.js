import { FOCUS, getFocus, hasFlag, isCommandInactive } from "./gameState.js";
import { doesThePlayerHasTheItem } from "./inventory.js";
import { GATE_CHECKPOINT_ACTION, GATE_CHECKPOINT_SHACK_ACTIONS, GET_TOOL_BOX_ACTION, OUTSIDE_TRUCK_INIT_ACTIONS, RESONATOR_ENCOUNTER, SAY_STUFF_TO_QG, SNOWY_FOREST_ACTIONS, TRUCK_CABIN_INIT_ACTIONS, WATCH_POST, WATCH_POST_OUTSIDE, } from "./worldActions/index.js";
/*
the const containing all the zone that I'm using in the game
 */
export const ZONES = {
    //###################################################################
    SNOWY_FOREST: {
        name: "PERIMETER FOREST TRAIL",
        description: "Towering ice-coated pine tree in a frozen service path. Heavy " +
            "perimeter fencing runs parallel to the trail, warping and sheared appart as if " +
            "hit by something big.",
        getActions: () => {
            //if focus its here
            //if there is no current focus then we do the normal thing
            const actions = [];
            actions.push(SNOWY_FOREST_ACTIONS.GO_BACK_TO_TRUCK);
            actions.push(SNOWY_FOREST_ACTIONS.INSPECT_DIRECTION_SIGN);
            if (hasFlag("INSPECTED_DIRECTION_SIGN")) {
                actions.push(SNOWY_FOREST_ACTIONS.WALK_TOWARD_GATE_CHECKPOINT);
            }
            return actions;
        },
    },
    OUTSIDE_TRUCK: {
        name: "OUTSIDE THE TRUCK",
        description: "Sub-zero wind tears through the valley. The service rig rests dead" +
            " in the middle of the road, engine fuming and a hole through the hood",
        getActions: () => {
            //for the focus of the toolbox ( "puzzle" )
            if (getFocus() === FOCUS.TOOLBOX) {
                return getToolBoxActions();
            }
            //if no focus then normal things
            const actions = [];
            actions.push(OUTSIDE_TRUCK_INIT_ACTIONS.GO_BACK_IN_TRUCK_INIT);
            actions.push(OUTSIDE_TRUCK_INIT_ACTIONS.WALK_TOWARD_FOREST_FROM_TRUCK_INIT);
            actions.push(OUTSIDE_TRUCK_INIT_ACTIONS.LOOK_AT_ENGINE_TRUCK_INIT);
            actions.push(OUTSIDE_TRUCK_INIT_ACTIONS.OPEN_TRUCK_TRUNK_INIT);
            if (hasFlag("OPENED_TRUCK_TRUNK_INIT")) {
                actions.push(OUTSIDE_TRUCK_INIT_ACTIONS.TAKE_CROWBAR_FROM_TRUCK_TRUNK_INIT);
                actions.push(OUTSIDE_TRUCK_INIT_ACTIONS.OPEN_TOOLBOX_TRUCK_TRUNK_INIT);
            }
            if (hasFlag("OPENED_TOOLBOX_INIT")) {
                actions.push(OUTSIDE_TRUCK_INIT_ACTIONS.TAKE_DUCT_TAPE_FROM_TOOLBOX);
                actions.push(OUTSIDE_TRUCK_INIT_ACTIONS.TAKE_ADJUSTABLE_WRENCH_FROM_TOOLBOX);
            }
            return actions;
        },
    },
    //###################################################################
    TRUCK_CABIN: {
        name: "TRUCK CABIN",
        description: "The dashboard gauges flicker erratically under low battery voltage. Outside the cracked windshield, " +
            "steam coming from the engine slowly dissipate in the glacial crosswinds",
        getActions: () => {
            const actions = [];
            actions.push(TRUCK_CABIN_INIT_ACTIONS.GET_OUT_OF_TRUCK_INIT);
            if (!hasFlag("OPENED_GLOVE_BOX")) {
                actions.push(TRUCK_CABIN_INIT_ACTIONS.OPEN_GLOVE_BOX_TRUCK_INIT);
            }
            else {
                actions.push(TRUCK_CABIN_INIT_ACTIONS.TAKE_GLOVE_FROM_GLOVE_BOX);
                actions.push(TRUCK_CABIN_INIT_ACTIONS.TAKE_FLARE_FROM_GLOVE_BOX);
                actions.push(TRUCK_CABIN_INIT_ACTIONS.READ_EMERGENCY_MANUAL_INIT);
                actions.push(TRUCK_CABIN_INIT_ACTIONS.TAKE_TRUCK_INSURANCE_PAPER);
            }
            return actions;
        },
    },
    //################################################
    WATCH_POST_OUTSIDE: {
        name: "OUTSIDE WATCH POST",
        description: "The watch post's steel door has been ripped off its hinges and thrown into the snow. " +
            "Broken glass surrounds the dark entrance",
        getActions: () => {
            //focus
            //normal actions
            const actions = [];
            actions.push(WATCH_POST_OUTSIDE.GO_BACK_TO_CHECKPOINT);
            actions.push(WATCH_POST_OUTSIDE.GO_INSIDE_WATCH_POST);
            return actions;
        },
    },
    //############################################
    WATCH_POST: {
        name: "INSIDE WATCH POST",
        description: "A small freezing room filled with dead monitor. " +
            "Keller's body lies motionless against the main terminal's chassis",
        getActions: () => {
            //focus
            if (getFocus() === FOCUS.TELLING_QG) {
                return getWhatToSayToQG();
            }
            if (getFocus() === FOCUS.FIRST_ENCOUNTER) {
                //TODO do the list of actions
            }
            //normal action
            const actions = [];
            actions.push(WATCH_POST.GO_BACK_OUTSIDE_WATCH_POST);
            if (!hasFlag("SEARCHED_KELLER_BODY") &&
                hasFlag("DISCOVERED_KELLER_BODY")) {
                actions.push(WATCH_POST.SEARCH_KELLER_BODY);
            }
            else {
                actions.push(WATCH_POST.TAKE_KELLER_CREDENTIAL);
                actions.push(WATCH_POST.TAKE_KELLER_KEYCARD);
                actions.push(WATCH_POST.TAKE_PEN_FROM_KELLER);
            }
            if (doesThePlayerHasTheItem("robot_memory_module")) {
                actions.push(WATCH_POST.INSERT_MEMORY_MODULE);
            }
            else {
                actions.push(WATCH_POST.TAKE_MEMORY_MODULE);
            }
            return actions;
        },
    },
    //##########################################
    GATE_CHECKPOINT: {
        name: "SECURITY GATE AND BOOTH",
        description: "A metal gate squeal under a flickering floodlight. The guard shack's front window" +
            " is shattered inward inside the shack.",
        getActions: () => {
            //focus
            if (getFocus() === FOCUS.JUNCTION_BOX) {
                //TODO set the focus at the right place
                return getJunctionBoxActions();
            }
            //normal action
            const actions = [];
            actions.push(GATE_CHECKPOINT_ACTION.WALK_BACK_FOREST_TRAIL);
            actions.push(GATE_CHECKPOINT_ACTION.WALK_TOWARD_POST);
            actions.push(GATE_CHECKPOINT_ACTION.ENTER_GUARD_SHACK);
            return actions;
        },
    },
    GATE_CHECKPOINT_SHACK: {
        name: "CHECKPOINT SHACK",
        description: "Inside the shack, its a mess. The guard robot is absolutely wrecked " +
            "on the ground, pieces everywhere along with shattered glass.",
        getActions: () => {
            const actions = [];
            //focus is applicable
            //normal thing
            actions.push(GATE_CHECKPOINT_SHACK_ACTIONS.GO_BACK_OUTSIDE_THE_SHACK);
            if (!hasFlag("SEARCHED_GUARD_SHACK")) {
                actions.push(GATE_CHECKPOINT_SHACK_ACTIONS.SEARCH_THE_SHACK);
            }
            else {
                if (!doesThePlayerHasTheItem("robot_memory_module") &&
                    !hasFlag("LISTENED_MEMORY_MODULE")) {
                    actions.push(GATE_CHECKPOINT_SHACK_ACTIONS.PICKUP_MEMORY_MODULE);
                }
                //maybe make it so player need to deactivate live wire?
                //maybe make it so if he doesn't an alarm could start and attract "it"?
            }
            return actions;
        },
    },
};
function getJunctionBoxActions() {
    const actions = [];
    //TODO
    return actions;
}
function getWhatToSayToQG() {
    const actions = [];
    actions.push(SAY_STUFF_TO_QG.PRESS_WHEN_PLAYER_DONE);
    //section for the body
    if (!isCommandInactive(SAY_STUFF_TO_QG.NO_BODY.command)) {
        actions.push(SAY_STUFF_TO_QG.YES_BODY);
    }
    if (!isCommandInactive(SAY_STUFF_TO_QG.YES_BODY.command)) {
        actions.push(SAY_STUFF_TO_QG.NO_BODY);
    }
    // section for the note
    if (!isCommandInactive(SAY_STUFF_TO_QG.NO_NOTE.command)) {
        actions.push(SAY_STUFF_TO_QG.YES_NOTE);
    }
    if (!isCommandInactive(SAY_STUFF_TO_QG.YES_NOTE.command)) {
        actions.push(SAY_STUFF_TO_QG.NO_NOTE);
    }
    return actions;
}
function getFirstEncounterActions() {
    const actions = [];
    //do the actions
    return actions;
}
/*
function to get the actions related to opening the toolbox
 */
function getToolBoxActions() {
    const actions = [];
    actions.push(GET_TOOL_BOX_ACTION.DO_SOMETHING_ELSE);
    if (!hasFlag("OPENED_TOOLBOX_INIT")) {
        actions.push(GET_TOOL_BOX_ACTION.FORCE_LATCH_BAREHAND);
        if (doesThePlayerHasTheItem("crowbar")) {
            actions.push(GET_TOOL_BOX_ACTION.FORCE_LATCH_CROWBAR);
        }
        if (doesThePlayerHasTheItem("flare")) {
            actions.push(GET_TOOL_BOX_ACTION.FORCE_LATCH_HEAT);
        }
    }
    return actions;
}
