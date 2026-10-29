import { ZONES } from "./world.js";
import { QG_MESSAGES } from "../data/qgMessages.js";
export const GAME_INITIAL_STATE = {
    app: "DEAD_SIGNAL",
    version: 1,
    currentZone: "TRUCK_CABIN",
    powerLevel: 100,
    pendingQGMessages: [],
    currentFrequency: "---.---",
    discoveredSignals: [],
    storyFlags: [],
    playerInventory: [],
    inactiveCommands: [],
};
export let currentState = structuredClone(GAME_INITIAL_STATE);
export function addFlag(flag) {
    if (!currentState.storyFlags.includes(flag)) {
        currentState.storyFlags.push(flag);
    }
}
export function hasFlag(flag) {
    return currentState.storyFlags.includes(flag);
}
export function removeFlag(flag) {
    const index = currentState.storyFlags.indexOf(flag);
    if (index !== -1) {
        currentState.storyFlags.splice(index, 1);
    }
}
/*
function to export the game in json.<br>
detailed explanation:
-
1. update the player's inventory
2. convert the state in json with indentation
3. make a virtual file in the memory
4. simulate the click on a download link
5. clean memory
 */
export function exportSaveFile() {
    saveTheDataToLocalStorage();
    //step 1
    //TODO update player inventory
    //step 2
    const jsonString = JSON.stringify(currentState, null, 2);
    //step 3
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    //step 4
    const a = document.createElement("a");
    a.href = url;
    const stamp = new Date()
        .toISOString()
        .slice(0, 19)
        .replace(/[:T]/g, "-");
    a.download = `save_dead_signal_${stamp}.json`;
    document.body.append(a);
    a.click();
    //step 5
    a.remove();
    URL.revokeObjectURL(url);
}
/*
function to parse data into the currentState
 */
export function parseSaveData(json) {
    let textParsed;
    try {
        textParsed = JSON.parse(json);
    }
    catch {
        return null;
    }
    //step 5
    if (textParsed === null || typeof textParsed !== "object" ||
        Array.isArray(textParsed)) {
        return null;
    }
    const obj = textParsed;
    //step 6
    if (obj.app !== "DEAD_SIGNAL") {
        return null;
    }
    // step 7
    const maybeInvalidZone = (key) => {
        return typeof key === "string" && key in ZONES;
    };
    const maybeInvalidInventorySlot = (slot) => {
        if (slot === null || typeof slot !== "object")
            return false;
        if (!("itemId" in slot) || !("count" in slot))
            return false;
        const entry = slot;
        return (typeof entry.itemId === "string" && typeof entry.count === "number"
            && Number.isInteger(entry.count) && entry.count > 0);
    };
    const maybeInvalidInactiveCommand = (cmd) => {
        return typeof cmd === "string";
    };
    const maybeInvalidPendingQGMessages = (msg) => {
        return typeof msg === "string" && msg in QG_MESSAGES;
    };
    const validStoryFlags = Array.isArray(obj.storyFlags)
        ? (obj.storyFlags.filter((f) => typeof f === "string")) :
        [...GAME_INITIAL_STATE.storyFlags];
    const validCurrentZone = maybeInvalidZone(obj.currentZone)
        ? obj.currentZone : GAME_INITIAL_STATE.currentZone;
    const validPlayerInventory = Array.isArray(obj.playerInventory)
        ? obj.playerInventory.filter(maybeInvalidInventorySlot)
        : [...GAME_INITIAL_STATE.playerInventory];
    const validInactiveCommands = Array.isArray(obj.inactiveCommands)
        ? obj.inactiveCommands.filter(maybeInvalidInactiveCommand)
        : [...GAME_INITIAL_STATE.inactiveCommands];
    const validPendingQGMessages = Array.isArray(obj.pendingQGMessages)
        ? obj.pendingQGMessages.filter(maybeInvalidPendingQGMessages)
        : [...GAME_INITIAL_STATE.pendingQGMessages];
    // step 8
    return {
        ...GAME_INITIAL_STATE,
        currentZone: validCurrentZone,
        powerLevel: typeof obj.powerLevel === "number" && Number.isFinite(obj.powerLevel)
            ? Math.max(0, obj.powerLevel) :
            GAME_INITIAL_STATE.powerLevel,
        pendingQGMessages: validPendingQGMessages,
        currentFrequency: typeof obj.currentFrequency === "string"
            ? obj.currentFrequency :
            GAME_INITIAL_STATE.currentFrequency,
        discoveredSignals: Array.isArray(obj.discoveredSignals)
            ? obj.discoveredSignals.filter((s) => typeof s === "string")
            : [...GAME_INITIAL_STATE.discoveredSignals],
        storyFlags: validStoryFlags,
        playerInventory: validPlayerInventory,
        inactiveCommands: validInactiveCommands
    };
}
const LOCAL_STORAGE_KEY = "DEAD_SIGNAL_AUTOSAVE";
export function saveTheDataToLocalStorage() {
    try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(currentState));
    }
    catch {
        //ignored if full or private mode
    }
}
/*
function to load from the local storage <br>
detailed explanation
-
1. retrieve the item from local storage and put it in a const
2. if it doesn't exist note as failed
3. parse the data and catch if there is an error ( ex: private mode )
4. its corrupted, remove it from local storage
5. if everything went well, load it in and mark as success ( return true )
 */
export function loadFromTheLocalStorage() {
    // step 1
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    // step 2
    if (!raw)
        return false;
    // step 3
    const parsedData = parseSaveData(raw);
    if (!parsedData) {
        //corrupted or invalid ( step 4 )
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        return false;
    }
    //step 5
    currentState = parsedData;
    return true;
}
export function clearTheLocalStorage() {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
}
/*
TODO correct the documentation <br>
this function is to import the game from a json file, but in a more secure way <br>
detailed explanation:
-
1. create a hidden file input accepting only json and MIME type json
2. handle file selection and validate selection
3. read file contents as text
4. parsing json inside a try catch ( for safety )
5. verifying that parsed data is valid and non-null object
6. check application signature to confirm it belong to the game
7. preparing variable before the object
8. merge imported data with default state to prevent possible undefined variable
9. notify caller via success or error callback
10. trigger the file selection dialog
 */
export function importSaveFile(onSuccess, onError) {
    //step 1
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json,application/json";
    //step 2
    input.onchange = () => {
        const file = input.files?.[0];
        if (!file) {
            onError("no file selected");
            return;
        }
        //step 3
        const fileReader = new FileReader();
        fileReader.onload = () => {
            const parsedData = parseSaveData(fileReader.result);
            if (!parsedData) {
                onError("invalid save file format");
                return;
            }
            //step 4
            currentState = parsedData;
            //step 9
            onSuccess();
        };
        fileReader.onerror = () => {
            onError("error while trying to real the file on the disk");
        };
        fileReader.readAsText(file);
    };
    //step 10
    input.click();
}
export function resetGameState() {
    currentState = structuredClone(GAME_INITIAL_STATE);
}
/*
verify if the command is inactive or no
 */
export function isCommandInactive(command) {
    return currentState.inactiveCommands.includes(command);
}
