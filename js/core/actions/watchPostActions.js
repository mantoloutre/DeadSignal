import { die, printDeathMessage, printToTerminal } from "../../ui/dom.js";
import { gameBridge } from "../gameBridge.js";
import { addFlag, hasFlag, setFocus } from "../gameState.js";
import { addItemToInventory, removeItemFromInventory } from "../inventory.js";
import { addDiscoveredFrequency, queueQGMessage } from "../radioFrequency.js";
/*
########################
ZONE : OUTSIDE WATCHPOST
########################
 */
// go back outside the watchpost
export async function walkBackOutside() {
    await printToTerminal("You walk back outside the watch tower", "action");
    await gameBridge.loadZone("WATCH_POST_OUTSIDE");
}
export async function goBackToCheckpoint() {
    await printToTerminal("You walk back toward the checkpoint.", "action");
    await gameBridge.loadZone("GATE_CHECKPOINT");
}
export async function goInsideTheWatchPost() {
    await printToTerminal("You go inside the watch post", "action");
    if (!hasFlag("DISCOVERED_KELLER_BODY")) {
        addFlag("DISCOVERED_KELLER_BODY");
        await printToTerminal("You find the light switch in the dark and turn the lights back on.", "action");
        await printToTerminal("Technician Vance Keller lies slumped on his side against the terminal's lower chassis" +
            ", his body frozen in a rigid and unnatural pose", "log");
        await printToTerminal("His chest is crushed clean through his sternum, yet " +
            "the exterior fabric shows no impact, claw marks or tool strikes.", "log");
        await printToTerminal("Keller's body is coated in a fine, brittle crust of frost, far too solid " +
            "for a man whose station went dark only an hour ago.", "log");
        await printToTerminal("The crystalline residue isn't from the draft; It radiates " +
            "directly outward from his blown ear canals and across the spiderweb " +
            //the player choices ( multiple choice
            "fracture of his visor", "log");
        await printToTerminal("You also see one other thing, a note he left, however, he didn't seem to have the time " +
            "to finish writing it", "system");
        await printToTerminal("everything is jammed, something is close... i feel it.. QG is not wh-", "note");
        //TODO do the rest
        setFocus("TELLING_QG");
        await gameBridge.loadZone("WATCH_POST");
        await printToTerminal("What do you do?", "system");
        await printToTerminal("Dead body: Tell the QG you found Keller's dead body", "system");
        await printToTerminal("Note left: Tell the QG about the note Keller wrote before dying", "system");
    }
    else {
        await gameBridge.loadZone("WATCH_POST");
    }
    //TODO make player choose what he want to do next
}
/*
#################
ZONE : WATCH_POST
#################
 */
export async function takeMemoryModule() {
    await printToTerminal("you take back the memory module from the console", "action");
    await addItemToInventory("robot_memory_module");
}
export async function turnOnTheMainConsole() {
    //TODO maybe do like it can directly broadcast 940.700 mhz ?
}
export async function listenRobotMemoryModule() {
    await printToTerminal("You insert the memory module in the console.", "action");
    removeItemFromInventory("robot_memory_module");
    await printToTerminal("You see some log showing up on the console screen", "system");
    await printToTerminal("12:44 - Operator Keller initiated manual lockout. Corporate dispatch order overridden", "log");
    await printToTerminal("12:51 - Carrier wave detected on 940.700 MHz. Audio mic logged acoustic vibration on the shack's window", "log");
    await printToTerminal("12:58 - perimeter fence B-02 torn outward. welds broken under unknown source of tension", "log");
    await printToTerminal("13:00 - Camera feed lost to extreme EM interference. Interior temp dropped 14°C very fast", "log");
    await printToTerminal("13:01 - High pitch sound spike, seems like glass shattering. Unknown direction, no optical feed", "log");
    await printToTerminal("13:01 - Hit by unknown source, drive motor damaged, trying to return to designated post", "log");
    await printToTerminal("13:02 - CRITICAL - drive motors unresponsive. Unit unable to return to designated post", "log");
    await printToTerminal("13:03 - CRITICAL - Main module losing too much power. Attempting automated distress ping to 112.400 MHz...", "log");
    await printToTerminal("13:03 - ping failed, transmission jammed by broadband EMI on 940.700 MHz.", "log");
    await printToTerminal("13:04 - Relay A-01 grid feed severed by manual unauthorized killswitch. Attempting reboot...", "log");
    await printToTerminal("13:04 - Attempt failed, access denied", "log");
    await printToTerminal("13:04 - Power failure. Unit going offline", "log");
    await addDiscoveredFrequency("THE_RESONATOR");
}
// search Keller's body
export async function searchKellerBody() {
    await printToTerminal("You search Keller's body...", "action");
    await printToTerminal("You find: his credentials, his access keycard, snow and a pen in his pocket", "system");
    addFlag("SEARCHED_KELLER_BODY");
}
export async function takeKellerCredential() {
    await printToTerminal("You take the credential from Keller's body", "action");
    await addItemToInventory("keller_credential");
}
export async function takeKellerKeyCard() {
    await printToTerminal("You take the access keycard from Keller's body", "action");
    await addItemToInventory("keller_keycard");
}
export async function takePenFromKeller() {
    await printToTerminal("You take Keller's favorite pen :c", "action");
}
//Tell QG for the dead body
export async function tellQGAboutDeadBody() {
    await printToTerminal("Found Keller. He's dead.", "YOU");
    await queueQGMessage("TOLD_DEAD_BODY");
    addFlag("TOLD_QG_ABOUT_BODY");
}
//Don't tell QG for the dead body
export async function tellQGNoBodyFound() {
    await printToTerminal("I'm in the main relay watch tower, Keller is nowhere to be found.", "YOU");
    await queueQGMessage("DIDNT_TOLD_DEAD_BODY");
}
//Tell QG for the note Keller left
export async function tellQGAboutNoteLeft() {
    await printToTerminal("From what i can see, Kelley left a note, apparently, there is something " +
        "dangerous that is drawn to the signal when it is running.", "YOU");
    addFlag("TOLD_QG_ABOUT_NOTE");
    await queueQGMessage("TOLD_ABOUT_NOTE");
}
//Don't mention the note
export async function DontTellQGAboutNoteLeft() {
    //nothing happens here it's just to satisfy the zone
}
//this function is now simply to link stuff
export async function confirmingDoneTalkingToQG() {
    setFocus(null);
    gameBridge.renderZoneActions("WATCH_POST");
}
/*
##################################
first encounter outside watch post
##################################
 */
