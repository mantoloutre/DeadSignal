import { FREQUENCY_REGISTRY } from "../../data/frequencies.js";
import { die, flashButton, getEl, printDeathMessage, printToTerminal, } from "../../ui/dom.js";
import { closeRadioInterface, tuningEvent } from "../../ui/radioInterface.js";
import { gameBridge } from "../gameBridge.js";
import { addFlag, currentState, hasFlag, setFocus } from "../gameState.js";
import { getFormattedBuffer } from "../radioFrequency.js";
export async function handleResonatorActions(zone) {
    if (zone !== "WATCH_POST") {
        await printToTerminal("not done implementing it, if it doesnt work, " +
            "it mean i havent done that part yet.", "alert", 10);
    }
    const tuning = getEl("btn-tune");
    tuning.removeEventListener("click", tuningEvent);
    tuning.addEventListener("click", tuningInEncounter);
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
                await printToTerminal("zone not implemented yet, sorry :c", "alert");
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
            break;
        case FREQUENCY_REGISTRY.RADIO_RECEIVE_ONLY.frequency:
            //todo
            break;
        case FREQUENCY_REGISTRY.QG_FREQUENCY.frequency:
            //todo
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
            //todo
            break;
        case FREQUENCY_REGISTRY.QG_FREQUENCY.frequency:
            //todo
            break;
        case FREQUENCY_REGISTRY.RADIO_RECEIVE_ONLY.frequency:
            //todo
            break;
        default:
            await writeDefaultDefaultDeathMessage();
        //todo
    }
}
async function switchCaseGateCheckpointInsideShack() {
    switch (currentState.currentFrequency) {
        case FREQUENCY_REGISTRY.THE_RESONATOR.frequency:
            //todo
            break;
        case FREQUENCY_REGISTRY.QG_FREQUENCY.frequency:
            //todo
            break;
        case FREQUENCY_REGISTRY.RADIO_RECEIVE_ONLY.frequency:
            //todo
            break;
        default:
            await writeDefaultDefaultDeathMessage();
        //todo
    }
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
