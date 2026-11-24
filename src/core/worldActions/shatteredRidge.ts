import type { ZoneAction } from "../../data/types.ts";
import * as actionsFunc from "../actions/shatteredRidgeActions.ts";

export const SHATTERED_RIDGE_A01_ACTIONS = {
  CLIMB_TO_TOP: {
    command: "climb to top",
    description: "climb to the top of the ridge",
    execute: actionsFunc.nuhUh, //TODO do this
  },
  INSPECT_REBAR: {
    command: "inspect rebar",
    description: "inspect the weird rebar sticking out of a rock",
    execute: actionsFunc.nuhUh, //TODO do this
    oneTime: true,
  },
} as const satisfies Record<string, ZoneAction>;
export const SHATTERED_RIDGE_TOP_ACTIONS = {
  //todo
  INSPECT_FENCE: {
    command: "inspect the fence",
    description: "inspect the breach on the fence",
    execute: actionsFunc.nuhUh, //TODO do this
  },
  TAKE_A_BREAK: {
    command: "sit & take break",
    description: "sit down for a minute and take a break",
    execute: actionsFunc.nuhUh, //TODO do this
  },
  LOOK_TOWARD_DIG_SITE: {
    command: "look toward dig site",
    description: "look down toward the excavation camp",
    execute: actionsFunc.nuhUh, //TODO do this
    //make it oneTime?
  },
  FOLLOW_THE_PATH_DOWN: {
    command: "go down path toward EC",
    description: "walk down the path toward the excavation camp",
    execute: actionsFunc.nuhUh,
  },
} as const satisfies Record<string, ZoneAction>;
export const SHATTERED_RIDGE_EC_ACTIONS = {
  //todo
  FOLLOW_THE_PATH_UP: {
    command: "walk to top",
    description: "walk toward the summit of the ridge",
    execute: actionsFunc.nuhUh,
  },
} as const satisfies Record<string, ZoneAction>;
