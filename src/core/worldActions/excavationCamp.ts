import type { ZoneAction } from "../../data/types.ts";
import * as actionsFunc from "../actions/excavationCampActions.ts";

export const EXCAVATION_CAMP_TODO = {
  WALK_TOWARD_WATCHPOST: {
    command: "walk toward watchpost",
    description: "walk toward the watchpost",
    execute: actionsFunc.nuhUh,
  },
  WALK_BACK_UP: {
    command: "walk back ridge top",
    description: "walk back toward the ridge",
    execute: actionsFunc.nuhUh,
  },
} as const satisfies Record<string, ZoneAction>;
