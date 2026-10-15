import { addCrowBarToThePlayerInventory, addWinterGlovesToThePlayerInventory, checkTruckTrunk } from "./actions.js";
const Chapter1 = {
    name: "chapter 0",
    zone: "snowy forest"
};
export const ZONES = {
    SNOWY_FOREST: {
        id: "SNOWY_FOREST",
        name: "SNOWY FOREST",
        description: "The freezing wind howl through the pines. The truck sits engine "
            + "fuming on the side of the road",
        getActions: () => [
            {
                command: "check truck's trunk",
                description: "check the truck trunk's to see if there is anything useful in there",
                execute: checkTruckTrunk
            },
            {
                command: "add crowbar",
                description: "test feature, add a crowbar to the player inventory",
                execute: addCrowBarToThePlayerInventory
            }
        ]
    },
    TRUCK_CABIN: {
        id: "TRUCK_CABIN",
        name: "truck cabin",
        description: "The inside of your the tactical truck cabin that was assigned to you, something doesn't feel " +
            "right about the truck...",
        getActions: () => [
            {
                command: "take gloves",
                description: "take the good looking winter gloves next to you on the seat",
                execute: addWinterGlovesToThePlayerInventory
            }
        ]
    }
};
