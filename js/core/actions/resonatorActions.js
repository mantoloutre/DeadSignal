import { die, flashButton, getEl, printDeathMessage, printToTerminal, } from "../../ui/dom.js";
import { closeRadioInterface, tuningEvent } from "../../ui/radioInterface.js"; //TODO watch out for possible circular reference
import { addFlag, currentState, hasFlag } from "../gameState.js";
import { FREQUENCY_REGISTRY, getFormattedBuffer } from "../radioFrequency.js";
export async function handleResonatorActions(zone) {
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
        switch (currentState.currentFrequency) {
            case FREQUENCY_REGISTRY.THE_RESONATOR.frequency:
                await choseToAngerResonatorIGuess();
                break;
            case FREQUENCY_REGISTRY.QG_FREQUENCY.frequency:
                await choseToContactTheQg();
                break;
            case FREQUENCY_REGISTRY.RADIO_RECEIVE_ONLY.frequency:
                await printToTerminal("You decide set your radio so you can only receive transmission and it" +
                    " doesn't emit anything anymore.", "action");
                addFlag("HAD_FIRST_ENCOUNTER");
                //TODO noice
                break;
            default:
                await printToTerminal(`You decide to set your radio to the 
        following frequency: ${currentState.currentFrequency}`, "action");
                await printToTerminal("whatever is happening" + "doesn't seem to be stopping...", "system");
            //TODO sadness
        }
    }
    else {
        flashButton(getEl("btn-tune"));
    }
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
/** todo link action
 *function to deal with the cover your ears option
 */
export async function coverYourEars() {
    //TODO add the text & action ?
    await printToTerminal("You decide to quickly go sit down in the corner and cover your ears.", "action");
    await die();
    await printDeathMessage("sorry i haven't done this part yet...");
    await printDeathMessage("In short your dead X-X");
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
