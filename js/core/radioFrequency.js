import { QG_MESSAGES } from "../data/qgMessages.js";
import { getEl, printToTerminal } from "../ui/dom.js";
import { handleResonatorActions } from "./actions/resonatorActions.js";
import { gameBridge } from "./gameBridge.js";
import { currentState, hasFlag, saveTheDataToLocalStorage, setFocus, } from "./gameState.js";
import { ZONES } from "./world.js";
/**
 * the registry containing all the frequencies
 */
export const FREQUENCY_REGISTRY = {
    QG_FREQUENCY: {
        frequency: "112.400",
    },
    THE_RESONATOR: {
        frequency: "940.700",
    },
    RELAY_A01_SYNC: {
        frequency: "104.525",
    },
    CREW_BLACKBOX: {
        frequency: "148.500",
    },
    MIL_OVERRIDE: {
        frequency: "225.075",
    },
    KILL_SWITCH_PULSE: {
        frequency: "111.111",
    },
    RADIO_RECEIVE_ONLY: {
        frequency: "000.000",
    },
};
/**
 * the registry containing all the name of the frequency
 *
 */
const FREQUENCY_TO_NAME = new Map(Object.entries(FREQUENCY_REGISTRY).map(([radioName, radioNumber]) => [
    radioNumber.frequency,
    radioName,
]));
/**
 * function to transform the frequency in a number and
 * get the name linked to it if applicable
 * @param frequency the frequency (number format)
 * that you want to get the name of
 */
function resolveTheNameOfTheFrequency(frequency) {
    return FREQUENCY_TO_NAME.get(frequency) ?? null;
}
let currentBuffer = "";
/**
 * adding a frequency and making sure it's not already in the list of known signal
 * @param frequency the name of the frequency we want to add
 */
export async function addDiscoveredFrequency(frequency) {
    if (!currentState.discoveredSignals.includes(FREQUENCY_REGISTRY[frequency].frequency)) {
        currentState.discoveredSignals.push(FREQUENCY_REGISTRY[frequency].frequency);
        addFrequencyToHelperInterface(frequency);
        await printToTerminal("new frequency discovered!", "system");
    }
}
/**
 * add a frequency to the helper interface
 * @param frequencyName the name of the frequency to add
 */
function addFrequencyToHelperInterface(frequencyName) {
    const helperList = getEl("radio-interface-help-list");
    const line = document.createElement("li");
    if (hasDiscoveredSignal(FREQUENCY_REGISTRY[frequencyName].frequency)) {
        line.textContent = `${FREQUENCY_REGISTRY[frequencyName].frequency} : ${frequencyName}`;
        helperList.append(line);
    }
}
/**
 * function to load all the frequencies into the helper interface. <br>
 *
 * first, it removes every frequency in the list, then add them
 */
export async function loadAllFrequency() {
    const helperList = getEl("radio-interface-help-list");
    helperList.innerHTML = "";
    let freqName = null; //I think that's the first time that I use an any type... I hate this
    currentState.discoveredSignals.forEach((freq) => {
        freqName = resolveTheNameOfTheFrequency(freq);
        if (freqName !== null) {
            addFrequencyToHelperInterface(freqName);
        }
    });
}
/*
safely set the buffer ( only at the beginning at the game or on page reload )
 */
export function setBuffer(theBuffer) {
    if (!theBuffer || theBuffer === "---.---") {
        currentBuffer = "";
        return;
    }
    currentBuffer = theBuffer.replace(/[^0-9]/g, "").slice(0, 6);
}
/**
 * function to get the formatted buffer
 * @returns returns the formatted buffer
 */
export function getFormattedBuffer() {
    if (currentBuffer.length === 0) {
        return "---.---";
    }
    if (currentBuffer.length <= 3) {
        return currentBuffer;
    }
    currentBuffer = currentBuffer.replace(/[^0-9]/g, "");
    return `${currentBuffer.slice(0, 3)}.${currentBuffer.slice(3)}`;
}
export function appendDigitToFrequency(char) {
    if (char < "0" || char > "9") {
        return getFormattedBuffer();
    }
    if (currentBuffer.length >= 6) {
        return getFormattedBuffer();
    }
    currentBuffer += char;
    return getFormattedBuffer();
}
/**
 remove one from the buffer
 */
export function removeOneFromBuffer() {
    if (currentBuffer.length > 0) {
        currentBuffer = currentBuffer.slice(0, -1);
    }
    return getFormattedBuffer();
}
/**
 add a message from qg to the queue and inform the player there is pending message
 */
export async function queueQGMessage(message) {
    currentState.pendingQGMessages.push(message);
    saveTheDataToLocalStorage();
    if (!hasDiscoveredSignal("112.400")) {
        await printToTerminal(`Incoming transmission from QG, please read
        the manual to set the correct frequency`, "alert");
        return;
    }
    if (currentState.currentFrequency === "112.400") {
        await handleQGFrequency();
    }
    else {
        await printToTerminal(`Incoming transmission from QG ( 112.400 MHz ).
    ${currentState.pendingQGMessages.length} pending`, "alert");
    }
}
/**
 handle the reading of pending messages from the QG
 */
