import { hasFlag } from "../core/gameState.ts";

/**
 * function to return the good description
 * @returns return the good description for the excavation camp
 */
export function getExcavationCampDescription(): string {
  if (hasFlag("FIRST_TIME_EXCAVATION")) {
    return "todo, shortder description";
  } else {
    return (
      "Two relay masts lie half-raised on their rigs, chaines " +
      "still looped through their lattice. A heavy container compoud " +
      "sits under orange tarp. It was left mid-task."
    );
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
