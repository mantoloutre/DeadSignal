import {ITEMS, Item} from "./items.js";

export interface InventorySlot {
    itemId: string;
    count: number;
}

export const playerInventory: InventorySlot[] = [];

export function addItemToInventory(itemId: string): any {
    if (!ITEMS[itemId]) {
        console.error(`why is that here: ${itemId} ???`);
        //false if item came outta nowhere and is unknown
        return false;
    }
}
/*
    //can stack consumable, cant stack the rest. no you are not gonna hold 48 crowbar in your inventory.
    if (!playerInventory.includes(itemId) && ITEMS[itemId].type !== "consumable") {
        playerInventory.push(itemId);
        //true if its not consumable and its not in inventory already
        return true;
    } else if (ITEMS[itemId].type === "consumable") {

    }
}
*/