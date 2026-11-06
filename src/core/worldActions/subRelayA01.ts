import type { ZoneAction } from "../../data/types.ts";
import * as actionsFunc from "../actions/subRelayA01Actions.ts";

export const SUBRELAYA01_OUTSIDE_ACTIONS = {};
export const SUBRELAYA01_ACTIONS = {
  // make it only available if breaker panel is closed
  OPEN_BREAKER_PANEL: {
    command: "open breaker panel",
    description: "open the breaker panel to access it",
    execute: async () => {}, //TODO do the action
  },
  // make it only available if breaker panel is open
  CLOSE_BREAKER_PANEL: {
    command: "close breaker panel",
    description: "close the door of the breaker panel",
    execute: async () => {}, //TODO do the action
  },
} as const satisfies Record<string, ZoneAction>;
