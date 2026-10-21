export interface RadioFrequency {
    frequency: number;
    id: string;
    requiredChapter: string;
    requiredItem: string;
    lockedText: string;
    successText: string[];
}

let currentBuffer: string = "";

export function appendDigitToFrequency(char: string): string {
    if (char === "." && currentBuffer.includes(".")) {
        return currentBuffer; //TODO maybe do something else?
    }
    if (currentBuffer.length >= 5){ // usually its maximum like 102.6 Mhz so no more than 6 digit
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