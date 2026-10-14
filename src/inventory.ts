import {ITEMS, Item} from "./items.js";
import {printToTerminal} from "./main.js";

export interface InventorySlot {
    itemId: string;
    count: number;
}

export const playerInventory: InventorySlot[] = [];

export function addItemToInventory(itemId: string, amount: number = 1): boolean {
    if (!ITEMS[itemId]) {
        console.error(`why is that here: ${itemId} ???`);
        //false if item came outta nowhere and is unknown
        return false;
    }
    const existSlot = playerInventory.find(slot => slot.itemId === itemId);
    if(existSlot){
        //if tha item is a consumable we gonna add one to the ammount
        if( ITEMS[itemId].type === "consumable"){
            existSlot.count += amount;
            //then we return true :3
            return true;
        }
        //if its not a consumable (and its in inventory), we just return false ( and ask.. why..)
        printToTerminal('you already have one in your inventory, you don''t need 2 of it', "system");
    }
    //can stack consumable, cant stack the rest. no you are not gonna hold 48 crowbar in your inventory.
    if (!playerInventory.includes(itemId) && ITEMS[itemId].type !== "consumable") {
        playerInventory.push(itemId);
        //true if its not consumable and its not in inventory already
        return true;
    } else if (ITEMS[itemId].type === "consumable") {

    }
}