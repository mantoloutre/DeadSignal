import {
    Chapter, Zone, ZoneId, ZONES
} from "./world.js"
import {InventorySlot} from "./inventory.js";

//base
export interface GameState {
    app: string;
    version: number;
    currentZone: ZoneId;
    powerLevel: number;
    currentFrequency: number;
    discoveredSignals: string[];
    storyFlags: StoryFlag[];
    playerInventory: InventorySlot[];
    inactiveCommands: string[];
}

export const StoryFlags = {
    //zone 1
    CHECKED_TRUCK_TRUNK: "CHECKED_TRUCK_TRUNK",
    TRUCK_REPAIRED: "TRUCl_REPAIRED",
    WALKED_TO_TOWER: "WALKED_TO_TOWER",
    OPENED_GLOVE_BOX: "OPENED_GLOVE_BOX",
    TOOK_FLARE_FROM_GLOVE_BOX: "TOOK_FLARE_FROM_GLOVE_BOX",
    TOOK_WINTER_GLOVE: "TOOK_WINTER_GLOVE",
    OUT_OF_TRUCK_INIT: "OUT_OF_TRUCK_INIT"
} as const;
export type StoryFlag = typeof StoryFlags[keyof typeof StoryFlags];
export const GAME_INITIAL_STATE: GameState = {
    app: "DEAD_SIGNAL",
    version: 1,
    currentZone: "TRUCK_CABIN",
    powerLevel: 100,
    currentFrequency: 0,
    discoveredSignals: [],
    storyFlags: [],
    playerInventory: [],
    inactiveCommands: [],
};
export let currentState: GameState = {...GAME_INITIAL_STATE};

export function addFlag(flag: StoryFlag): void {
    if (!currentState.storyFlags.includes(flag)) {
        currentState.storyFlags.push(flag);
    }
}

export function hasFlag(flag: StoryFlag): boolean {
    return currentState.storyFlags.includes(flag);
}

export function removeFlag(flag: StoryFlag): void {
    const index: number = currentState.storyFlags.indexOf(flag);
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
export function exportSaveFile(): void {
    //step 1
    //TODO update player inventory
    //step 2
    const jsonString: string = JSON.stringify(currentState, null, 2);
    //step 3
    const blob = new Blob([jsonString], {type: "application/json"});
    const url: string = URL.createObjectURL(blob);
    //step 4
    const a: HTMLAnchorElement = document.createElement("a");
    a.href = url;
    a.download = `save_dead_signal${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    //step 5
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

/*
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
export function importSaveFile(
    onSuccess: () => void,
    onError: (msg: string) => void
): void {
    //step 1
    const input: HTMLInputElement = document.createElement("input");
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
            const text: string = fileReader.result as string;
            //step 4
            let textParsed: unknown;
            try {
                textParsed = JSON.parse(text);
            } catch {
                onError("file isn't a valid json format");
                return;
            }
            //step 5
            if (textParsed === null || typeof textParsed !== "object" ||
                Array.isArray(textParsed)) {
                onError("invalid save format ( expected object )");
                return;
            }
            const obj = textParsed as Record<string, unknown>;
            //step 6
            if (obj.app !== "DEAD_SIGNAL") {
                onError("this file is not a valid dead signal save");
                return;
            }
            // step 7
            const maybeInvalidZone = (key: unknown): key is ZoneId => {
                return typeof key === "string" && key in ZONES;
            }
            const maybeInvalidInventorySlot = (slot: unknown): slot is InventorySlot => {
                if (slot === null || typeof slot !== "object") return false;
                if (!("itemId" in slot) || !("count" in slot)) return false;
                const entry = slot as Record<keyof InventorySlot, unknown>;
                return typeof entry.itemId === "string" && typeof entry.count === "number";
            }
            const maybeInvalidInactiveCommand = (cmd: unknown): cmd is string => {
                return typeof cmd === "string";
            }
            const validStoryFlags: StoryFlag[] = Array.isArray(obj.storyFlags)
                ? (obj.storyFlags.filter((f):
                f is StoryFlag => typeof f === "string")) :
                [...GAME_INITIAL_STATE.storyFlags];
            const validCurrentZone: ZoneId = maybeInvalidZone(obj.currentZone)
                ? obj.currentZone : GAME_INITIAL_STATE.currentZone;
            const validPlayerInventory: InventorySlot[] = Array.isArray(obj.playerInventory)
                ? obj.playerInventory.filter(maybeInvalidInventorySlot)
                : [...GAME_INITIAL_STATE.playerInventory];
            const validInactiveCommands: string[] = Array.isArray(obj.inactiveCommands)
                ? obj.inactiveCommands.filter(maybeInvalidInactiveCommand)
                : [...GAME_INITIAL_STATE.inactiveCommands];
            // step 8
            currentState = {
                ...GAME_INITIAL_STATE,
                currentZone: validCurrentZone,
                powerLevel: typeof obj.powerLevel === "number" ? obj.powerLevel :
                    GAME_INITIAL_STATE.powerLevel,
                currentFrequency: typeof obj.currentFrequency === "number"
                    ? obj.currentFrequency :
                    GAME_INITIAL_STATE.currentFrequency,
                discoveredSignals: Array.isArray(obj.discoveredSignals)
                    ? (obj.discoveredSignals as string[]) :
                    [...GAME_INITIAL_STATE.discoveredSignals],
                storyFlags: validStoryFlags,
                playerInventory: validPlayerInventory,
                inactiveCommands: validInactiveCommands
            };
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