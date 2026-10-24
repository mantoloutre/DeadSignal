import { currentState, hasFlag, saveTheDataToLocalStorage } from "./gameState.js";
import { printToTerminal } from "./main.js";
export const FREQUENCY_REGISTRY = {
    QG_FREQUENCY: {
        frequency: 112.400,
        requiredFlag: ["READ_MANUAL"]
    },
    PROMETHEUS_BEACON: {
        frequency: 940.700,
        requiredFlag: ["READ_KELLER_MESSAGE"]
    },
    RELAY_A01_SYNC: {
        frequency: 104.525,
        requiredFlag: ["ALPHA_DOOR_UNLOCKED"]
    },
    CREW_BLACKBOX: {
        frequency: 148.500,
        requiredFlag: ["RELAY_A01_ONLINE"]
    },
    MIL_OVERRIDE: {
        frequency: 225.075,
        requiredFlag: ["RELAY_B02_ONLINE"]
    },
    KILL_SWITCH_PULSE: {
        frequency: 111.111,
        requiredFlag: ["SEARCHED_KELLER_BODY", "READ_PROMETHEUSE_LOGS"]
    },
    UVBdash76: {
        frequency: 142.800,
        requiredFlag: []
    },
};
export function addDiscoveredFrequency(frequency) {
}
//TODO make this using the currentState
let currentBuffer = "";
/*
safely set the buffer ( only at the begining at the game or on page reload )
 */
export function setBuffer(theBuffer) {
    if (currentBuffer.length === 0) {
        currentBuffer = theBuffer.toString();
    }
}
export function getFormattedBuffer() {
    if (currentBuffer.length === 0) {
        return "---.---";
    }
    if (currentBuffer.length <= 3) {
        return currentBuffer;
    }
    currentBuffer = currentBuffer.replace(".", "");
    return `${currentBuffer.slice(0, 3)}.${currentBuffer.slice(3)}`;
}
export function appendDigitToFrequency(char) {
    const digitString = char.toString();
    if (digitString < "0" || digitString > "9") {
        return getFormattedBuffer();
    }
    if (currentBuffer.length >= 6) {
        return getFormattedBuffer();
    }
    currentBuffer += digitString;
    return getFormattedBuffer();
}
/*
remove one from the buffer
 */
export function removeOneFromBuffer() {
    if (currentBuffer.length > 0) {
        currentBuffer = currentBuffer.slice(0, -1);
    }
    return getFormattedBuffer();
}
/*
add a message from qg to the queue and inform the player there is pending message
 */
export async function queueQGMessage(message) {
    currentState.pendingQGMessages.push(message);
    saveTheDataToLocalStorage();
    await printToTerminal(`incoming transmission from qg ( 112.400 MHz ). 
    ${currentState.pendingQGMessages.length} pending`, "alert");
}
/*
handle the reading of pending messages from the QG
 */
export async function handleQGFrequency() {
    // if no message from QG
    if (currentState.pendingQGMessages.length === 0) {
        await printToTerminal("Dispatch carrier active. Standing by for " +
            "telemetry verification", "log");
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
    for (const msg of currentState.pendingQGMessages) {
        await printToTerminal(`${msg}`, "QG");
    }
    currentState.pendingQGMessages = [];
    saveTheDataToLocalStorage();
}
export function isFrequencyUnlocked(reqFlags) {
    return reqFlags.every((flag) => hasFlag(flag));
}
export async function handleFrequencyTune() {
    switch (getFormattedBuffer()) {
        case "112.400":
    }
}
