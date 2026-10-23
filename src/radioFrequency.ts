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

function formatBuffer(): string {
    if (currentBuffer.length === 0){
        return "---.---";
    }
    if (currentBuffer.length <= 3) {
        return currentBuffer;
    }
    return `${currentBuffer.slice(0,3)}.${currentBuffer.slice(3)}`;
}
export function appendDigitToFrequency(char: string | number): string {
    const digitString:string = char.toString();
    if (digitString < "0" || digitString > "9"){
        return formatBuffer();
    }
    if (currentBuffer.length >= 6){
        return formatBuffer();
    }
    currentBuffer += digitString;
    return formatBuffer();
}


/*
get the current buffer
 */
export function getFloatCurrentBuffer(): number {
    if (currentBuffer.length === 0){
        return 0;
    }
    if (currentBuffer.length <= 3){
        return parseInt(currentBuffer, 10);
    }
    return parseFloat(formatBuffer());
}

/*
remove one from the buffer
 */
export function removeOneFromBuffer(): string{
    if (currentBuffer.length > 0) {
        currentBuffer = currentBuffer.slice(0, -1);
    }
    return formatBuffer();
}
