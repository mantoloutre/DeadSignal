import { addCrowBarToThePlayerInventory, addFlareTruckCabin, addWinterGlovesToThePlayerInventory, checkTruckTrunk, lookInGloveBoxInTruckCabin } from "./actions.js";
import { hasFlag, StoryFlags } from "./gameState.js";
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
        getActions: () => {
            const actions = [];
            if (!hasFlag(StoryFlags.OPENED_GLOVE_BOX)) {
                actions.push({
                    command: "open glove box",
                    description: "open the glove box to see what's inside",
                    execute: lookInGloveBoxInTruckCabin //TODO
                });
            }
            else {
                actions.push({
                    command: "take gloves",
                    description: "take the good looking winter gloves inside the glove box",
                    execute: addWinterGlovesToThePlayerInventory
                });
                actions.push({
                    command: "take flares",
                    description: "take the two flares from the glove box",
                    execute: addFlareTruckCabin
                });
            }
        }
    }
};
