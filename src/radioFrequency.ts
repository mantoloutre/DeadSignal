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
function formatBuffer(rawBuffer: string): string{
    if (rawBuffer.length <= 3){
        return rawBuffer;
    }
    return `${rawBuffer.slice(0,3)}.${rawBuffer.slice(3)}`;
}
export function appendDigitToFrequency(char: string): string {
    if (char < "0" || char > "9") {
        return formatBuffer(currentBuffer); //TODO maybe do something else?
    }
    if (currentBuffer.length >= 6){ // its maximum (cuz i said so) like 88.6 Mhz so no more than 4 digit
        return formatBuffer(currentBuffer); //TODO maybe again do something else?
    }
    currentBuffer += char;
    return formatBuffer(currentBuffer);
}
/*
clear the whole buffer
 */
export function clearBuffer(): string {
    currentBuffer = "";
    return currentBuffer;
}
/*
get the current buffer
 */
export function getCurrentBuffer(): string {
    return currentBuffer;
}
/*
remove one from the buffer
 */
export function removeOneFromBuffer(): string {
    currentBuffer = currentBuffer.slice(0, -1);
    return formatBuffer(currentBuffer);
}
/*
tune the radio ( save it to the current state //TODO [NYT]
 */
export function tuneRadio(): string {
    if (currentBuffer.substring(-2, -1) !== "."){
        console.log("test");
    }
    return "";
}