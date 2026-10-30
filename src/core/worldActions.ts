import type { ZoneAction } from "../data/types.js";
import * as actionsFunc from "./actions.js";

export const WORLD_ACTIONS = {
  //###########
  //truck cabin
  //###########
  //#############
  //outside truck
  //#############

  //############
  //snowy forest
  //############
  GO_BACK_TO_TRUCK: {
    command: "go back to the truck",
    description: "walk back to the truck",
    execute: actionsFunc.goBackToTheTruck,
  },
} as const satisfies Record<string, ZoneAction>;
// actions for the zone inside the truck
export const TRUCK_CABIN_INIT_ACTIONS = {
  GET_OUT_OF_TRUCK_INIT: {
    command: "get out of the truck",
    description: "simply get out of the truck",
    execute: actionsFunc.getOutOfTheDamnTruck,
  },
  TAKE_TRUCK_INSURANCE_PAPER: {
    command: "take truck insurance papers",
    description: "Take the truck's insurance paper",
    execute: actionsFunc.addTruckInsurancePaper,
    oneTime: true,
  },
} as const satisfies Record<string, ZoneAction>;
/*
###################################################
 */

// actions for the zone outside the truck
export const OUTSIDE_TRUCK_INIT_ACTIONS = {
  GO_BACK_IN_TRUCK_INIT: {},
};
/*
###################################################
 */
// actions for the snowy forest ( perimeter )
export const SNOWY_FOREST_ACTIONS = {} as const satisfies Record<
  string,
  ZoneAction
>;
/*
###################################################
 */
export const GATE_CHECKPOINT_ACTION = {
  WALK_BACK_FOREST_TRAIL: {
    command: "walk back to forest trail",
    description: "walk back to the snowy forest",
    execute: actionsFunc.walkBackSnowyForestTowardTruck,
  },
  WALK_TOWARD_POST: {
    command: "walk toward the watch post",
    description: "walk to the watch post",
    execute: actionsFunc.walkTowardMainWatchPost,
  },
  ENTER_GUARD_SHACK: {
    command: "enter guard shack",
    description: "enter the guard shack",
    execute: goInTheShack_GateCheckpoint,
  },
} as const satisfies Record<string, ZoneAction>;
/*
###################################################
 */
export const GATE_CHECKPOINT_SHACK_ACTIONS = {
  GO_BACK_OUTSIDE_THE_SHACK: {
    command: "Go Back Outside",
    description: "Go back outside of the shack",
    execute: actionsFunc.goOutsideTheShack_GateCheckpoint, //TODO bind the action
  },
  SEARCH_THE_SHACK: {
    command: "Search the room",
    description: "search the messy room for anything that could be useful",
    execute: actionsFunc.searchTheGuardShack, //TODO bind the action
  },
} as const satisfies Record<string, ZoneAction>;
/*
###################################################
 */
export const WATCH_POST_OUTSIDE = {
  GO_INSIDE_WATCH_POST: {
    command: "go inside the watch post",
    description: "walk inside the watch post",
    execute: actionsFunc.goInsideTheWatchPost,
  },
} as const satisfies Record<string, ZoneAction>;
/*
###################################################
 */
export const WATCH_POST = {
  GO_BACK_OUTSIDE_WATCH_POST: {
    command: "go back outside",
    description: "go back outside the watch post",
    execute: actionsFunc.walkBackOutside,
  },
  SEARCH_KELLER_BODY: {
    command: "search body",
    description: "search Keller's body",
    execute: actionsFunc.searchKellerBody,
    oneTime: true,
  },
  TAKE_KELLER_CREDENTIAL: {
    command: "take Keller's credential",
    description: "take the little usb key that serves as credential",
    execute: actionsFunc.takeKellerCredential,
    oneTime: true,
  },
  TAKE_PEN_FROM_KELLER: {
    command: "take pen",
    description: "take the pen from his pocket",
    execute: actionsFunc.takePenFromKeller,
    oneTime: true,
  },
} as const satisfies Record<string, ZoneAction>;
/*
###################################################
 */
export const SAY_STUFF_TO_QG = {
  PRESS_WHEN_PLAYER_DONE: {
    command: "Press When done",
    description: "press this when your are done saying stuff",
    execute: confirmingDoneTalkingToQG,
    oneTime: true,
  },
  YES_BODY: {
    command: "Dead Body",
    description: "Tell QG about the dead body",
    execute: actionsFunc.tellQGAboutDeadBody,
    oneTime: true,
  },
  NO_BODY: {
    command: "No Body",
    description: "Don't tell QG about the dead body",
    execute: actionsFunc.tellQGNoBodyFound,
    oneTime: true,
  },
  YES_NOTE: {
    command: "Note Found",
    description: "Tell QG about the note Keller left",
    execute: actionsFunc.tellQGAboutNoteLeft,
    oneTime: true,
  },
  NO_NOTE: {
    command: "No Note Found",
    description: "Don't tell QG about the note Keller left",
    execute: actionsFunc.DontTellQGAboutNoteLeft,
    oneTime: true,
  },
} as const satisfies Record<string, ZoneAction>;
/*
###################################################
 */
export const GET_TOOL_BOX_ACTION = {
  DO_SOMETHING_ELSE: {
    command: "do something else",
    description: "do something else than trying to open the toolbox",
    execute: actionsFunc.outOfToolBoxFocus,
  },
  FORCE_LATCH_BAREHAND: {
    command: "force latch barehanded / with gloves",
    description:
      "try to break / force open the latch on the toolbox with your hands",
    execute: actionsFunc.forceToolBoxOpenWithHand,
  },
  FORCE_LATCH_CROWBAR: {
    command: "force latch with crowbar",
    description: "try to pry open the toolbox with your crowbar",
    execute: actionsFunc.pryToolBoxWithCrowbar,
  },
  FORCE_LATCH_HEAT: {
    command: "try with heat (-1 flare)",
    description: "try to light up a flare to try and head up the lock",
    execute: actionsFunc.doArsonToHeatTheLatch,
  },
};
