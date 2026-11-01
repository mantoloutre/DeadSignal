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
} as const satisfies Record<string, ZoneAction>;
