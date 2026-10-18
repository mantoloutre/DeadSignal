import { addCrowBarToThePlayerInventory, addFlareTruckCabin, addWinterGlovesToThePlayerInventory, checkTruckTrunk, getOutOfTheDamnTruck, lookInGloveBoxInTruckCabin } from "./actions.js";
import { hasFlag } from "./gameState.js";
import { StoryFlags } from "./storyFlags.js";
const Chapter1 = {
    name: "chapter 0",
    zone: "snowy forest"
};
/*
the const containing all the zone that i'm using in the game
 */
export const ZONES = {
    SNOWY_FOREST: {
        id: "SNOWY_FOREST",
        name: "SNOWY FOREST",
        description: "The freezing wind howl through the pines. The truck sits engine "
            + "fuming on the side of the road",
        getActions: () => {
            const actions = [];
            if (!hasFlag(StoryFlags.OUT_OF_TRUCK_INIT)) {
                actions.push({
                    command: hasFlag("OPENED_TRUCK_TRUNK_INIT")
                        ? "look into the truck's trunk" : "open the truck's trunk",
                    description: "check the truck trunk's to see if there is anything useful in there",
                    execute: checkTruckTrunk,
                    oneTime: true
                });
            }
            if (hasFlag(StoryFlags.OPENED_TRUCK_TRUNK_INIT)) {
                actions.push({
                    command: "add crowbar",
                    description: "take the crowbar from the trunk",
                    execute: addCrowBarToThePlayerInventory,
                    oneTime: true
                });
                /*
                actions.push({
                    command: hasFlag("OPENED_TOOLBOX_INIT") ? "look into the toolbox" : "open the toolbox",
                    description: "open the toolbox ",
                    execute: //TODO
                });
                 */
            }
            return actions;
        }
    },
    TRUCK_CABIN: {
        id: "TRUCK_CABIN",
        name: "truck cabin",
        description: "You are sitting on the driver's seat, the truck came to a sudden stop and there is smoke" +
            " coming out of the engine",
        getActions: () => {
            const actions = [];
            actions.push({
                command: "get out of the truck",
                description: "simply get out of the truck",
                execute: getOutOfTheDamnTruck,
            });
            if (!hasFlag(StoryFlags.OPENED_GLOVE_BOX)) {
                actions.push({
                    command: "open glove box",
                    description: "open the glove box to see what's inside",
                    execute: lookInGloveBoxInTruckCabin
                });
            }
            else {
                actions.push({
                    command: "take gloves",
                    description: "take the good looking winter gloves inside the glove box",
                    execute: addWinterGlovesToThePlayerInventory,
                    oneTime: true,
                });
                actions.push({
                    command: "take flares",
                    description: "take the two flares from the glove box",
                    execute: addFlareTruckCabin,
                    oneTime: true,
                });
            }
            return actions;
        }
    }
};
