import type { ZoneAction } from "../../data/types.ts";
import * as actionsFunc from "../actions/shatteredRidgeActions.ts";

export const SHATTERED_RIDGE_A01_ACTIONS = {
  CLIMB_TO_TOP: {
    command: "climb to top",
    description: "climb to the top of the ridge",
    execute: actionsFunc.climbToSummitFromA01,
  },
  INSPECT_REBAR: {
    command: "inspect rebar",
    description: "inspect the weird rebar sticking out of a rock",
    execute: actionsFunc.inspectTheBeautifulPieceOfRebarStickingOut,
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
    execute: actionsFunc.nuhUh, //TODO do this make it actually be 1 minute
  },
  LOOK_TOWARD_DIG_SITE: {
    command: "look toward dig site",
    description: "look down toward the excavation camp",
    execute: actionsFunc.nuhUh, //TODO do this
    //make it oneTime?
  },
  FOLLOW_THE_PATH_DOWN_EC: {
    command: "go down path toward EC",
    description: "walk down the path toward the excavation camp",
    execute: actionsFunc.nuhUh, //TODO load the excavation camp
  },
  GO_BACK_DOWN_A01: {
    command: "down toward first relay",
    description: "go back down toward the first relay station",
    execute: actionsFunc.nuhUh, //TODO load the damn thing
  },
  LISTEN_TO_STUFF: {
    command: "Admire the view", //aka listen to stuff
    description:
      "take a second to admire the view " +
      "(also listen to what might be happening)",
    execute: actionsFunc.nuhUh, //TODO do this
    oneTime: true,
  },
} as const satisfies Record<string, ZoneAction>;
export const SHATTERED_RIDGE_B02_ACTIONS = {
  GO_BACK_SUMMIT: {
    command: "climb to top",
    description: "climb back to the top of the ridge",
    execute: actionsFunc.nuhUh,
  },
} as const satisfies Record<string, ZoneAction>;
