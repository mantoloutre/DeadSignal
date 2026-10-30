import type { ZoneAction } from "../data/types";
import { hasFlag, isCommandInactive } from "./gameState.js";
import { doesThePlayerHasTheItem } from "./inventory.js";
import { GATE_CHECKPOINT_ACTION, WATCH_POST_OUTSIDE } from "./worldActions";

export type ZoneId = keyof typeof ZONES;
export type ZoneFocus = (typeof FOCUS)[keyof typeof FOCUS];

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
      actions.push(); //TODO put the command to go back to the truck

      actions.push({
        command: "inspect the direction sign",
        description: "inspect it to know where to go",
        execute: actionsFunc.inspectDirectionSign,
      });
      if (hasFlag("INSPECTED_DIRECTION_SIGN")) {
        actions.push({
          command: "walk toward the watch tower",
          description:
            "walk toward the watch tower which also serve as the main relay tower",
          execute: actionsFunc.walkTowardMainWatchPost,
        });
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
      actions.push({
        command: "get back in the truck",
        description: "go back inside the truck",
        execute: actionsFunc.goBackInThePrettyTruck,
      });
      actions.push({
        command: "walk toward forest",
        description: "start walking toward the forest",
        execute: actionsFunc.walkTowardSnowyForestFromOutsideTruck,
      });
      actions.push({
        command: hasFlag("OPENED_HOOD_TRUCK_INIT")
          ? "look at the engine"
          : "open the hood and look at the engine",
        description: "look at the engine and open the hood if its in the way",
        execute: actionsFunc.openTheHoodAndOrLookAtTheEngineInit,
      });
      actions.push({
        command: hasFlag("OPENED_TRUCK_TRUNK_INIT")
          ? "look into the truck's trunk"
          : "open the truck's trunk",
        description:
          "check the truck trunk's to see if there is anything useful in there",
        execute: actionsFunc.checkTruckTrunk,
        oneTime: true,
      });
      if (hasFlag("OPENED_TRUCK_TRUNK_INIT")) {
        actions.push({
          command: "take crowbar",
          description: "take the crowbar from the trunk",
          execute: actionsFunc.addCrowBarToThePlayerInventory,
          oneTime: true,
        });
        actions.push({
          command: hasFlag("OPENED_TOOLBOX_INIT")
            ? "look into the toolbox"
            : "open the toolbox",
          description: "open the toolbox ",
          execute: actionsFunc.openToolBoxTruckTrunkInit,
        });
      }
      if (hasFlag("OPENED_TOOLBOX_INIT")) {
        actions.push({
          command: "pickup duct tape",
          description: "take the roll of duct tape from the toolbox",
          execute: actionsFunc.takeDuctTapeFromToolBoxInit,
          oneTime: true,
        });
        actions.push({
          command: "pickup ajustable wrench",
          description: "take the ajustable wrench from the toolbox",
          execute: actionsFunc.takeAdjustableWrenchFromToolBoxInit,
          oneTime: true,
        });
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
        actions.push({
          command: "open glove box",
          description: "open the glove box to see what's inside",
          execute: actionsFunc.lookInGloveBoxInTruckCabin,
        });
      } else {
        actions.push({
          command: "take gloves",
          description:
            "take the good looking winter gloves inside the glove box",
          execute: actionsFunc.addWinterGlovesToThePlayerInventory,
          oneTime: true,
        });
        actions.push({
          command: "take flares",
          description: "take the two flares from the glove box",
          execute: actionsFunc.addFlareTruckCabin,
          oneTime: true,
        });
        actions.push({
          command: "read emergency manual",
          description:
            "read the emergency manual to know what to do in case of an emergency",
          execute: actionsFunc.readEmergencyManual,
          oneTime: true,
        });
        actions.push(); //TODO link take truck insurance paper
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
        actions.push(WATCH_POST.AKE_PEN_FROM_KELLER);
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
      actions.push(GATE_CHECKPOINT_ACTION); //walk toward post
      actions.push(GATE_CHECKPOINT_ACTION); //go in shack
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
  if (isCommandInactive("")) actions.push(); //TODO link the press when done
  //section for the body
  if (!isCommandInactive("No Body")) {
    actions.push(); //TODO link yes_body
  }
  if (!isCommandInactive("Dead Body")) {
    actions.push(); //TODO link no_body
  }
  // section for the note
  if (!isCommandInactive("No Note Found")) {
    actions.push(); //TODO link yes_note
  }
  if (!isCommandInactive("Note Found")) {
    actions.push(); //TODO link no_note
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
