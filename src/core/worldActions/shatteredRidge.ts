import type { ZoneAction } from "../../data/types.ts";
import * as actionsFunc from "../actions/shatteredRidgeActions.ts";

export const SHATTERED_RIDGE_ACTIONS = {
  CLIMB_TO_TOP: {
    command: "climb to top",
    description: "climb to the top of the ridge",
    execute: actionsFunc.nuhUh,
  },
} as const satisfies Record<string, ZoneAction>;
