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