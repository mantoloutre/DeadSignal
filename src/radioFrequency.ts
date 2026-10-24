import {currentState, saveTheDataToLocalStorage, StoryFlag} from "./gameState.js";
import {printToTerminal} from "./main.js";

export interface RadioFrequency {
    frequency: number;
    id: string;
    text: string;
    requiredFlag: StoryFlag[];
}
export function addDiscoveredFrequency(frequency: number): void{

}
//TODO make this using the currentState
let currentBuffer: string = "";

/*
safely set the buffer ( only at the begining at the game or on page reload )
 */
export function setBuffer(theBuffer: number):void{
    if (currentBuffer.length === 0){
        currentBuffer = theBuffer.toString();
    }
}
export function formatBuffer(): string {
    if (currentBuffer.length === 0){
        return "---.---";
    }
    if (currentBuffer.length <= 3) {
        return currentBuffer;
    }
    currentBuffer = currentBuffer.replace(".", "");
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
/*
add a message from qg to the queue and inform the player there is pending message
 */
export async function queueQGMessage(message: string): Promise<void>{
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
    if (currentState.pendingQGMessages.length === 0){
        await printToTerminal("Dispatch carrier active. Standing by for " +
            "telemetry verification", "log");
        return;
    }
    // if there is more than 1 pending messages
    if (currentState.pendingQGMessages.length > 1){
        await printToTerminal("Technician, multiple dispatches were left " +
            "unacknowledged. Maintain radio discipline and be more " +
            "responsive", "QG");
        await printToTerminal("Here are all the dispatches.", "QG");
    }
    // reading all messages
    for (const msg of currentState.pendingQGMessages){
        await printToTerminal(`${msg}`, "QG");
    }
    currentState.pendingQGMessages = [];
    saveTheDataToLocalStorage();
}