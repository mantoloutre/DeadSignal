import type { ZoneAction } from "../../data/types.ts";
import * as actionsFunc from "../actions/subRelayB02Actions.ts";

export const RELAY_B02_OUTSIDE_ACTIONS = {
  INSPECT_MARKS: {
    command: "inspect mark",
    description: "inspect the marks", //TODO finish description
    execute: actionsFunc.nuhuh, //todo do this
    oneTime: true,
  },
  OPEN_FUSE_LOCKER: {
    //todo make it require the keycard from keller
    command: "open fuse locker",
    description: "open the fuse locker",
    execute: actionsFunc.nuhuh,
  },
  READ_STATION_DIAGNOSTIC: {
    command: "read station diagnostic",
    description: "Read the diagnostic of the relay b-02",
    execute: actionsFunc.nuhuh,
  },
} as const satisfies Record<string, ZoneAction>;