export async function goInsideTheWatchPostFirstEncounter() {
    //todo
    await printToTerminal("You run inside the watchpost, and you forgot the door wasn't there " +
        "as you tried to close it.", "system");
    await printToTerminal("The pressure in your ears spikes a lot that you " +
        "almost drop to your knees.", "system");
    await printToTerminal("Your holding your screeching radio. Whatever is doing this is tied to it somehow..", "system");
    await printToTerminal("You managed to buy yourself a few second, but you need to do something about the radio...", "alert");
    //TODO make it so the player has to input a frequency.
}
export async function hideInSnowOutsideWatchpostFirstEncounter() {
    await printToTerminal("You jump into a snowbank and hide in the snow.", "action");
    await printToTerminal("Muffled, half-smothered, you wait. The pressure keeps climbing, less fast however.", "system");
    await printToTerminal("it's not enough. it knows you heard it. hearing it IS receiving it.", "alert");
    await die();
    await printDeathMessage("You hold your breath. You count. On the 30s count, the snow above you " +
        "start to vibrate.");
    await printDeathMessage("then it stops vibrating, and starts humming, at a pitch you feel in " +
        "your bones more than your ears.");
    await printDeathMessage("Warm blood fills both your ear's canals. You never hear the part that kills you.");
    await printDeathMessage("Frost bleeds outward across your visor as the snow around you turns red " +
        "and your vision fades to black.");
}
export async function makeRunForItOutsideWatchpostFirstEncounter() {
    //todo
    await printToTerminal("You take your legs to your neck and bolt toward the checkpoint, " +
        "not even looking back once.", "system");
    await printToTerminal("The pressure is like a fist squeezing your skull right now, but you " +
        "keep running because who knows what will happen if you stop...", "system");
    await printToTerminal("You pass the checkpoint... Then the intersection... the truck is " +
        "now in sight", "system");
    await printToTerminal("'Wait!' You realise something... why run toward the truck, like.... " +
        "Do you think the truck is going start? A piston blew up..", "system");
    await printToTerminal("Still, you continue running toward it. Hoping for a miracle...", "system");
    await die();
    await printDeathMessage("Barely twenty meters from the truck, the snow in front of you rises.");
    await printDeathMessage("You run around it, the truck being your only objective.");
    await printDeathMessage("A shape unfolds out of the drift, tall, wrong, faceless.");
    await printDeathMessage("The last thing you perceive is not light, not sound, just a certainty " +
        "pressed into your skull:");
    await printDeathMessage("'Found you.'");
    await printDeathMessage("You feel a sharp pain in your skull as Frost bleeds outward across " +
        "your visor and as the treeline fades to black.");
}
export async function firstEncounterHideUnderDoorOutsideWatchpost() {
    //todo finish this
    await printToTerminal("You quickly hide under the door in the snow as IT is getting closer.", "system");
    await printToTerminal("For a moment, you hear nothing.", "system");
    await printToTerminal("Silence, Total, absolute silence. the kind that weight a ton.", "system");
    await printToTerminal("Then you hear it walking. Slow, unhurried steps in " +
        "the snow, circling the door you're under.", "system");
    await printToTerminal("It stops beside you. You can hear it breathing, if you can even call that breathing...", "alert");
    await die();
    await printDeathMessage("A long, probing pressure pushes down on the door.");
    await printDeathMessage("';not under there.' The thought isn't yours." +
        "'not under there. not under there. NOT UNDER THERE.'");
    await printDeathMessage("The door lifts like a leaf. What happens next happens too fast to feel.");
    await printDeathMessage("Frost bleeds outward across your visor as everything fades to black.");
}
