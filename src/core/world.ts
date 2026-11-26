import { isDrawingPanelOpenOrNot } from "../data/drawings.ts";
import type { Zone, ZoneAction } from "../data/types.js";
import { drawingPanelPrintLine } from "../ui/dom.ts"; //todo watch out for possible circular reference
import { getFocus, hasFlag, isCommandInactive } from "./gameState.js";
import { doesThePlayerHasTheItem } from "./inventory.js";
import * as zoneActions from "./worldActions/index.js";
export type ZoneId = keyof typeof ZONES;
/*
the const containing all the zone that I'm using in the game
 */
export const ZONES = {
  //###################################################################
  SNOWY_FOREST: {
    name: "PERIMETER FOREST TRAIL",
    description:
      "Towering ice-coated pine tree in a frozen service path. Heavy " +
      "perimeter fencing runs parallel to the trail, warping and sheared appart as if " +
      "hit by something big.",
    getActions: (): ZoneAction[] => {
      //if focus its here

      //if there is no current focus then we do the normal thing
      const actions: ZoneAction[] = [];
      actions.push(zoneActions.SNOWY_FOREST_ACTIONS.GO_BACK_TO_TRUCK);
      actions.push(zoneActions.SNOWY_FOREST_ACTIONS.INSPECT_DIRECTION_SIGN);
      if (hasFlag("INSPECTED_DIRECTION_SIGN")) {
        actions.push(
          zoneActions.SNOWY_FOREST_ACTIONS.WALK_TOWARD_GATE_CHECKPOINT,
        );
        actions.push(zoneActions.SNOWY_FOREST_ACTIONS.WALK_TOWARD_FROST_BASIN);
      }
      return actions;
    },
  },
  OUTSIDE_TRUCK: {
    name: "OUTSIDE THE TRUCK",
    description:
      "Sub-zero wind tears through the valley. The service rig rests dead" +
      " in the middle of the road, engine fuming and a hole through the hood",
    getActions: (): ZoneAction[] => {
      //for the focus of the toolbox ( "puzzle" )
      if (getFocus() === "TOOLBOX") {
        return getToolBoxActions();
      }
      //if no focus then normal things
      const actions: ZoneAction[] = [];
      actions.push(
        zoneActions.OUTSIDE_TRUCK_INIT_ACTIONS.GO_BACK_IN_TRUCK_INIT,
      );
      actions.push(
        zoneActions.OUTSIDE_TRUCK_INIT_ACTIONS
          .WALK_TOWARD_FOREST_FROM_TRUCK_INIT,
      );
      actions.push(
        zoneActions.OUTSIDE_TRUCK_INIT_ACTIONS.LOOK_AT_ENGINE_TRUCK_INIT,
      );
      actions.push(
        zoneActions.OUTSIDE_TRUCK_INIT_ACTIONS.OPEN_TRUCK_TRUNK_INIT,
      );
      if (hasFlag("OPENED_TRUCK_TRUNK_INIT")) {
        actions.push(
          zoneActions.OUTSIDE_TRUCK_INIT_ACTIONS
            .TAKE_CROWBAR_FROM_TRUCK_TRUNK_INIT,
        );
        actions.push(
          zoneActions.OUTSIDE_TRUCK_INIT_ACTIONS.OPEN_TOOLBOX_TRUCK_TRUNK_INIT,
        );
      }
      if (hasFlag("OPENED_TOOLBOX_INIT")) {
        actions.push(
          zoneActions.OUTSIDE_TRUCK_INIT_ACTIONS.TAKE_DUCT_TAPE_FROM_TOOLBOX,
        );
        actions.push(
          zoneActions.OUTSIDE_TRUCK_INIT_ACTIONS
            .TAKE_ADJUSTABLE_WRENCH_FROM_TOOLBOX,
        );
      }
      return actions;
    },
  },
  //###################################################################
  TRUCK_CABIN: {
    name: "TRUCK CABIN",
    description:
      "The dashboard gauges flicker erratically under low battery voltage. Outside the cracked windshield, " +
      "steam coming from the engine slowly dissipate in the glacial crosswinds",
    getActions: (): ZoneAction[] => {
      const actions: ZoneAction[] = [];
      actions.push(zoneActions.TRUCK_CABIN_INIT_ACTIONS.GET_OUT_OF_TRUCK_INIT);
      if (!hasFlag("OPENED_GLOVE_BOX")) {
        actions.push(
          zoneActions.TRUCK_CABIN_INIT_ACTIONS.OPEN_GLOVE_BOX_TRUCK_INIT,
        );
      } else {
        actions.push(
          zoneActions.TRUCK_CABIN_INIT_ACTIONS.TAKE_GLOVE_FROM_GLOVE_BOX,
        );
        actions.push(
          zoneActions.TRUCK_CABIN_INIT_ACTIONS.TAKE_FLARE_FROM_GLOVE_BOX,
        );
        actions.push(
          zoneActions.TRUCK_CABIN_INIT_ACTIONS.READ_EMERGENCY_MANUAL_INIT,
        );
        actions.push(
          zoneActions.TRUCK_CABIN_INIT_ACTIONS.TAKE_TRUCK_INSURANCE_PAPER,
        );
      }
      return actions;
    },
  },
  //################################################
  WATCH_POST_OUTSIDE: {
    name: "OUTSIDE WATCH POST",
    description:
      "The watch post's steel door has been ripped off its hinges and thrown into the snow. " +
      "Broken glass surrounds the dark entrance",
    getActions: (): ZoneAction[] => {
      //focus
      if (getFocus() === "FIRST_ENCOUNTER") {
        return getFirstEncounterActions("WATCH_POST_OUTSIDE");
      }
      //normal actions
      const actions: ZoneAction[] = [];
      actions.push(zoneActions.WATCH_POST_OUTSIDE.GO_BACK_TO_CHECKPOINT);
      actions.push(zoneActions.WATCH_POST_OUTSIDE.GO_INSIDE_WATCH_POST);
      return actions;
    },
  },
  //############################################
  WATCH_POST: {
    name: "INSIDE WATCH POST",
    description:
      "A small freezing room filled with dead monitor. " +
      "Keller's body lies motionless against the main terminal's chassis",
    getActions: (): ZoneAction[] => {
      //focus
      if (getFocus() === "TELLING_QG") {
        return getWhatToSayToQG();
      }
      if (getFocus() === "FIRST_ENCOUNTER") {
        return getFirstEncounterActions("WATCH_POST");
      }
      //normal action
      const actions: ZoneAction[] = [];
      actions.push(zoneActions.WATCH_POST.GO_BACK_OUTSIDE_WATCH_POST);
      if (
        !hasFlag("SEARCHED_KELLER_BODY") &&
        hasFlag("DISCOVERED_KELLER_BODY")
      ) {
        actions.push(zoneActions.WATCH_POST.SEARCH_KELLER_BODY);
      } else {
        actions.push(zoneActions.WATCH_POST.TAKE_KELLER_CREDENTIAL);
        actions.push(zoneActions.WATCH_POST.TAKE_KELLER_KEYCARD);
        actions.push(zoneActions.WATCH_POST.TAKE_PEN_FROM_KELLER);
      }
      if (doesThePlayerHasTheItem("robot_memory_module")) {
        actions.push(zoneActions.WATCH_POST.INSERT_MEMORY_MODULE);
      } else {
        actions.push(zoneActions.WATCH_POST.TAKE_MEMORY_MODULE);
      }
      return actions;
    },
  },
  //##########################################
  GATE_CHECKPOINT: {
    name: "SECURITY GATE AND BOOTH",
    description:
      "A metal gate squeal under a flickering floodlight. The guard shack's front window" +
      " is shattered inward inside the shack.",
    getActions: (): ZoneAction[] => {
      //focus
      if (getFocus() === "JUNCTION_BOX") {
        //TODO set the focus at the right place
        return getJunctionBoxActions();
      }
      if (getFocus() === "FIRST_ENCOUNTER") {
        //TODO
        return getFirstEncounterActions("GATE_CHECKPOINT");
      }
      //normal action
      const actions: ZoneAction[] = [];
      actions.push(zoneActions.GATE_CHECKPOINT_ACTION.WALK_BACK_FOREST_TRAIL);
      actions.push(zoneActions.GATE_CHECKPOINT_ACTION.WALK_TOWARD_POST);
      actions.push(zoneActions.GATE_CHECKPOINT_ACTION.ENTER_GUARD_SHACK);
      return actions;
    },
  },
  //##########################################
  GATE_CHECKPOINT_SHACK: {
    name: "CHECKPOINT SHACK",
    description:
      "Inside the shack, its a mess. The guard robot is absolutely wrecked " +
      "on the ground, pieces everywhere along with shattered glass.",
    getActions: (): ZoneAction[] => {
      const actions: ZoneAction[] = [];
      //focus is applicable

      //normal thing
      actions.push(
        zoneActions.GATE_CHECKPOINT_SHACK_ACTIONS.GO_BACK_OUTSIDE_THE_SHACK,
      );
      if (!hasFlag("SEARCHED_GUARD_SHACK")) {
        actions.push(
          zoneActions.GATE_CHECKPOINT_SHACK_ACTIONS.SEARCH_THE_SHACK,
        );
      } else {
        if (
          !doesThePlayerHasTheItem("robot_memory_module") &&
          !hasFlag("LISTENED_MEMORY_MODULE")
        ) {
          actions.push(
            zoneActions.GATE_CHECKPOINT_SHACK_ACTIONS.PICKUP_MEMORY_MODULE,
          );
        }

        //maybe make it so player need to deactivate live wire?
        //maybe make it so if he doesn't an alarm could start and attract "it"?
      }

      return actions;
    },
  },
  //##########################################
  RELAY_A01_OUTSIDE: {
    name: "RELAY-A01 - OUTSIDE BUNKER",
    description:
      "A dead satellite dish towers over the frost basin, next " +
      "to the blast doors of the bunker.",
    getActions: (): ZoneAction[] => {
      const actions: ZoneAction[] = [];
      //TODO do the actions
      actions.push(zoneActions.RELAY_A01_OUTSIDE_ACTIONS.ENTER_BUNKER);
      actions.push(zoneActions.RELAY_A01_OUTSIDE_ACTIONS.INSPECT_FOUNDATION);
      actions.push(
        zoneActions.RELAY_A01_OUTSIDE_ACTIONS.BACK_TO_DIRECTION_SIGN,
      );
      return actions;
    },
  },
  //##########################################
  RELAY_A01: {
    name: "RELAY-A01 - INSIDE BUNKER",
    description:
      "Rows of dead console line the walls, a single breaker panel " +
      "hanging open on the far wall.",
    getActions: (): ZoneAction[] => {
      const actions: ZoneAction[] = [];
      if (getFocus() === "BREAKER_PANEL") {
        return getBreakerPanelActions();
      }
      if (getFocus() === "BREAKER_PANEL_CONNECTION") {
        return getBreakerPanelInspectActions();
      }
      if (getFocus() === "FIRST_ENCOUNTER") {
        return getFirstEncounterActions("RELAY_A01");
      }
      actions.push(zoneActions.RELAY_A01_ACTIONS.GO_OUTSIDE_BUNKER);
      //TODO do the actions
      if (!isDrawingPanelOpenOrNot()) {
        actions.push(zoneActions.RELAY_A01_ACTIONS.OPEN_BREAKER_PANEL);
      } else {
        actions.push(zoneActions.BREAKER_PANEL_ACTIONS.CLOSE_BREAKER_PANEL);
      }
      return actions;
    },
  },
  SHATTERED_RIDGE_TOP: {
    name: "shattered ridge",
    description:
      "A ridge of black rock split into plate by frost, like " +
      "broken kitchenware?(todo)",
    getActions: (): ZoneAction[] => {
      const actions: ZoneAction[] = [];
      //todo

      return actions;
    },
  },
  SHATTERED_RIDGE_SIDE_A01: {
    name: "shattered ridge ( A01 )",
    description: "todo, the bottom of the ridge, on the relay a01 side",
    getActions: (): ZoneAction[] => {
      const actions: ZoneAction[] = [];
      //todo
      return actions;
    },
  },
  SHATTERED_RIDGE_SIDE_EXCAVATION_CAMP: {
    name: "shattered ridge ( EC )",
    description: "todo, the bottom of the ridge, on the excavation camp side",
    getActions: (): ZoneAction[] => {
      const actions: ZoneAction[] = [];
      //todo
      return actions;
    },
  },
  RELAY_B02: {
    name: "Relay B02 - OUTSIDE",
    description: //TODO i'm not sure if i like this description
      "A lattice antenna mast leans off its mounting bolts, " +
      "guy-wires singing when the wind crosses them.",
    getActions: (): ZoneAction[] => {
      const actions: ZoneAction[] = [];
      if (getFocus() === "FIRST_ENCOUNTER") {
      }
      //todo
      return actions;
    },
  },
  RELAY_B02_OUTSIDE: {
    name: "todo (b02-outside)",
    description: "todo",
    getActions: (): ZoneAction[] => {
      const actions: ZoneAction[] = [];
      //todo
      return actions;
    },
  },
  RELAY_C03_AIRLOCK: {
    name: "todo (c03 in between?)",
    description: "todo",
    getActions: (): ZoneAction[] => {
      const actions: ZoneAction[] = [];
      //todo
      return actions;
    },
  },
  RELAY_C03_CORE: {
    name: "todo (co3 core)",
    description: "todo",
    getActions: (): ZoneAction[] => {
      const actions: ZoneAction[] = [];
      //todo
      return actions;
    },
  },
  EXCAVATION_CAMP: {
    name: "todo (camp)",
    description: "todo",
    getActions: (): ZoneAction[] => {
      const actions: ZoneAction[] = [];
      //todo
      return actions;
    },
  },
} as const satisfies Record<string, Zone>;
function getBreakerPanelActions(): ZoneAction[] {
  const actions: ZoneAction[] = [];
  actions.push(zoneActions.BREAKER_PANEL_ACTIONS.CLOSE_BREAKER_PANEL);
  actions.push(zoneActions.BREAKER_PANEL_ACTIONS.INT_1);
  actions.push(zoneActions.BREAKER_PANEL_ACTIONS.INT_2);
  actions.push(zoneActions.BREAKER_PANEL_ACTIONS.INT_3);
  actions.push(zoneActions.BREAKER_PANEL_ACTIONS.INSPECT_CONNECTIONS);
  //TODO do the actions
  return actions;
}

