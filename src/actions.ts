import {addFlag, hasFlag, StoryFlags} from "./gameState";
import {isPrinting, printToTerminal} from "./main.js";

export type consoleType = "alert" | "system" | "journal" | "qg";

function checkIfPrinting(button: HTMLButtonElement): boolean{
    if (isPrinting){
        button.classList.add("btn-error-flash");
        setTimeout(():void => {
            button.classList.remove("btn-error-flash");
        }, 300);
        return true;
    }
    return false;
}
export async function checkTruckTrunk(): Promise<void> {
    if(!hasFlag("CHECKED_TRUCK_TRUNK")){
        addFlag(StoryFlags.CHECKED_TRUCK_TRUNK);
        await printToTerminal("You pry open the frozen trunk. Inside of it, you spot" +
            " a heavy toolbox, a mysterious black barrel and two spare tires.", "system")
    }
}
function flashButton(btn: HTMLButtonElement): void{
    btn.classList.add("btn-error-flash");
    setTimeout(() =>{
        btn.classList.remove("btn-error-flash");
    }, 300);
}