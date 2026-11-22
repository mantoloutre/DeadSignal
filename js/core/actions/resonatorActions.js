import { FREQUENCY_REGISTRY } from "../../data/frequencies.js";
import { die, flashButton, getEl, printDeathMessage, printToTerminal, sleep, } from "../../ui/dom.js";
import { closeRadioInterface, tuningEvent } from "../../ui/radioInterface.js";
import { gameBridge } from "../gameBridge.js";
import { addFlag, currentState, hasFlag, setFocus } from "../gameState.js";
import { getFormattedBuffer } from "../radioFrequency.js";
export async function handleResonatorActions(zone) {
    if (zone !== "WATCH_POST") {
        await printToTerminal("not fully done implementing it, if it doesnt work, " +
            "it mean i havent done that part yet.", "alert", 10);
    }
    const tuning = getEl("btn-tune");
    tuning.removeEventListener("click", tuningEvent);
    tuning.addEventListener("click", tuningInEncounter);
    gameBridge.renderZoneActions(zone);
    if (hasFlag("HAD_FIRST_ENCOUNTER")) {
        tuning.removeEventListener("click", tuningInEncounter);
        tuning.addEventListener("click", tuningEvent);
    }
}
/**
 * function that handle then the player tune the radio during the first encounter
 */
async function tuningInEncounter() {
    const buffer = getFormattedBuffer();
    if (buffer.length === 7 && buffer !== "---.---") {
        currentState.currentFrequency = buffer;
        getEl("frequency").textContent = buffer;
        closeRadioInterface();
        switch (currentState.currentZone) {
            case "WATCH_POST":
                await switchCaseInsideWatchpost();
                break;
            case "WATCH_POST_OUTSIDE":
                await switchCaseOutsideWatchPost();
                break;
            case "GATE_CHECKPOINT":
                await switchCaseGateCheckpointOutsideShack();
                break;
            case "GATE_CHECKPOINT_SHACK":
                await switchCaseGateCheckpointInsideShack();
                break;
            default:
                await printToTerminal("zone not implemented yet, sorry :c (resonatorActions.ts line 57", "alert");
        }
    }
    else {
        flashButton(getEl("btn-tune"));
    }
}
async function choseToDoTheRightThing() {
    await printToTerminal("You decide set your radio so you can only receive transmission and it" +
        " doesn't emit anything anymore.", "action");
    await printToTerminal("As soon as you type in the frequency, the pressure that was building in your " +
        "ears starts dropping really fast until it's gone.", "system");
    await printToTerminal("You look back at Keller's body and you feel a chill run down your spine...", "system");
    setFocus(null);
    gameBridge.renderZoneActions("WATCH_POST");
}
/**
 * function to deal with contacting the QG in the first encounter with
 * the resonator
 */
async function choseToContactTheQg() {
    await printToTerminal("You type the frequency as fast as you can to try and contact the QG even " +
        "if you are not supposed to. You press transmit.", "action");
    await die();
    await printDeathMessage("You hear static, even with heavy distortion, you hear a firm voice." +
        "'Stay on this channel, we are on our way', it says.");
    await printDeathMessage("Then, the voice repeats it, same pause, same breath...");
    await printDeathMessage("The voice says: 'You did well, going this far'." +
        "Its really warm, friendly.. and its making your skin crawl.");
    await printDeathMessage("After a long pause it end up saying: 'Just relax, it will all be over soon.'.");
    await printDeathMessage("Your ears pop violently. Warm bloods fill both canals, " +
        "and the voice never stop comforting you, " +
        "not even as it takes you.");
    await printDeathMessage("Frost bleeds outward across your visor as the inside of the watchpost " +
        "fades to black.");
}
/**
 * function to handle if the player decide to re-enter 940.700MHz in the radio
 */
async function choseToAngerResonatorIGuess() {
    await printToTerminal("The Frequency was already tuned into this frequency, and you decide to " +
        "press the tune button again", "action");
    await die();
    await printDeathMessage("a deafening screech tears through the speaker of your radio instantly shattering the small screen.");
    await printDeathMessage("Your ears pop violently. Warm blood fills both canals before you can even pull your hands up.");
    await printDeathMessage("Then, the shockwave hammers your chest like a dropped weight. " +
        "Your sternum caves inward with a dull, wet snap. Just like Keller's");
    await printDeathMessage("Frost bleeds outward across your visor as the inside of the watchpost fades to black");
}
/**
 *function to deal with the cover your ears option
 */
export async function coverYourEars() {
    await printToTerminal("You decide to quickly go sit down in the corner and cover your ears.", "action");
    await die();
    await printDeathMessage("One blink, nothing happens, the second blink, you look toward the entrance.");
    await printDeathMessage("Another blink later, the door that was in the snow " +
        "comes flying toward you.");
    await printDeathMessage("You dont even have time to react that it splits your head from your body.");
}
/**
 * function to handle if the player want to go outside during the encounter
 */
