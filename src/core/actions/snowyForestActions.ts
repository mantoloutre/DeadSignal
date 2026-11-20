import { printToTerminal, die, printDeathMessage } from "../../ui/dom.js";
import { gameBridge } from "../gameBridge.js";
import { addFlag, setFocus } from "../gameState.js";
import { doesThePlayerHasTheItem } from "../inventory.ts";

/*
###################
ZONE : SNOWY FOREST
###################
 */

export async function goBackToTheTruck(): Promise<void> {
  await printToTerminal("You walk back to the truck", "action");
  await gameBridge.loadZone("OUTSIDE_TRUCK");
}

export async function inspectDirectionSign(): Promise<void> {
  await printToTerminal("You inspect the sign...", "action");
  await printToTerminal(
    "on the sign you see: left for frost basin and right to go to the gate checkpoint.",
    "system",
  );
  addFlag("INSPECTED_DIRECTION_SIGN");
}

export async function walkTowardCheckpoint(): Promise<void> {
  await printToTerminal("You walk toward the gate checkpoint.", "action");
  await gameBridge.loadZone("GATE_CHECKPOINT");
}
export async function walkTowardFrostBasin(): Promise<void> {
  await printToTerminal(
    "i'm warning you, stuff doesnt work 100% for now, if you are experiencing problem, its normal",
    "alert",
  );
  await printToTerminal(
    "You walk toward the frost basin, you see a big satellite " +
    "dish and not far from it the doors to a bunker.",
    "system",
  );
  await gameBridge.loadZone("RELAY_A01_OUTSIDE");
}
export function getOutOfBreakerFocus(): void {
  setFocus(null);
}

/*
############################
first encounter snowy forest
############################
 */

export async function firstEncounterHideBehindTree(): Promise<void> {
  //todo
  await printToTerminal(
    "You go flat behind the wides tree you can find and stop moving.",
    "action",
  );
  await printToTerminal(
    "The pressure keeps building, then everything goes silent.",
    "system",
  );
  await die();
  await printDeathMessage(
    "You watch the snow around the base of your tree starting to swirld upward, gently, like it's being poured.",
  );
  await printDeathMessage("The tree begins to hum. Bark cracks in long lines.");
  await printDeathMessage(
    "You back away. From the threeline ahead of you, twelve more trees begin to hum in the same key.",
  );
  await printDeathMessage(
    "You were never hiding, You were standing in the melodie.",
  );
}
export async function firstEncounterHideInSnow(): Promise<void> {
  //todo
}
