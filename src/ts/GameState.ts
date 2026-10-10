//TODO export in json
//TODO import from json
//TODO import with json ( with security )

//base
export interface GameState {
    app: string;
    version: number;
    chapter: string;
    powerLevel: number;
    currentFrequency: number;
    discoveredSignals: string[];
}

export const GAME_INITIAL_STATE: GameState = {
    app: "DEAD_SIGNAL",
    version: 1,
    chapter: "prologue",
    powerLevel: 100,
    currentFrequency: 0,
    discoveredSignals: []
};
export let currentState = {...GAME_INITIAL_STATE};

/*
function to export the game in json.<br>
detailed explanation:
-
1. convert the state in json with indentation
2. make a virtual file in the memory
3. simulate the click on a download link
4. clean memory
 */
export function exportSaveFile(): void {
    //step 1
    const jsonString: string = JSON.stringify(currentState, null, 2);
    //step 2
    const blob = new Blob([jsonString], {type: "application/json"});
    const url: string = URL.createObjectURL(blob);
    //step 3
    const a: HTMLAnchorElement = document.createElement("a");
    a.href = url;
    a.download = `save_dead_signal${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    //step 4
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

/*
this function is to import the game from a json file.
detailed explanation:
1. create a hidden file input element
2. listener to listen for when the user select a file
3. read the selected file as text
4. parse the json text and update current gameState
5. trigger the file selection dialog
 */
export function importSaveFile(): void {
    //step 1
    const input: HTMLInputElement = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    //step 2
    input.onchange = () => {
        const file = input.files?.[0];
        if (!file) return;
        //step 3
        const fileReader = new FileReader();
        fileReader.onload = () => {
            //step 4
            const text: string = fileReader.result as string;
            const data = JSON.parse(text);
            currentState = data;
        };
        fileReader.readAsText(file);
    };
    //step 5
    input.click();
}