export async function handleQGFrequency() {
    // if no message from QG
    if (currentState.pendingQGMessages.length === 0) {
        await printToTerminal("Dispatch carrier active. Standing by for " + "telemetry verification", "log");
        return;
    }
    // if there is more than 1 pending messages
    if (currentState.pendingQGMessages.length > 1) {
        await printToTerminal("Technician, multiple dispatches were left " +
            "unacknowledged. Maintain radio discipline and be more " +
            "responsive", "QG");
        await printToTerminal("Here are all the dispatches.", "QG");
    }
    // reading all messages
    for (const msgKey of currentState.pendingQGMessages) {
        const text = QG_MESSAGES[msgKey];
        await printToTerminal(text, "QG");
    }
    currentState.pendingQGMessages = [];
    saveTheDataToLocalStorage();
}
/**
 * verifying if the player has the frequency
 * @param frequency the frequency we want to know if the player have it
 */
export function hasDiscoveredSignal(frequency) {
    return currentState.discoveredSignals.includes(frequency);
}
export async function handleFrequency() {
    const formattedFreq = getFormattedBuffer();
    if (currentBuffer.length === 0) {
        await printToTerminal("this message is a test to say there is no set signal in the currentState. " +
            "this message will be removed in future stage of the game", "alert");
        return;
    }
    //making sure he has it
    // ( don't care if it doesn't exist cuz the switch case is going to take care of that )
    if (!hasDiscoveredSignal(formattedFreq)) {
        //TODO make it so if unknown well its a static noice?
        await printToTerminal("Heavy carrier distortion. Signal unreadable.", "alert");
        return;
    }
    // if everything is good
    switch (formattedFreq) {
        case FREQUENCY_REGISTRY.QG_FREQUENCY.frequency:
            await handleQGFrequency();
            break;
        case "666.666":
            await printToTerminal("why are you trying to reach satan???", "alert");
            await printToTerminal("Satan does not want to be disturbed," +
                " leave him alone or consequence will apply", "alert");
            break;
        case FREQUENCY_REGISTRY.THE_RESONATOR.frequency:
            await handleResonatorFrequency();
            break;
        case FREQUENCY_REGISTRY.RADIO_RECEIVE_ONLY.frequency:
            await printToTerminal("Your radio does not emit any frequency anymore," +
                " you can still receive incoming transmission", "system");
            break;
    }
}
/**
 * function that handles the Resonator's frequency
 */
async function handleResonatorFrequency() {
    if (currentState.currentZone === "WATCH_POST" &&
        !hasFlag("HAD_FIRST_ENCOUNTER")) {
        await handleResonatorEncounter();
    }
    else if (currentState.currentZone === "WATCH_POST" &&
        hasFlag("HAD_FIRST_ENCOUNTER")) {
        //TODO he dies, cmon man dont activate it a second time if first time you almost died
    }
    else {
        //TODO if the player activate the frequency but isnt in the watchpost?
    }
}
/**
 * function that handle the encounter with the Resonator
 */
export async function handleResonatorEncounter() {
    const theZone = currentState.currentZone;
    switch (theZone) {
        case "WATCH_POST":
            if (!hasFlag("HAD_FIRST_ENCOUNTER")) {
                setFocus("FIRST_ENCOUNTER");
                gameBridge.renderZoneActions("WATCH_POST");
                await handleResonatorActions("WATCH_POST");
                await getDialogWatchPostInsideFirstEncounter();
            }
            else {
                //TODO do if its not the first encounter
                await printToTerminal("Sorry, not implemented yet", "alert"); //TODO remove when done
            }
            break;
        case "WATCH_POST_OUTSIDE":
            /* TODO do the actions if player is outside
            if (!hasFlag("HAD_FIRST_ENCOUNTER")){
              setFocus("FIRST_ENCOUNTER");
              gameBridge.renderZoneActions("WATCH_POST_OUTSIDE");
              await handleResonatorActions("WATCH_POST_OUTSIDE");
            } else {
            //TODO
            }
            */
            await printToTerminal("Sorry, not implemented yet", "alert"); //TODO remove when done
            break;
        default:
            await printToTerminal("not implemented yet (error btw its default case of the switch)", "alert"); //TODO remove when done
            /*
              choose if you want to implement a first death for every zone or not? TODO decide this
               */
            break;
    }
}
async function getDialogWatchPostInsideFirstEncounter() {
    await printToTerminal("You tune your radio to 940.700 MHz. For a moment, pure silence. " +
        "Better than static, you think. Because at least it mean your picking up the frequency", "action");
    await printToTerminal("Then, the silence start breathing. Slow, steady and you can somehow " +
        "feel it on your body.", "system");
    await printToTerminal("The temperature drops a bit, not enough to worry but enough to notice.", "system");
    await printToTerminal("Whatever is broadcasting this frequency... It can't be a station. " +
        "Somewhere, outside, something started walking toward the watchpost and " +
        "is getting close fast.", "alert");
    await printToTerminal("As more time passes, the more sound the frequency emits... " +
        "Your radio is starting to get really loud.", "system");
    await printToTerminal("You should do something...", "system");
    await printToTerminal("(Pick an action from the left panel or use the radio.)", "system");
}
