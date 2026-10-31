import { printToTerminal } from "../../ui/dom.js";
import { gameBridge } from "../gameBridge.js";
import { addFlag, hasFlag, setFocus } from "../gameState.js";
import { addItemToInventory } from "../inventory.js";
import { queueQGMessage } from "../radioFrequency.js";
/*
########################
ZONE : OUTSIDE WATCHPOST
########################
 */

// go back outside the watchpost
export async function walkBackOutside(): Promise<void> {
  await printToTerminal("You walk back outside the watch tower", "action");
  await gameBridge.loadZone("WATCH_POST_OUTSIDE");
}

export async function goInsideTheWatchPost(): Promise<void> {
  await printToTerminal("You go inside the watch post", "action");
  await gameBridge.loadZone("WATCH_POST");
  if (!hasFlag("DISCOVERED_KELLER_BODY")) {
    addFlag("DISCOVERED_KELLER_BODY");
    await printToTerminal(
      "You find the light switch in the dark and turn the lights back on.",
      "action",
    );
    await printToTerminal(
      "Technician Vance Keller lies slumped on his side against the lower chassis" +
        ", his body frozen in a rigid and unnatural pose",
      "log",
    );

    await printToTerminal(
      "His chest is crushed clean through his sternum, yet " +
        "the exterior fabric shows no impact, claw marks or tool strikes.",
      "log",
    );
    await printToTerminal(
      "Keller's body is coated in a fine, brittle crust of frost, far too solid " +
        "for a man whose station went dark only an hour ago.",
      "log",
    );
    await printToTerminal(
      "The crystalline residue isn't from the draft; It radiates " +
        "directly outward from his blown ear canals and across the spiderweb " +
        //the player choices ( multiple choice
        "fracture of his visor",
      "log",
    );
    await printToTerminal("What do you do?", "system");
    await printToTerminal(
      "Dead body: Tell the QG you found Keller's dead body",
      "system",
    );
    await printToTerminal(
      "Note left: Tell the QG about the note Keller wrote before dying",
      "system",
    );
    //TODO do the rest
    setFocus("TELLING_QG");
    gameBridge.renderZoneActions("WATCH_POST");
  }
  //TODO make player choose what he want to do next
}
/*
#################
ZONE : WATCH_POST
#################
 */
export async function listenRobotMemoryModule(): Promise<void> {
  await printToTerminal(
    "You insert the memory module in the console.",
    "action",
  );
  await printToTerminal(
    "You see some log showing up on the console screen",
    "system",
  );
  await printToTerminal(
    "12:44 - Operator Keller initiated manual lockout. Corporate dispatch order overridden",
    "log",
  );
  await printToTerminal(
    "12:51 - Carrier wave detected on 094.700 MHz. Audio mic logged acoustic vibration on the shack's window",
    "log",
  );
  await printToTerminal(
    "12:58 - perimeter fence B-02 torn outward. welds broken under unknown source of tension",
    "log",
  );
  await printToTerminal(
    "13:00 - Camera feed lost to extreme EM interference. Interior temp dropped 14°C very fast",
    "log",
  );
  await printToTerminal(
    "13:01 - High pitch sound spike, seems like glass shattering. Unknown direction, no optical feed",
    "log",
  );
  await printToTerminal(
    "13:02 - CRITICAL - drive motors unresponsive. Unit unable to return to designated post",
    "log",
  );
  await printToTerminal(
    "13:03 - CRITICAL - Main module losing too much power. Attempting automated distress ping to 112.400 MHz...",
    "log",
  );
  await printToTerminal(
    "13:03 - ping failed, transmission jammed by carrier harmonic on 094.700 MHz.",
    "log",
  );
  await printToTerminal(
    "13:04 - Relay A-01 grid feed severed by manual unauthorized killswitch. Attempting reboot...",
    "log",
  );
  await printToTerminal("13:04 - Attempt failed, access denied", "log");
  await printToTerminal("13:04 - Power failure. Unit going offline", "log");
}
// search Keller's body
export async function searchKellerBody(): Promise<void> {
  await printToTerminal("You search Keller's body...", "action");
  await printToTerminal(
    "You find: his credentials, snow and a pen in his pocket",
    "system",
  );
  addFlag("SEARCHED_KELLER_BODY");
}
export async function takeKellerCredential(): Promise<void> {
  await printToTerminal("You take the credential from Keller's body", "action");
  await addItemToInventory("keller_credential");
}
export async function takeKellerKeyCard(): Promise<void> {
  await printToTerminal(
    "You take the access keycard from Keller's body",
    "action",
  );
  await addItemToInventory("keller_keycard");
}
export async function takePenFromKeller(): Promise<void> {
  await printToTerminal("You take Keller's favorite pen :c", "action");
}
//Tell QG for the dead body
export async function tellQGAboutDeadBody(): Promise<void> {
  await printToTerminal("Found Keller. He's dead.", "YOU"); //TODO do the color for YOU ( the player )
  //TODO add response from qg by adding to the queue
  await queueQGMessage("QG_MESSAGE_TOLD_DEAD_BODY");
  addFlag("TOLD_QG_ABOUT_BODY");
}

//Don't tell QG for the dead body
export async function tellQGNoBodyFound(): Promise<void> {
  //TODO add response from qg by adding to the queue & finish this
  await printToTerminal(
    "I'm in the main relay watch tower, Keller is nowhere to be found.",
    "YOU",
  );
  await queueQGMessage("QG_MESSAGE_DIDNT_TOLD_DEAD_BODY");
}

//Tell QG for the note Keller left
export async function tellQGAboutNoteLeft(): Promise<void> {
  //TODO add response from qg by adding to the queue & finish this
  await printToTerminal(
    "From what i can see, Kelley left a note, apparently, there is something " +
      "dangerous that is drawn to the signal when it is running",
    "YOU",
  );
  addFlag("TOLD_QG_ABOUT_NOTE");
  //TODO add the queued message from the qg
}

//Don't mention the note
export async function DontTellQGAboutNoteLeft(): Promise<void> {
  //nothing happens here it's just to satisfy the zone
}

export async function confirmingDoneTalkingToQG(): Promise<void> {
  setFocus(null);
}
