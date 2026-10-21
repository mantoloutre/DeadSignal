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