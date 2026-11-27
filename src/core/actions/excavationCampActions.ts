import { printToTerminal } from "../../ui/dom.ts";
import { addDiscoveredFrequency } from "../radioFrequency.ts";
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
export async function inspectCrewTruckV2(): Promise<void> {
  await printToTerminal(
    "The crew truck sits nose-down in a drift, doors still open.",
    "system",
  );
  await printToTerminal(
    "Inside, the seats are armored with blankets and foam mats. " +
      "They stopped driving this truck and started living in it..",
    "system",
  );
  await printToTerminal(
    "Center console: a clipboard of work orders. The last page is " +
      "half-filled. Here is what is written on it:",
    "system",
  );
  await printToTerminal(
    "Day 41: Mast 3 anchor bolts set. Vasquez on a crane duty tomorrow. " +
      "Order came from dispatch: expedite energization. Told them the hum " +
      "changed when B-02 came on. Dispatch says hum reading are within " +
      "tolerance",
    "log",
  );
  await printToTerminal(
    "'Within tolerance.' Somebody at Aethel had a tolerance for this...",
    "alert",
  );
  await printToTerminal(
    "Strapped to the passenger seat: a flight-style blackbox recorder." +
      "Tag on it says: CREW CHANNEL - 148.500 MHZ - DOT NOT ERASE.",
    "system",
  );
  await addDiscoveredFrequency("CREW_BLACKBOX");
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
export async function playTheBlackBoxV2(): Promise<void> {
  await printToTerminal(
    "You play the crew recorder through it's little speaker.",
    "action",
  );
  await printToTerminal(
    "DAY 34: Contract Aethel: erect three array nodes around Site 1. " +
      "Relay feed, amplifier, resonator. Fancy names for three very tall " +
      "antennas pointing DOWN.",
    "recording",
  );
  await printToTerminal(
    "DAY 39: Node 2 energized tonight. Hum came up a fifth on the scale. " +
      "Instruments say nothing. The dogs would say plenty probably, but we " +
      "don't any dog up here anymore.",
    "recording",
  );
  await printToTerminal(
    "DAY 41: B-02 synced. Dispatch accelerated the schedule, " +
      "wants C-03 hot in six days. Vasquez stayed near the mast " +
      "during the power test. Incident report filled: " +
      "equipment failure. His chest was caved in like somebody " +
      "stepped on a transistor radio.",
    "recording",
  );
  await printToTerminal(
    "day 42: They're pulling us. Not because we asked, but because " +
      "we stopped asking... Foreman sealed the truck in a rush the best " +
      "he could. Every circuit above idle is crushed flat.",
    "recording",
  );
  await printToTerminal(
    "If you find this: The masts don't reach the sky. They feed the ground.",
    "recording",
  );
  await printToTerminal(
    "The recording clicks off. 148.500 stays in your head like a splinter. ",
    "system",
  );
}
export async function inspectHalfRaisedMast(): Promise<void> {
  await printToTerminal(
    "You walk to the nearest mast. Its winch motor is still powered, " +
      "still seized mid-turn. The chain hangs slack at the exact angle " +
      "it took when somebody let go of the crank.",
    "action",
  );
  await printToTerminal(
    "Painted on the base: RELAY C-03 - NODE 3 OF 3 - AETHEL COMMUNICATION " +
      " / PROMETHEUS ARRAY.",
    "log",
  );
  await printToTerminal(
    "Node 3 of 3, A-01 feeds from the basin, B-02 amplifies, up the " +
      "ridge slope. C-03 was meant to close the triangle around the dig site. " +
      "It never did...",
    "system",
  );
  await printToTerminal(
    "Wathever the masts were drawing toward each other, the shape of it " +
      "was never completed. You look at the crater glow beyond the camp and " +
      "you decide not to finish that thought...",
    "alert",
  );
  //todo finish this cuz it's not done
}
