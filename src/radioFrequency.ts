export interface RadioFrequency {
    frequency: number;
    id: string;
    requiredChapter: string;
    requiredItem: string;
    lockedText: string;
    successText: string[];
}
//TODO make this using the currentState
let currentBuffer: string = "";

export function appendDigitToFrequency(char: string): string {
    if (char === "." && currentBuffer.includes(".")) {
        return currentBuffer; //TODO maybe do something else?
    }
    if (currentBuffer.length >= 5){ // its maximum (cuz i said so) like 88.6 Mhz so no more than 4 digit
        return currentBuffer; //TODO maybe again do something else?
    }
    currentBuffer += char;
    return currentBuffer;
}

export function clearBuffer(): string {
    currentBuffer = "";
    return currentBuffer;
}

export function getCurrentBuffer(): string {
    return currentBuffer
}

export function removeOneFromBuffer(): string {
    currentBuffer = currentBuffer.slice(0, -1);
    return currentBuffer;
}