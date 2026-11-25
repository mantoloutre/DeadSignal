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
    "You look at the base and its written: " +
    "PROJECT PROMETHEUS - GEOTHERMAL SURVEY - AETHEL CORP. PROPRETY",
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
