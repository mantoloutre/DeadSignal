import { addFlag, hasFlag, StoryFlags } from "./gameState";
import { isPrinting, printToTerminal } from "./main.js";
function checkIfPrinting(button) {
    if (isPrinting) {
        button.classList.add("btn-error-flash");
        setTimeout(() => {
            button.classList.remove("btn-error-flash");
        }, 300);
        return true;
    }
    return false;
}
export async function checkTruckTrunk() {
    if (!hasFlag("CHECKED_TRUCK_TRUNK")) {
        addFlag(StoryFlags.CHECKED_TRUCK_TRUNK);
        await printToTerminal("You pry open the frozen trunk. Inside of it, you spot" +
            " a heavy toolbox, a mysterious black barrel and two spare tires.", "system");
    }
}
function flashButton(btn) {
    btn.classList.add("btn-error-flash");
    setTimeout(() => {
        btn.classList.remove("btn-error-flash");
    }, 300);
}
