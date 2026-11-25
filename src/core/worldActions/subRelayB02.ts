import type { ZoneAction } from "../../data/types.ts";

export const RELAY_B02_OUTSIDE_ACTIONS = {
  INSPECT_MARKS: {
    command: "inspect mark",
    description: "inspect the marks", //TODO finish description
    execute: async (): Promise<void> => { }, //todo do this
    oneTime: true,
  },
} as const satisfies Record<string, ZoneAction>;
