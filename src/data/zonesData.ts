import { gameBridge } from "../core/gameBridge.ts";

/**
 * function to give back the description for the snowy forest
 * TODO make the shorter description
 */
export function snowyForestDescription(): string {
  return (
    "Towering ice-coated pine tree in a frozen service path. Heavy " +
    "perimeter fencing runs parallel to the trail, warping and sheared appart as if " +
    "hit by something big."
  );
}
/**
 * function to return the good description
 * @returns return the good description for the excavation camp
 */
export function excavationCampDescription(): string {
  if (gameBridge.hasVisitedZone("EXCAVATION_CAMP")) {
    return "todo, short description";
  } else {
    return (
      "One relay mast lies half-raised on its rig, chains still " +
      "looped through its lattice. A heavy container compound " +
      "sits under corporate orange tarps beside a crew truck sunk nose-down " +
      "in a drift. The site is immaculate because nobody left it " +
      "gradually. They left it mid-task."
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
