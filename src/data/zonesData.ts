import { gameBridge } from "../core/gameBridge.ts";

/**
 * function to return the good description
 * @returns return the good description for the excavation camp
 */
export function excavationCampDescription(): string {
  if (gameBridge.hasVisitedZone("EXCAVATION_CAMP")) {
    return "todo, short description";
  } else {
    return (
      "Two relay masts lie half-raised on their rigs, chaines " +
      "still looped through their lattice. A heavy container compoud " +
      "sits under orange tarps. The site is immaculate, because nobody " +
      "left it gradually, they left it mid-task. Just, gone..."
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
export function relayB02OutsideDescription(): string {
  if (gameBridge.hasVisitedZone("RELAY_B02_OUTSIDE")) {
    return "todo - shorter description";
  } else {
    return (
      "A finished lattice mast, the only node the crew completed. " +
      "It stands taller than it should, guy-wires humming faintly even dead. " +
      "The station cabinet below is armored, and beside the door, dozen of " +
      "scratched tally marks wait in the paint."
    ); //TODO idk if i wanna remove the tally mark
  }
}
