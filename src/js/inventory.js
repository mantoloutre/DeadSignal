import { ITEMS } from "./items.js";
import { printToTerminal } from "./main.js";
import { currentState } from "./gameState.js";
export async function addItemToInventory(itemId, amount = 1) {
    if (!ITEMS[itemId]) {
        console.error(`why is that here: ${itemId} ???`);
        //false if item came outta nowhere and is unknown
        return false;
    }
    const existSlot = currentState.playerInventory.find(slot => slot.itemId === itemId);
    if (existSlot) {
        //if tha item is a consumable we gonna add one to the ammount
        //can stack consumable, cant stack the rest. no you are not gonna hold 48 crowbar in your inventory.
        if (ITEMS[itemId].type === "consumable") {
            existSlot.count += amount;
            //then we return true :3
            return true;
        }
        //if its not a consumable (and its in inventory), we just return false ( and ask.. why..)
        await printToTerminal(`you already have the item :  ${ITEMS[itemId].name} in your inventory, you don't need 2 of it`, "system");
        return false;
    }
    /*
    //if not in inventory, then i allow you to pick it up
    if (!(ITEMS[itemId].type === "consumable")) {
        await printToTerminal(`you picked up the following item : ${ITEMS[itemId].name}. It is now in your inventory`, "action");
    }
     */
    currentState.playerInventory.push({ itemId, count: amount });
    return true;
}
export function removeItemFromInventory(itemId, amount = 1) {
    //if you dont have it in ur inventory
    if (!doesThePlayerHasTheItem(itemId)) {
        return false;
    }
    const slotIndex = currentState.playerInventory.findIndex(slot => slot.itemId === itemId);
    currentState.playerInventory[slotIndex].count -= amount;
    if (currentState.playerInventory[slotIndex].count <= 0) {
        currentState.playerInventory.splice(slotIndex, 1);
    }
    //if you have it in your inventory
    return true;
}
export function doesThePlayerHasTheItem(itemId) {
    return currentState.playerInventory.some(slot => slot.itemId === itemId && slot.count > 0);
}
export function getThePlayerInventoryItem() {
    return currentState.playerInventory
        .map(slot => ITEMS[slot.itemId])
        .filter((item) => item !== undefined);
}
