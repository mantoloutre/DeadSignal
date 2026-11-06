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
  INT_1: {
    command: "INT 1",
    description: "toggle the first switch",
    execute: async () => {}, //TODO do the action
  },
  INT_2: {
    command: "INT 2",
    description: "toggle the second switch",
    execute: async () => {}, //TODO do the action
  },
  INT_3: {
    command: "INT 3",
    description: "toggle the third switch",
    execute: async () => {}, //TODO do the action
  },
  // Keller cut it and maybe left a note?
  INSPECT_CONNECTIONS: {
    command: "inspect connections",
    description:
      "inspect the connection of the switches to see what happened here",
    execute: async () => {}, //TODO do the action
  },
} as const satisfies Record<string, ZoneAction>;
export const REPAIR_CONNECTION = {
  TRY_CROWBAR: {
    command: "try crowbar",
    description:
      "try to wedge the crowbar so the two end of the " + "wire connects",
    execute: async () => {}, //TODO do the action
  },
  //At this point in game if player doesn't have either crowbar or duct tape well he's
  //blocked until he gets one of the two ( he should have it )
  TRY_DUCT_TAPE: {
    command: "try duct tape",
    description: "try to join the two end of the wire with duct tape", //TODO upgrade description?
    execute: async () => {}, //todo do the action
  },
} as const satisfies Record<string, ZoneAction>;
