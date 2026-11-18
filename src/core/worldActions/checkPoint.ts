import type { ZoneAction } from "../../data/types.js";
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
} as const satisfies Record<string, ZoneAction>;
export const GATE_CHECKPOINT_SHACK_ACTIONS = {
  GO_BACK_OUTSIDE_THE_SHACK: {
    command: "Go Back Outside",
    description: "Go back outside of the shack",
    execute: actionsFunc.goOutsideTheShack_GateCheckpoint,
  },
  SEARCH_THE_SHACK: {
    command: "Search the room",
    description: "search the messy room for anything that could be useful",
    execute: actionsFunc.searchTheGuardShack,
  },
  PICKUP_MEMORY_MODULE: {
    command: "Salvage memory module",
    description: "take the memory module from the destroyed robot head",
    execute: actionsFunc.salvageMemoryModule,
    oneTime: true,
  },
} as const satisfies Record<string, ZoneAction>;
/*
###################################################
 */
export const FIRST_ENCOUNTER_GATE_CHECKPOINT_ACTION = {
  HIDE_IN_SNOW: {
    command: "Hide in snow",
    description: "hide in the snow near the gate",
    execute: actionsFunc.hideInShowFirstEncounter,
  },
  MAKE_RUN_FOR_IT_TOWARD_TRUCK: {
    command: "run toward truck",
    description: "try to make a run for it toward the truck",
    execute: actionsFunc.makeRunForItTowardForestFirstEncounter,
  },
  MAKE_RUN_FOR_IT_TOWARD_FOREST: {
    command: "run toward forest",
    description: "try to make a fur for it toward the forest",
    execute: actionsFunc.makeRunForItTowardForestFirstEncounter,
  },
  //for inside the shack
  HIDE_UNDER_DESK: {
    command: "hide under desk",
    description: "hide under the only desk there is",
    execute: actionsFunc.jumpOutsideWindowFirstEncounterShack,
  },
  JUMP_OUT_OF_WINDOW: {
    command: "jump out window",
    description: "try to jump out of the broken window",
    execute: actionsFunc.hideUnderDeskFirstEncounterShack,
  },
} as const satisfies Record<string, ZoneAction>;
