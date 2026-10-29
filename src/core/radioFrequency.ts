import {
  currentState,
  hasFlag,
  saveTheDataToLocalStorage,
  StoryFlag,
} from "./gameState.js";
import { printToTerminal } from "../main.js";
import { RadioFrequencyName } from "../data/types.js";
import { QG_MESSAGES, QGMessageKey } from "../data/qgMessages.js";

export interface RadioFrequency {
  frequency: string;
}

export const FREQUENCY_REGISTRY = {
  QG_FREQUENCY: {
    frequency: "112.400",
  },
  PROMETHEUS_BEACON: {
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
} satisfies Record<RadioFrequencyName, RadioFrequency>;

/*
adding frequency and making sure it's not already there
 */
export function addDiscoveredFrequency(frequency: RadioFrequencyName): void {
  if (
    !currentState.discoveredSignals.includes(
      FREQUENCY_REGISTRY[frequency].frequency,
    )
  ) {
    currentState.discoveredSignals.push(
      FREQUENCY_REGISTRY[frequency].frequency,
    );
  }
}

let currentBuffer: string = "";

/*
safely set the buffer ( only at the beginning at the game or on page reload )
 */
export function setBuffer(theBuffer: string): void {
  if (!theBuffer || theBuffer === "---.---") {
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
  currentBuffer = currentBuffer.replace(/[^0-9]/g, "");
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
export async function queueQGMessage(message: QGMessageKey): Promise<void> {
  currentState.pendingQGMessages.push(message);
  saveTheDataToLocalStorage();
  if (!hasDiscoveredSignal("112.400")) {
    await printToTerminal(
      `Incoming transmission from QG, please read
        the manual to set the correct frequency`,
      "alert",
    );
    return;
  }
  if (currentState.currentFrequency === "112.400") {
    await handleQGFrequency();
  } else {
    await printToTerminal(
      `Incoming transmission from QG ( 112.400 MHz ).
    ${currentState.pendingQGMessages.length} pending`,
      "alert",
    );
  }
}

/*
handle the reading of pending messages from the QG
 */
export async function handleQGFrequency(): Promise<void> {
  // if no message from QG
  if (currentState.pendingQGMessages.length === 0) {
    await printToTerminal(
      "Dispatch carrier active. Standing by for " + "telemetry verification",
      "log",
    );
    return;
  }
  // if there is more than 1 pending messages
  if (currentState.pendingQGMessages.length > 1) {
    await printToTerminal(
      "Technician, multiple dispatches were left " +
        "unacknowledged. Maintain radio discipline and be more " +
        "responsive",
      "QG",
    );
    await printToTerminal("Here are all the dispatches.", "QG");
  }
  // reading all messages
  for (const msgKey of currentState.pendingQGMessages) {
    const text: string = QG_MESSAGES[msgKey];
    await printToTerminal(text, "QG");
  }
  currentState.pendingQGMessages = [];
  saveTheDataToLocalStorage();
}

/*
verifying that the player has discovered the frequency
 */
export function hasDiscoveredSignal(frequency: string): boolean {
  return currentState.discoveredSignals.includes(frequency);
}

export async function handleFrequency(): Promise<void> {
  const formattedFreq: string = getFormattedBuffer();
  if (currentBuffer.length === 0) {
    await printToTerminal(
      "this message is a test to say there is no set signal in the currentState. " +
        "this message will be removed in future stage of the game",
      "alert",
    );
    return;
  }
  //making sure he has it
  // ( don't care if it doesn't exist cuz the switch case is going to take care of that )
  if (!hasDiscoveredSignal(formattedFreq)) {
    //TODO make it so if unknown well its a static noice?
    await printToTerminal(
      "Heavy carrier distortion. Signal unreadable.",
      "alert",
    ); //TODO fix radio
    return;
  }
  // if everything is good
  switch (formattedFreq) {
    case "112.400":
      await handleQGFrequency();
      break;
    case "666.666":
      await printToTerminal("why are you trying to reach satan???", "alert");
      await printToTerminal(
        "Satan does not want to be disturbed," +
          " leave him alone or consequence will apply",
        "alert",
      );
      break;
  }
}
