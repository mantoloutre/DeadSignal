import { hasFlag } from "../core/gameState.ts";

/**
 * function to return the good description
 * @returns return the good description for the excavation camp
 */
export function getExcavationCampDescription(): string {
  if (hasFlag("FIRST_TIME_EXCAVATION")) {
    return "this";
  } else {
    return "else";
  }
}
export function relayA01Description(): string {
  return (
    "Row of dead console line the walls, a single breaker panel " +
    "hanging open on the far wall."
  );
}
export function shatteredRidgeTopDescription(): string {
  return (
    "A ridge of black rock split into plate by frost, like " +
    "broken kitchenware" //todo finish this
  );
}
