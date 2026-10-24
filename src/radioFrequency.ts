import {currentState, hasFlag, saveTheDataToLocalStorage, StoryFlag} from "./gameState.js";
import {printToTerminal} from "./main.js";
import {RadioFrequencyName} from "./types.js";

export interface RadioFrequency {
    frequency: string;
    requiredFlag: StoryFlag[];
}

export const FREQUENCY_REGISTRY = {
    QG_FREQUENCY: {
        frequency: "112.400",
        requiredFlag: ["READ_MANUAL"]
    },
    PROMETHEUS_BEACON: {
        frequency: "940.700",
        requiredFlag: ["READ_KELLER_MESSAGE"]
    },
    RELAY_A01_SYNC: {
        frequency: "104.525",
        requiredFlag: ["ALPHA_DOOR_UNLOCKED"]
    },
    CREW_BLACKBOX: {
        frequency: "148.500",
        requiredFlag: ["RELAY_A01_ONLINE"]
    },
    MIL_OVERRIDE: {
        frequency: "225.075",
        requiredFlag: ["RELAY_B02_ONLINE"]
    },
    KILL_SWITCH_PULSE: {
        frequency: "111.111",
        requiredFlag: ["SEARCHED_KELLER_BODY", "READ_PROMETHEUSE_LOGS"]

    },

} satisfies Record<RadioFrequencyName, RadioFrequency>

export function addDiscoveredFrequency(frequency: number): void {

}

//TODO make this using the currentState
let currentBuffer: string = "";

/*
safely set the buffer ( only at the begining at the game or on page reload )
 */
export function setBuffer(theBuffer: string): void {
    if(!theBuffer || theBuffer === "---.---"){
        currentBuffer = "";
        return;
    }
    currentBuffer = theBuffer.replace(/[^0-9]/g, "").slice(0, 6);
}

export function getFormattedBuffer(): string {
    if (currentBuffer.length === 0) {
        return "---.---";
    }
    if (currentBuffer.length <= 3) {
        return currentBuffer;
    }
    currentBuffer = currentBuffer.replace(".", "");
    return `${currentBuffer.slice(0, 3)}.${currentBuffer.slice(3)}`;
}

export function appendDigitToFrequency(char: string): string {
    if (char < "0" || char > "9") {
        return getFormattedBuffer();
    }
    if (currentBuffer.length >= 6) {
        return getFormattedBuffer();
    }
    currentBuffer += char;
    return getFormattedBuffer();
}

/*
remove one from the buffer
 */
export function removeOneFromBuffer(): string {
    if (currentBuffer.length > 0) {
        currentBuffer = currentBuffer.slice(0, -1);
    }
    return getFormattedBuffer();
}

/*
add a message from qg to the queue and inform the player there is pending message
 */
export async function queueQGMessage(message: string): Promise<void> {
    currentState.pendingQGMessages.push(message);
    saveTheDataToLocalStorage();
    await printToTerminal(`incoming transmission from qg ( 112.400 MHz ). 
    ${currentState.pendingQGMessages.length} pending`, "alert");
}

/*
handle the reading of pending messages from the QG
 */
export async function handleQGFrequency(): Promise<void> {
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

export function isFrequencyUnlocked(reqFlags: StoryFlag[]): boolean {
    return reqFlags.every((flag: StoryFlag): boolean => hasFlag(flag));
}

export async function handleFrequencyTune(): Promise<void> {
    const formattedFreq: string = getFormattedBuffer();
    const entry = Object.values(FREQUENCY_REGISTRY).find(
        (reg) => reg.frequency === formattedFreq
    );

    //if frequency no exist then nothing
    if (!entry){
        await printToTerminal("Heavy carrier distortion. Signal unreadable.", "alert"); //TODO remove?
        return;
    }
    if (!isFrequencyUnlocked(entry.requiredFlag)){
        await printToTerminal("Heavy carrier distortion. Signal unreadable.", "alert");
        return;
    }
    // if everything is good
    switch (formattedFreq) {
        case "112.400":
            await handleQGFrequency();
            break;
    }
}