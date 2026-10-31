import type { ZoneAction } from "../../data/types";
import * as actionsFunc from "../actions/index.js";

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
  WALK_TOWARD_WATCH_POST: {
    command: "walk toward the watch tower",
    description:
      "walk toward the watch tower which also serve as the main relay tower",
    execute: actionsFunc.walkTowardMainWatchPost,
  },
} as const satisfies Record<string, ZoneAction>;
