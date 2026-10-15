import { ITEMS } from "./items.js";
import { printToTerminal } from "./main.js";
export const playerInventory = [];
export async function addItemToInventory(itemId, amount = 1) {
    if (!ITEMS[itemId]) {
        console.error(`why is that here: ${itemId} ???`);
        //false if item came outta nowhere and is unknown
        return false;
    }
    const existSlot = playerInventory.find(slot => slot.itemId === itemId);
    if (existSlot) {
        //if tha item is a consumable we gonna add one to the ammount
        //can stack consumable, cant stack the rest. no you are not gonna hold 48 crowbar in your inventory.
        if (ITEMS[itemId].type === "consumable") {
            existSlot.count += amount;
            //then we return true :3
            return true;
        }
        //if its not a consumable (and its in inventory), we just return false ( and ask.. why..)
        await printToTerminal('you already have one in your inventory, you don\'t need 2 of it', "system");
        return false;
    }
    //if not in inventory, then i allow you to pick it up
    //TODO add a text saying u picked the item? with item name ofc
    playerInventory.push({ itemId, count: amount });
    return true;
}
export function removeItemFromInventory(itemId, amount = 1) {
    const slotIndex = playerInventory.findIndex(slot => slot.itemId === itemId);
    //if you dont have it in ur inventory
    if (slotIndex == -1)
        return false;
    playerInventory[slotIndex].count -= amount;
    if (playerInventory[slotIndex].count <= 0) {
        playerInventory.splice(slotIndex, 1);
    }
    //if you have it in your inventory
    return true;
}
export function doesThePlayerHasTheItem(itemId) {
    return playerInventory.some(slot => slot.itemId === itemId && slot.count > 0);
}
