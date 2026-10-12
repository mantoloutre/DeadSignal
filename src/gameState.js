export const StoryFlags = {
    TRUCK_REPAIRED: "TRUC_REPAIRED",
    WALKED_TO_TOWER: "WALKED_TO_TOWER"
};
export const GAME_INITIAL_STATE = {
    app: "DEAD_SIGNAL",
    version: 1,
    chapter: {
        name: "prologue",
        zone: "snowy forest"
    },
    powerLevel: 100,
    currentFrequency: 0,
    discoveredSignals: [],
    storyFlags: []
};
export let currentState = { ...GAME_INITIAL_STATE };
export function addFlag(flag) {
    if (!currentState.storyFlags.includes(flag)) {
        currentState.storyFlags.push(flag);
    }
}
export function hasFlag(flag) {
    return currentState.storyFlags.includes(flag);
}
export function removeFlag(flag) {
    //TODO
}
/*
function to export the game in json.<br>
detailed explanation:
-
1. convert the state in json with indentation
2. make a virtual file in the memory
3. simulate the click on a download link
4. clean memory
 */
export function exportSaveFile() {
    //step 1
    const jsonString = JSON.stringify(currentState, null, 2);
    //step 2
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    //step 3
    const a = document.createElement("a");
    a.href = url;
    a.download = `save_dead_signal${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    //step 4
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
            const text = fileReader.result;
            //step 4
            let textParsed;
            try {
                textParsed = JSON.parse(text);
            }
            catch {
                onError("file isn't a valid json format");
                return;
            }
            //step 5
            if (textParsed === null || typeof textParsed !== "object" ||
                Array.isArray(textParsed)) {
                onError("invalid save format ( expected object )");
                return;
            }
            const obj = textParsed;
            //step 6
            if (obj.app !== "DEAD_SIGNAL") {
                onError("this file is not a valid dead signal save");
                return;
            }
            // step 7
            const maybeInvalidChapter = (typeof obj.chapter === "object" && obj.chapter !== null)
                ? obj.chapter : GAME_INITIAL_STATE.chapter;
            const validChapter = {
                name: typeof maybeInvalidChapter.name === "string"
                    ? maybeInvalidChapter.name : GAME_INITIAL_STATE.chapter.name,
                zone: typeof maybeInvalidChapter.zone === "string"
                    ? maybeInvalidChapter.zone : GAME_INITIAL_STATE.chapter.zone
            };
            // step 8
            currentState = {
                ...GAME_INITIAL_STATE,
                chapter: validChapter,
                powerLevel: typeof obj.powerLevel === "number" ? obj.powerLevel :
                    GAME_INITIAL_STATE.powerLevel,
                currentFrequency: typeof obj.currentFrequency === "number" ? obj.currentFrequency :
                    GAME_INITIAL_STATE.currentFrequency,
                discoveredSignals: Array.isArray(obj.discoveredSignals)
                    ? obj.discoveredSignals :
                    [...GAME_INITIAL_STATE.discoveredSignals]
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
