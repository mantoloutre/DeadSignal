import type { ZoneAction } from "../../data/types.ts";
import * as actionsFunc from "../actions/relayC03Actions.ts";
export const DIG_SITE_ACTIONS = {
  GO_BACK_EC: {
    command: "go back ec",
    description: "go back to the excavation camp",
    execute: actionsFunc.nuhUh,
  },
} as const satisfies Record<string, ZoneAction>;
