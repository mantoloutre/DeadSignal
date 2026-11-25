import { printToTerminal } from "../../ui/dom.ts";

export async function nuhUh(): Promise<void> {
  await printToTerminal(
    "this was not implemented... be patient thx!",
    "system",
  );
}
/*
#############################
zone: bottom summit a01 side 
#############################
*/
/**
 * function to handle the dialog of an action
 */
export async function climbToSummitFromA01(): Promise<void> {
  await printToTerminal(
    "You climb the ridge path, boots cracking through refrozen " +
    "slush on every step.",
    "action",
  );
  await printToTerminal(
    "Halfway up, the wind stops. Not slows, Stops.",
    "action",
  );
  await printToTerminal(
    "the gusts that were tearing at you from the basin are " +
    "suddenly gone. Your own breathing is suddenly the loudest " +
    "thing in the valley.",
    "system",
  );
  await printToTerminal(
    //todo i feel this is too much added?
    "You glance back down: the whiteout over the frost basin still churns, " +
    "loud and violent. A curtain of weather you crossed out of.",
    "system",
  );
}
//yes i know function name a uselessly long, but it isnt a game studio so i do wathever i want :3
/**
 * function to handle the dialog of the action
 * of inspecting the MAGNIFICIANT pieces of rebar sticking out
 */
export async function inspectTheBeautifulPieceOfRebarStickingOut(): Promise<void> {
  await printToTerminal(
    "You take shelter behind a shelf of rock halfway up.",
    "action",
  );
  await printToTerminal(
    "Hammered into the rock: a ring of old rebar stakes, and a decayed " +
    "rope still strung between the two of them.",
    "log",
  );
  await printToTerminal(
    "Crew anchors. Somebody climbed this ridge regularly, roped in, " +
    "on this exact path. The rope was never taken down.",
    "system",
  );
}
