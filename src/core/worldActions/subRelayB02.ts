import type { ZoneAction } from "../../data/types.ts";
import * as actionsFunc from "../actions/subRelayB02Actions.ts";

export const RELAY_B02_OUTSIDE_ACTIONS = {
  INSPECT_MARKS: {
    command: "inspect mark",
    description: "inspect the marks", //TODO finish description
    execute: async (): Promise<void> => {}, //todo do this
    oneTime: true,
  },
  OPEN_FUSE_LOCKER: {
    //todo make it require the keycard from keller
    command: "open fuse locker",
    description: "open the fuse locker",
    execute: actionsFunc.nuhuh,
  },
} as const satisfies Record<string, ZoneAction>;
