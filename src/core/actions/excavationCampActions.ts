import { printToTerminal } from "../../ui/dom.ts";
/**
 * todo remove this
 */
export async function nuhUh(): Promise<void> {
  await printToTerminal("this was not implemented, sowy.", "system");
}
export async function inspectTheDrillRig(): Promise<void> {
  await printToTerminal(
    "You walk to the drill rig and look up. And up. The mast disapear " +
    "into the dark.",
    "action",
  );
  //aethel is the company the player work for
  //project prometheus is something noice
  await printToTerminal(
    "Stenciled on the base: PROJECT PROMETHEUS - GEOTHERMANL SURVEY " +
    " - AETHEL CORP. PROPRETY",
    "log",
  );
  await printToTerminal(
    "The drill bit at the bottom is polished smooth. Not worn, polished..." +
    "Like it spent months grinding against something softer than rock and " +
    "harder than dirt",
    "system",
  );
  await printToTerminal(
    "The ground within ten meters of the rig is bare. No snow. " +
    "In a valley of permanent winter, the earth around the drill " +
    "is warm enough to stay clear.",
    "alert", //todo change this for log maybe?
  );
}
export async function inspectTheCrewTruck(): Promise<void> {
  await printToTerminal(
    "The crew truck sits by the containers, doors open, cab full " +
    "of drifted snow.",
    "system",
  );
  await printToTerminal(
    "The engine block is imploded. Whole. No fire, no crash. The pistons " +
    "were pressed back down into the block, and the hood still carries " +
    "the dent of a fist the size of the engine.",
    "system",
  );
  //todo make it so the truck at the begining the engine imploded instead
  //of explosing.
  await printToTerminal(
    "You look back at the direction of your own truck. You don't " +
    "say it out loud... You don't have to, to realise something....",
    "alert",
  );
}
export async function openTheTruckDoor(): Promise<void> {
  await printToTerminal("todo", "system");
  //todo make the blackbox appear
}