export async function goOutside() {
    //await printToTerminal("You run outside into the snow, ");
    await printToTerminal("You run outside into the snow, hoping that being away from the watchpost " +
        "will calm whatever is happening right now.", "action");
    await die();
    await printDeathMessage("Something big was waiting right outside. You never saw its face, " +
        "only the shadow it cast on the ground");
    await printDeathMessage("You don't even get three steps outside before something grabs your head, making you unable to see anything.");
    await printDeathMessage("Still holding your head with inhuman strength, it screeches extremely loudly so close to you" +
        " that your eardrums pop in less than a second.");
    await printDeathMessage("You feel your insides freezing as you loose any sense of feeling.");
}
/**
 * the switch case for the tuning outside the watch post
 */
async function switchCaseInsideWatchpost() {
    switch (currentState.currentFrequency) {
        case FREQUENCY_REGISTRY.THE_RESONATOR.frequency:
            await choseToAngerResonatorIGuess();
            break;
        case FREQUENCY_REGISTRY.QG_FREQUENCY.frequency:
            await choseToContactTheQg();
            break;
        case FREQUENCY_REGISTRY.RADIO_RECEIVE_ONLY.frequency:
            await choseToDoTheRightThing();
            addFlag("HAD_FIRST_ENCOUNTER");
            break;
        default:
            await writeDefaultDefaultDeathMessage();
            await printToTerminal("Frost rapidly make it way inside the watch post toward you.", "alert", 30);
            await printToTerminal("You dont even have the time to react that it gets to you", "alert", 40);
            await die();
            await printDeathMessage("The frost rapidly cover your body, entering through every hole there is...");
            await printDeathMessage("As your temperature drops and you get frozen from the inside, everything fade to black.");
    }
}
async function switchCaseOutsideWatchPost() {
    switch (currentState.currentFrequency) {
        case FREQUENCY_REGISTRY.THE_RESONATOR.frequency:
            //todo
            await printToTerminal("Outside, you enter 940.700 back into the radio, as if answering it directly.", "action");
            await die();
            await printDeathMessage("The snow at your feet spreads apart in a perfect circle, like a mouth opening.");
            await printDeathMessage("The hum is coming from below you now. " +
                "Directly below you... It has been for a while.");
            await printDeathMessage("The ground exhales. You never touch the ground again.");
            break;
        case FREQUENCY_REGISTRY.RADIO_RECEIVE_ONLY.frequency:
            //todo
            await printToTerminal("You kill the transmit and set the radio to receive-only, kneeling into the snow.", "action");
            await printToTerminal("The pressure release in a rush. Your ears pop, once, twice.", "system");
            await printToTerminal("The hum stats fading Until it cannot be perceive anymore.", "system");
            await printToTerminal("You seem safe, for now...", "log");
            addFlag("HAD_FIRST_ENCOUNTER");
            setFocus(null);
            gameBridge.renderZoneActions("WATCH_POST_OUTSIDE");
            break;
        case FREQUENCY_REGISTRY.QG_FREQUENCY.frequency:
            await printToTerminal("You key the QG frequency in your radio.", "action");
            await printToTerminal("Your outside?", "QG");
            await sleep(1500);
            await printToTerminal("'You shouldn't be outside...'", "QG");
            await die();
            await printDeathMessage("It sounds so reasonable. So caring. 'Come back inside. I'll keep you safe.'");
            await printDeathMessage("You feel your leg start walking before your brain agrees to it.");
            await printDeathMessage("As soon as your inside, a wall of thick snow & ice start forming in the door");
            break;
        default:
            await writeDefaultDefaultDeathMessage();
            await die();
            await printDeathMessage("20 ice arms surge from the ground at once, immobilizing you in an instant.");
            await printDeathMessage("A big spike then surges from the ground and pierces your torso, " +
                "giving you a slow and painful death.");
    }
}
async function switchCaseGateCheckpointOutsideShack() {
    switch (currentState.currentFrequency) {
        case FREQUENCY_REGISTRY.THE_RESONATOR.frequency:
            await choseAnswerItOutsideShack();
            break;
        case FREQUENCY_REGISTRY.QG_FREQUENCY.frequency:
            await choseToContactTheQGOutsideShack();
            break;
        case FREQUENCY_REGISTRY.RADIO_RECEIVE_ONLY.frequency:
            await choseReceiveOnlyOutsideShack();
            break;
        default:
            await writeDefaultDefaultDeathMessage();
            await die();
            await printDeathMessage("The fence posts around the checkpoint begin to sing, all together " +
                "like a full chord of cold metal.");
            await printDeathMessage("You cover your ears and run, but the chord follows you. tightening, " +
                "until everything around you fades to black as you freeze.");
    }
}
async function switchCaseGateCheckpointInsideShack() {
    switch (currentState.currentFrequency) {
        case FREQUENCY_REGISTRY.THE_RESONATOR.frequency:
            await choseToAnswerItInsideShack();
            break;
        case FREQUENCY_REGISTRY.QG_FREQUENCY.frequency:
            await choseToContactQGInsideShack();
            break;
        case FREQUENCY_REGISTRY.RADIO_RECEIVE_ONLY.frequency:
            await choseReceiveOnlyInsideShack();
            break;
        default:
            await writeDefaultDefaultDeathMessage();
            await die();
            await printDeathMessage("Every loose screw in the shack starts vibrating at once.");
            await printDeathMessage("Your last breath hangs in the air, visible, and stays there " +
                "as everything fades to black.");
    }
}
async function choseToContactQGInsideShack() {
    await printToTerminal("You type in the QG frequency and call out, " +
        "begging for anyone listening to awnser.", "action");
    await printToTerminal("Someone answers before you even let go of the button.", "alert");
    await printToTerminal("Your safe now, you don't have to worry anymore..", "QG");
    await printToTerminal("Stay inside. Stay warm. I'll come to you.", "QG");
    await die();
    await printDeathMessage("The door of the shack doesn't open. It just stops being a door, " +
        "and the cold walks in like it owns the place.");
    await printDeathMessage("Everything around you fades to black, warm and wrong...");
}
/**
 * function to handle an action for the first encounter inside the shack.
 */
