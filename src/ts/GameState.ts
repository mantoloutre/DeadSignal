//TODO export in json
//TODO import from json
//TODO import with json ( with security )
export interface GameState{
    app: string;
    version: number;
    chapter: string;
    powerLevel: number;
    currentFrequency: number;
    discoveredSignals: string[];
}