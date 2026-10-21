let currentBuffer = "";
export function appendDigitToFrequency(char) {
    currentBuffer += char;
    return currentBuffer;
}
export function clearBuffer() {
    currentBuffer = "";
    return currentBuffer;
}
export function getCurrentBuffer() {
    return currentBuffer;
}
export function removeOneFromBuffer() {
    currentBuffer = currentBuffer.slice(0, -1);
    return currentBuffer;
}
