import type { ZoneAction } from "../../data/types.js";
import * as actionsFunc from "../actions/snowyForestActions.js";

export const SNOWY_FOREST_ACTIONS = {
  INSPECT_DIRECTION_SIGN: {
    command: "inspect the direction sign",
    description: "inspect it to know where to go",
    execute: actionsFunc.inspectDirectionSign,
  },
  GO_BACK_TO_TRUCK: {
    command: "go back to the truck",
    description: "walk back to the truck",
    execute: actionsFunc.goBackToTheTruck,
  },
  WALK_TOWARD_GATE_CHECKPOINT: {
    command: "walk toward checkpoint",
    description: "walk toward the gate checkpoint",
    execute: actionsFunc.walkTowardCheckpoint,
  },
  WALK_TOWARD_FROST_BASIN: {
    command: "walk toward frost basin",
    description:
      "walk toward the frost bassin ( a.k.a the relay station A-01 ( bunker ))",
    execute: actionsFunc.walkTowardFrostBasin,
  },
} as const satisfies Record<string, ZoneAction>;
export const FIRST_RESONATOR_ENCOUNTER_SNOWY_FOREST = {
  HIDE_BEHIND_TREE: {
    command: "hide behind tree",
    description: "hide behind a tree",
    execute: actionsFunc.firstEncounterHideBehindTree,
  },
  HIDE_IN_THE_SNOW: {
    command: "hide in snow",
    description: "hide in a snow nears the trees ( lot of snow )",
    execute: actionsFunc.firstEncounterHideInSnow,
  },
} as const satisfies Record<string, ZoneAction>;