function getBreakerPanelInspectActions(): ZoneAction[] {
  const actions: ZoneAction[] = [];
  if (doesThePlayerHasTheItem("insulated_wirecutter")) {
    actions.push(zoneActions.REPAIR_CONNECTION.TRY_WIRECUTTER);
  }
  if (doesThePlayerHasTheItem("duct_tape")) {
    actions.push(zoneActions.REPAIR_CONNECTION.TRY_DUCT_TAPE);
  }
  if (
    !doesThePlayerHasTheItem("crowbar") &&
    !doesThePlayerHasTheItem("duct_tape")
  ) {
    drawingPanelPrintLine(
      "You have nothing in your inventory " + "that can help with this task",
    ).catch(() => {
      console.error("drawingPanelPrintln failed...");
    });
    actions.push(zoneActions.REPAIR_CONNECTION.TRY_DUCT_TAPE);
  }
  actions.push(zoneActions.REPAIR_CONNECTION.DO_SOMETHING_ELSE);
  return actions;
}
function getJunctionBoxActions(): ZoneAction[] {
  const actions: ZoneAction[] = [];
  //TODO do the actions
  return actions;
}
function getWhatToSayToQG(): ZoneAction[] {
  const actions: ZoneAction[] = [];
  //section for the body
  if (!isCommandInactive(zoneActions.SAY_STUFF_TO_QG.NO_BODY.command)) {
    actions.push(zoneActions.SAY_STUFF_TO_QG.YES_BODY);
  }
  if (!isCommandInactive(zoneActions.SAY_STUFF_TO_QG.YES_BODY.command)) {
    actions.push(zoneActions.SAY_STUFF_TO_QG.NO_BODY);
  }
  // section for the note
  if (!isCommandInactive(zoneActions.SAY_STUFF_TO_QG.NO_NOTE.command)) {
    actions.push(zoneActions.SAY_STUFF_TO_QG.YES_NOTE);
  }
  if (!isCommandInactive(zoneActions.SAY_STUFF_TO_QG.YES_NOTE.command)) {
    actions.push(zoneActions.SAY_STUFF_TO_QG.NO_NOTE);
  }
  // section to see if at least one of both action were done
  if (
    (isCommandInactive(zoneActions.SAY_STUFF_TO_QG.NO_NOTE.command) ||
      isCommandInactive(zoneActions.SAY_STUFF_TO_QG.YES_NOTE.command)) &&
    (isCommandInactive(zoneActions.SAY_STUFF_TO_QG.YES_BODY.command) ||
      isCommandInactive(zoneActions.SAY_STUFF_TO_QG.NO_BODY.command))
  ) {
    zoneActions.SAY_STUFF_TO_QG.PRESS_WHEN_PLAYER_DONE.execute().catch(
      (): void => {
        console.error("i guess bro wanted to throw an error");
      },
    );
  }
  return actions;
}

