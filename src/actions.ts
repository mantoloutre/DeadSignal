import {addFlag, hasFlag, StoryFlags} from "./gameState";
import {printToTerminal} from "./main.js";

export type consoleType = "alert" | "system" | "journal" | "qg";



export async function checkTruckTrunk(): Promise<void> {
    if (!hasFlag("CHECKED_TRUCK_TRUNK")) {
        addFlag(StoryFlags.CHECKED_TRUCK_TRUNK);
        await printToTerminal("You pry open the frozen trunk with your hands. Inside of it, you spot" +
            " a heavy toolbox, a small black barrel full of wine and two spare tires.", "system")
    } else {
        await printToTerminal("Inside the truck, nothing changed, still a heavy toolbox, " +
            "the barrel of wine and the two spare tire.", "system");
    }
}