async function choseReceiveOnlyInsideShack() {
    await printToTerminal("You kill the transmitter on your radio and set it on receive-only.", "action");
    await printToTerminal("The pressure loosens its grip, draining out of your ears.", "system");
    await printToTerminal("outside, the humming slows... Then goes quiet.", "system");
    await printToTerminal("When you finally stand up, you notice something: " +
        "the robot's head on the floor is humming, softly, in the same key.", "alert");
    //TODO maybe make the player able to pickup the head?
}
/**
 * function to handle an action inside the shack during the first encounter
 */
async function choseToAnswerItInsideShack() {
    await printToTerminal("You input 940.700 a second time.", "action");
    await printToTerminal("On the guard's desk, the old desk radio clicks. You don't touch it.", "system");
    await printToTerminal("The dusty radio set itself slowly to 940.700 MHz. When you realise, its already set.", "alert");
    await printToTerminal("Both the desk radio and your personal radio start humming at each other." +
        "A conversation in a language made of frequency and pressure.", "system");
    await die();
    await printDeathMessage("Dust fall down from the ceiling. The walls of the shack begin to " +
        "buzz in the same key.");
    await printDeathMessage("Your teeth pickup the harmony without asking permission...");
    await printDeathMessage("The shack fold inward around you, and everything fades to black " +
        "as pain consume you...");
}
/**
 * reusable default text to not always re-write it
 */
async function writeDefaultDefaultDeathMessage() {
    await printToTerminal("You decide to set your radio to the following frequency: " +
        `${currentState.currentFrequency} MHz`, "action");
    await printToTerminal("whatever is happening doesn't seem to be stopping...", "system");
    await printToTerminal("You know it's there... IT also knows YOU are there...", "log");
    await printToTerminal("you were tracking it, IT is still tracking you.. and it found you", "alert", 30);
}
/**
 * function to handle action outside the shack
 */
async function choseAnswerItOutsideShack() {
    await printToTerminal("Standing in the open, right next to the guard shack, you punch back 940.700 in the radio." +
        "and hold it up like an answer.", "action");
    await printToTerminal("It answers. The static doesn't just come out of the speaker, ijt climbs out of it.", "alert");
    await die();
    await printDeathMessage("The pressure that was building in your ears all this time snaps " +
        "into focus, like an eye opening in each channel.");
    await printDeathMessage("You throw the radio into the snow. It keeps broadcasting. It doesn't need the speaker anymore.");
    await printDeathMessage("The snow around it starts humming, then the fence wire, then you.");
    await printDeathMessage("The last thing you feel is your own chest joining the chord as " +
        "everything fades to black.");
}
/**
 * function to handle action outside the shack
 */
async function choseReceiveOnlyOutsideShack() {
    await printToTerminal("You set the radio to receive-only and press yourself agaisnt the shack's wall.", "action");
    await printToTerminal("The pressure in your ears holds... then starts letting go. Little by little.", "system");
    await printToTerminal("the humming pulls back, away from the fence line.", "system");
    await printToTerminal("This could have gone very wrong...", "system");
    addFlag("HAD_FIRST_ENCOUNTER");
    gameBridge.renderZoneActions("GATE_CHECKPOINT");
}
/**
 * function to handle action outside the shack
 */
async function choseToContactTheQGOutsideShack() {
    await printToTerminal("You key in the QG frequency and call for help.", "action");
    await printToTerminal("How may we help?", "QG", 8);
    await printToTerminal("The answer comes instantly. It feels too fast for an operator to answer at this speed.", "system");
    await die();
    //todo make it so the then, warmer is a printToTerminal instead?
    await printDeathMessage("Then, warmer: 'You're doing so well. Walk to the tower. I'll guide you every step.'");
    await printDeathMessage("Your legs start moving before you finish disagreeing with them.");
    await printDeathMessage("You start feeling weird, something isn't right... and you're right...");
    await printDeathMessage("Frost bleeds outward across your visor as the gate checkpoint fades to black.");
}
