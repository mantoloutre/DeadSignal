import { printToTerminal } from "../../ui/dom.ts";
import { gameBridge } from "../gameBridge.ts";
import { doesThePlayerHasTheItem } from "../inventory.ts";

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
    "From somewhere far below, a single deep pulse rolls through " +
    "the rock and into your boots. Then quiet.",
    "log",
  );
  await gameBridge.loadZone("SHATTERED_RIDGE_TOP");
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
/**
 * in short: admire the beautiful view. ( and touch the ground )
 */
export async function listenToWhatheverIsHappeningAtTheSummit(): Promise<void> {
  if (doesThePlayerHasTheItem("winter_gloves")) {
    await printToTerminal(
      "You take off one gloves and press your bare flat agaisnt the rock.",
      "action",
    );
  } else {
    await printToTerminal("why no glove my friend...", "alert");
    //todo make this even if the player prob will never see it...
  }
  await printToTerminal(
    "The rock is warm. Fifteen degrees warmer than the air. The warmth " +
    "pulses... Slow. Patient. Once every forty seconds.",
    "system",
  );
  await printToTerminal(
    "It's like something breathing under a very thick blanket.",
    "alert",
  );
  await printToTerminal(
    "You decide not to touch the rock bare-handed anymore...",
    "system",
  );
}

/**
 * function to handle the function of inspecting the fence
 * breach at the top of the ridge.
 */
export async function inspectFenceBreach(): Promise<void> {
  await printToTerminal(
    "You follow the perimeter fence where it climbs over the ridge.",
    "action",
  );
  await printToTerminal(
    "The fence segment excavation camp is torn outward. Not bent. " +
    "Torn, welds snapped, barbs pointing away from the site.",
    "log",
  );
  await printToTerminal("It looks oddly familiar...", "log");
  await printToTerminal(
    "It's the same failure as the robot's log. 'welds, broken under unknown " +
    "source of tension.' Something clearly left the site...",
    "system",
  );
  await printToTerminal(
    "Caught on the top barb: a scrap of orange tarp. crew colored. " +
    "It's not yours.",
    "log",
  );
}
