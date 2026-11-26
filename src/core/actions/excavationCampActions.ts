import { printToTerminal } from "../../ui/dom.ts";
/**
 * todo remove this
 */
export async function nuhUh(): Promise<void> {
  await printToTerminal("this was not implemented, sowy.", "system");
}
/**
 * function to handle going back to the watchpost
 */
export async function goBackToWatchpost(): Promise<void> {
  await printToTerminal(
    "You start walking toward the watch post and head back over the ridge.",
    "action",
  );
  await printToTerminal(
    "The summit, the breach in the fence. Down the windless side.",
    "system",
  );
  await printToTerminal(
    "You pass through the direction sign and the checkpoint " +
      "without even looking back",
    "system",
  );
  await printToTerminal(
    "The watch tower rises against the gray sky, and from up close " +
      "finally see what keller could see all this time...",
    "system",
  );
  await printToTerminal(
    "You hadn't paid attention to it but now you realise keller could see " +
      "the whole excavation camp.",
    "system",
  );
  await printToTerminal("He watched everything happen, everyday...", "system");
}
export async function inspectTheDrillRig(): Promise<void> {
  await printToTerminal(
    "You walk to the drill rig and look up. And up. The mast disappear " +
      "into the dark.",
    "action",
  );
  //aethel is the company the player work for
  //project prometheus is something noice
  await printToTerminal(
    "Stenciled on the base: PROJECT PROMETHEUS - GEOTHERMAL SURVEY " +
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
/**
 * function to handle the inspect crew truck action
 */
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
  //todo make it so the truck at the beginning the engine imploded instead
  //of explosing.
  await printToTerminal(
    "You look back at the direction of your own truck. You don't " +
      "say it out loud... You don't have to, to realise something....",
    "alert",
  );
}
/**
 * function to handle open crew truck door action
 */
export async function openTheTruckDoor(): Promise<void> {
  await printToTerminal("todo", "system");
  //todo make the blackbox appear
}
/**
 * function to handle the playing of the blackbox
 */
export async function playTheBlackBox(): Promise<void> {
  await printToTerminal(
    "You play the crew recorder back through its little speaker.",
    "system",
  );
  await printToTerminal(
    //TODO remove this maybe? or make a recording class
    "just for ur info, this is a recording, not printed logs",
    "YOU",
  );
  await printToTerminal(
    "DAY 41: Cavity breakthrough at 3.2 kilometers. Rig's fine, " +
      "but the depth gauge is drunk. Reads then meters more every " +
      "hour. Corporate says keep drilling.",
    "log",
  );
  await printToTerminal(
    "DAY 42: Ambient hum on 940.700 measured INSIDE the cavity. It's not " +
      "terrain noise. It repeats. Patterned. We told them. They want " +
      "amplifier arrays on every ridge to 'resolve the carrier.' They built us RELAYS.",
    "log",
  );
}
export async function inspectHalfRaisedMast(): Promise<void> {
  await printToTerminal(
    "You walk to the nearest mast. Its winch motor is still powered, " +
      "still seized mid-turn. The chain hangs slack at the exact angle " +
      "it took when somebody let go of the crank.",
    "action",
  );
  //todo finish this cuz it's not done
}
