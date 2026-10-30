import type { Zone, ZoneAction } from "../data/types.js";
import { FOCUS, getFocus, hasFlag, isCommandInactive } from "./gameState.js";
import { doesThePlayerHasTheItem } from "./inventory.js";
import {
  GATE_CHECKPOINT_ACTION,
  OUTSIDE_TRUCK_INIT_ACTIONS,
  SAY_STUFF_TO_QG,
  SNOWY_FOREST_ACTIONS,
  TRUCK_CABIN_INIT_ACTIONS,
  WATCH_POST,
  WATCH_POST_OUTSIDE,
} from "./worldActions.js";

export type ZoneId = keyof typeof ZONES;

/*
the const containing all the zone that I'm using in the game
 */
export const ZONES = {
  //###################################################################
  SNOWY_FOREST: {
    name: "PERIMETER FOREST TRAIL",
    description:
      "Towering ice-coated pine tree in a frozen service path. Heavy " +
      "perimeter fencing runs parallel to the trail, warping and sheared appart as if " +
      "hit by something big.",
    getActions: (): ZoneAction[] => {
      //if focus its here

      //if there is no current focus then we do the normal thing
      const actions: ZoneAction[] = [];
      actions.push(SNOWY_FOREST_ACTIONS.GO_BACK_TO_TRUCK);

      actions.push(SNOWY_FOREST_ACTIONS.INSPECT_DIRECTION_SIGN);
      if (hasFlag("INSPECTED_DIRECTION_SIGN")) {
        actions.push(SNOWY_FOREST_ACTIONS.WALK_TOWARD_WATCH_POST);
      }
      return actions;
    },
  },
  OUTSIDE_TRUCK: {
    name: "OUTSIDE THE TRUCK",
    description:
      "Sub-zero wind tears through the valley. The service rig rests dead" +
      " in the middle of the road, engine fuming and a hole through the hood",
    getActions: (): ZoneAction[] => {
      //for the focus of the toolbox ( "puzzle" )
      if (getFocus() === FOCUS.TOOLBOX) {
        return getToolBoxActions();
      }
      //if no focus then normal things
      const actions: ZoneAction[] = [];
      actions.push(OUTSIDE_TRUCK_INIT_ACTIONS.GO_BACK_IN_TRUCK_INIT);
      actions.push(
        OUTSIDE_TRUCK_INIT_ACTIONS.WALK_TOWARD_FOREST_FROM_TRUCK_INIT,
      );
      actions.push(OUTSIDE_TRUCK_INIT_ACTIONS.LOOK_AT_ENGINE_TRUCK_INIT);
      actions.push(OUTSIDE_TRUCK_INIT_ACTIONS.OPEN_TRUCK_TRUNK_INIT);
      if (hasFlag("OPENED_TRUCK_TRUNK_INIT")) {
        actions.push(
          OUTSIDE_TRUCK_INIT_ACTIONS.TAKE_CROWBAR_FROM_TRUCK_TRUNK_INIT,
        );
        actions.push(OUTSIDE_TRUCK_INIT_ACTIONS.OPEN_TOOLBOX_TRUCK_TRUNK_INIT);
      }
      if (hasFlag("OPENED_TOOLBOX_INIT")) {
        actions.push(OUTSIDE_TRUCK_INIT_ACTIONS.TAKE_DUCT_TAPE_FROM_TOOLBOX);
        actions.push(
          OUTSIDE_TRUCK_INIT_ACTIONS.TAKE_ADJUSTABLE_WRENCH_FROM_TOOLBOX,
        );
      }
      return actions;
    },
  },
  //###################################################################
  TRUCK_CABIN: {
    name: "TRUCK CABIN",
    description:
      "The dashboard gauges flicker erratically under low battery voltage. Outside the cracked windshield, " +
      "steam slowly dissipate in the glacial crosswinds",
    getActions: (): ZoneAction[] => {
      const actions: ZoneAction[] = [];
      actions.push(); //TODO link the get out of truck
      if (!hasFlag("OPENED_GLOVE_BOX")) {
        actions.push(TRUCK_CABIN_INIT_ACTIONS.OPEN_GLOVE_BOX_TRUCK_INIT);
      } else {
        actions.push(TRUCK_CABIN_INIT_ACTIONS.TAKE_GLOVE_FROM_GLOVE_BOX);
        actions.push(TRUCK_CABIN_INIT_ACTIONS.TAKE_FLARE_FROM_GLOVE_BOX);
        actions.push(TRUCK_CABIN_INIT_ACTIONS.READ_EMERGENCY_MANUAL_INIT);
        actions.push(TRUCK_CABIN_INIT_ACTIONS.TAKE_TRUCK_INSURANCE_PAPER);
      }
      return actions;
    },
  },
  //################################################
  WATCH_POST_OUTSIDE: {
    name: "OUTSIDE WATCH POST",
    description: "you stand just outside the watch post, not finished",
    getActions: (): ZoneAction[] => {
      //focus

      //normal actions
      const actions: ZoneAction[] = [];

      actions.push(WATCH_POST_OUTSIDE.GO_INSIDE_WATCH_POST);
      return actions;
    },
  },
  //############################################
  WATCH_POST: {
    name: "INSIDE WATCH POST",
    description:
      "you are now standing inside the watch post, the air feels heavy...", //TODO do the lore
    getActions: (): ZoneAction[] => {
      //focus
      if (getFocus() === FOCUS.TELLING_QG) {
        return getWhatToSayToQG();
      }
      //normal action
      const actions: ZoneAction[] = [];
      actions.push(WATCH_POST.GO_BACK_OUTSIDE_WATCH_POST);
      if (
        !hasFlag("SEARCHED_KELLER_BODY") &&
        hasFlag("DISCOVERED_KELLER_BODY")
      ) {
        actions.push(WATCH_POST.SEARCH_KELLER_BODY);
      } else {
        actions.push(WATCH_POST.TAKE_KELLER_CREDENTIAL);
        actions.push(WATCH_POST.TAKE_PEN_FROM_KELLER);
      }
      return actions;
    },
  },
  //##########################################
  GATE_CHECKPOINT: {
    name: "SECURITY GATE AND BOOTH",
    description:
      "A metal gate squeal under a flickering floodlight. The guard shack's front window" +
      " is shattered outward into the snow.",
    getActions: (): ZoneAction[] => {
      //focus
      if (getFocus() === FOCUS.JUNCTION_BOX) {
        //TODO set the focus at the right place
        return getJunctionBoxActions();
      }
      //normal action
      const actions: ZoneAction[] = [];
      actions.push(GATE_CHECKPOINT_ACTION.WALK_BACK_FOREST_TRAIL);
      actions.push(GATE_CHECKPOINT_ACTION.WALK_TOWARD_POST); //walk toward post
      actions.push(GATE_CHECKPOINT_ACTION.ENTER_GUARD_SHACK); //go in shack
      return actions;
    },
  },
  GATE_CHECKPOINT_SHACK: {
    name: "CHECKPOINT SHACK",
    description: "", //TODO do the description
    getActions: (): ZoneAction[] => {
      const actions: ZoneAction[] = [];
      //focus is applicable

      //normal thing
      actions.push(); //TODO link action goBackOutside
      actions.push(); //TODO link the search room

      return actions;
    },
  },
} as const satisfies Record<string, Zone>;

