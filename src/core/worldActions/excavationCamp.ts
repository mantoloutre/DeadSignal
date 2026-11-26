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
  INSPECT_CREW_TRUCK: {
    command: "inspect crew truck",
    description: "inspect the crew's truck",
    execute: actionsFunc.nuhUh,
    oneTime: true,
  },
  TAKE_BLACKBOX: {
    command: "take blackbox",
    description: "take the blackbox that is there",
    execute: actionsFunc.nuhUh,
    oneTime: true,
  },
  INSPECT_DRILL_RIG: {
    command: "inspect the drill rig",
    description: "pretty self-explanatory, inspect the drill rig",
    execute: actionsFunc.nuhUh,
    oneTime: true, //TODO maybe dont make this oneTime ?
  },
  PRY_CONTAINER_DOORS: {
    command: "pry open [crowbar]",
    description: "pry open the container with the crowbar",
    execute: actionsFunc.nuhUh, //TODO do this
    oneTime: true,
  },
  MELT_CONTAINER_SEAL: {
    command: "melt seal [flare]",
    description: "melt the container's seal to open it",
    execute: actionsFunc.nuhUh, //TODO do this
    oneTime: true,
  },
  LOOK_AT_DIG_SITE: {
    command: "look at dig site",
    description:
      "look at the dig site to maybe see something that might " +
      "be interesting.",
    execute: actionsFunc.nuhUh, //TODO do this
    oneTime: true,
  },
  INSPECT_HALF_RAISED_MAST: {
    command: "inspect mast",
    description: "go and inspect the half raised mast",
    execute: actionsFunc.nuhUh,
    oneTime: true,
  },
} as const satisfies Record<string, ZoneAction>;
