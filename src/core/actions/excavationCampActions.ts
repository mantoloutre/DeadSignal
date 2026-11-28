import { printToTerminal } from "../../ui/dom.ts";
import { gameBridge } from "../gameBridge.ts";
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
    "action",
  );
  await printToTerminal(
    "You pass through the direction sign and the checkpoint " +
      "without even looking back",
    "action",
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
  await gameBridge.loadZone("WATCH_POST_OUTSIDE");
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
export async function inspectCrewTruck(): Promise<void> {
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
export async function lookTowardCrater(): Promise<void> {
  await printToTerminal(
    "Past the camp, the ground opens. The dig site is a crater " +
      "maybe 200 meters across, terraced down into blue-glowing ice",
    "system",
  );
  await printToTerminal(
    "At its center: a steel hatch, set into the crater floor. " +
      "An airlock. No building. No mast. Just the hatch, and the light " +
      "breathing under it.",
    "system",
  );
  await printToTerminal(
    "The blue glow doesn't flicker like fire. It swells and shrinks. " +
      "40 seconds. Like the rock on the summit. Like breathing.",
    "log",
  );
  await printToTerminal(
    "A fat copper umbilical runs from the crater rim along the ridge " +
      "wall, up the slope, into Relay B-02's cabinet. Power fed down from the " +
      "relay. Somebody built this deliberately.",
    "log",
  );
}
