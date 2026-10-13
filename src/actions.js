import { addFlag, hasFlag, StoryFlags } from "./gameState";
import { printToTerminal } from "./main.js";
export async function checkTruckTrunk() {
    if (!hasFlag("CHECKED_TRUCK_TRUNK")) {
        addFlag(StoryFlags.CHECKED_TRUCK_TRUNK);
        await printToTerminal("You pry open the frozen trunk. Inside of it, you spot" +
            " a heavy toolbox, a mysterious black barrel and two spare tires.", "system");
    }
}
