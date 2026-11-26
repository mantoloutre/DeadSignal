import { hasFlag } from "../core/gameState.ts";
import type { ZoneId } from "../core/world.ts";

export const ZONE_DESCRIPTION = {
  TRUCK_CABIN: "none",
  OUTSIDE_TRUCK: "todo",
  SNOWY_FOREST: "todo",
  WATCH_POST_OUTSIDE: "todo",
  WATCH_POST: "todo",
  RELAY_A01_OUTSIDE: "todo",
  RELAY_A01: "todo",
  SHATTERED_RIDGE_SIDE_A01: "todo",
  SHATTERED_RIDGE_TOP: "todo",
  EXCAVATION_CAMP: getExcavationCampDescription(),
  SHATTERED_RIDGE_SIDE_EXCAVATION_CAMP: "todo",
  RELAY_B02: "todo",
  RELAY_B02_OUTSIDE: "todo",
  RELAY_C03_AIRLOCK: "todo",
  GATE_CHECKPOINT_SHACK: "todo",
  GATE_CHECKPOINT: "todo",
  RELAY_C03_CORE: "todo",
} as const satisfies Record<ZoneId, string>;

/**
 * function to return the good description
 * @returns return the good description for the excavation camp
 */
function getExcavationCampDescription(): string {
  if (hasFlag("FIRST_TIME_EXCAVATION")) {
    return "this";
  } else {
    return "else";
  }
}