function getJunctionBoxActions(): ZoneAction[] {
  const actions: ZoneAction[] = [];
  //TODO
  return actions;
}

function getWhatToSayToQG(): ZoneAction[] {
  //TODO find out why this doesnt work
  const actions: ZoneAction[] = [];
  if (isCommandInactive(""))
    actions.push(SAY_STUFF_TO_QG.PRESS_WHEN_PLAYER_DONE);
  //section for the body
  if (!isCommandInactive("No Body")) {
    actions.push(SAY_STUFF_TO_QG.YES_BODY);
  }
  if (!isCommandInactive("Dead Body")) {
    actions.push(SAY_STUFF_TO_QG.NO_BODY);
  }
  // section for the note
  if (!isCommandInactive("No Note Found")) {
    actions.push(SAY_STUFF_TO_QG.YES_NOTE);
  }
  if (!isCommandInactive("Note Found")) {
    actions.push(SAY_STUFF_TO_QG.NO_NOTE);
  }
  return actions;
}

/*
function to get the actions related to opening the toolbox
 */
function getToolBoxActions(): ZoneAction[] {
  const actions: ZoneAction[] = [];
  actions.push(); //todo do something else
  if (!hasFlag("OPENED_TOOLBOX_INIT")) {
    actions.push(); //todo latch barehand
    if (doesThePlayerHasTheItem("crowbar")) {
      actions.push(); //todo crowbar
    }
    if (doesThePlayerHasTheItem("flare")) {
      //TODO make autocompletion for item type???
      actions.push(); //todo try heat
    }
  }
  return actions;
}
