import { printToTerminal } from "../../ui/dom.ts";
/**
 * todo remove this
 */
export async function nuhUh(): Promise<void> {
  await printToTerminal("this was not implemented, sowy.", "system");
}
async function climbToSummitFromA01(): Promise<void> {
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