/**
 * function to get the actions for the first encounter only
 * @param zoneId the zone where the player gets his first encounter
 */
function getFirstEncounterActions(zoneId: ZoneId): ZoneAction[] {
  const actions: ZoneAction[] = [];
  //do the actions
  switch (zoneId) {
    case "WATCH_POST":
      actions.push(zoneActions.FIRST_RESONATOR_ENCOUNTER_WATCHPOST.COVER_EARS);
      actions.push(zoneActions.FIRST_RESONATOR_ENCOUNTER_WATCHPOST.GO_OUTSIDE);
      break;
    case "WATCH_POST_OUTSIDE":
      actions.push(zoneActions.FIRST_RESONATOR_ENCOUNTER_WATCHPOST.GO_INSIDE);
      actions.push(
        zoneActions.FIRST_RESONATOR_ENCOUNTER_WATCHPOST.HIDE_IN_SNOW,
      );
      actions.push(
        zoneActions.FIRST_RESONATOR_ENCOUNTER_WATCHPOST.MAKE_RUN_FOR_IT,
      );
      break;
    case "OUTSIDE_TRUCK":
      actions.push(
        zoneActions.FIRST_RESONATOR_ENCOUNTER_TRUCK.GO_BACK_IN_TRUCK,
      );
      actions.push(
        zoneActions.FIRST_RESONATOR_ENCOUNTER_TRUCK.GO_TOWARD_THE_FOREST,
      );
      actions.push(
        zoneActions.FIRST_RESONATOR_ENCOUNTER_TRUCK.HIDE_UNDER_TRUCK,
      );
      break;
    case "SNOWY_FOREST":
      actions.push(
        zoneActions.FIRST_RESONATOR_ENCOUNTER_SNOWY_FOREST.HIDE_BEHIND_TREE,
      );
      actions.push(
        zoneActions.FIRST_RESONATOR_ENCOUNTER_SNOWY_FOREST.HIDE_IN_THE_SNOW,
      );
      break;
    case "GATE_CHECKPOINT":
      actions.push(
        zoneActions.FIRST_ENCOUNTER_GATE_CHECKPOINT_ACTION.HIDE_IN_SNOW,
      );
      actions.push(
        zoneActions.FIRST_ENCOUNTER_GATE_CHECKPOINT_ACTION
          .MAKE_RUN_FOR_IT_TOWARD_TRUCK,
      );
      actions.push(
        zoneActions.FIRST_ENCOUNTER_GATE_CHECKPOINT_ACTION
          .MAKE_RUN_FOR_IT_TOWARD_FOREST,
      );
      //TODO do this
      break;
    case "RELAY_A01":
      actions.push(zoneActions.FIRST_ENCOUNTER_A01_ACTIONS.HIDE_IN_LOCKER);
      actions.push(zoneActions.FIRST_ENCOUNTER_A01_ACTIONS.KILL_THE_RELAY);
      actions.push(zoneActions.FIRST_ENCOUNTER_A01_ACTIONS.RUN_OUTSIDE);
      //TODO do this
      break;
    default:
      actions.push({
        command: "return (not implemented yet)",
        description:
          "get out of the focus, because this is not implemented yet",
        execute: nothingToBeDone,
      });
  }

  return actions;
}
async function nothingToBeDone(): Promise<void> {
  //yeah, nothing to see here
}
/*
function to get the actions related to opening the toolbox
 */
function getToolBoxActions(): ZoneAction[] {
  const actions: ZoneAction[] = [];
  actions.push(zoneActions.GET_TOOL_BOX_ACTION.DO_SOMETHING_ELSE);
  if (!hasFlag("OPENED_TOOLBOX_INIT")) {
    actions.push(zoneActions.GET_TOOL_BOX_ACTION.FORCE_LATCH_BAREHAND);
    if (doesThePlayerHasTheItem("crowbar")) {
      actions.push(zoneActions.GET_TOOL_BOX_ACTION.FORCE_LATCH_CROWBAR);
    }
    if (doesThePlayerHasTheItem("flare")) {
      actions.push(zoneActions.GET_TOOL_BOX_ACTION.FORCE_LATCH_HEAT);
    }
  }
  return actions;
}
