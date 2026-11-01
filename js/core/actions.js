import { loadZone } from "../main.js";
import { printToTerminal } from "../ui/dom.js";
/*
######################
ZONE : EXCAVATION_CAMP
######################
 */
//go back to the forest trail ( to the intersection )
export async function goBackToForestTrail() {
    await printToTerminal("You walk back toward the three way junction point", "action");
    await loadZone("GATE_CHECKPOINT");
}
/*
######
OTHER
######
 */
