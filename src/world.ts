import {
    addCrowBarToThePlayerInventory, addFlareTruckCabin,
    addWinterGlovesToThePlayerInventory,
    checkTruckTrunk, getOutOfTheDamnTruck, lookInGloveBoxInTruckCabin
} from "./actions.js";
import {hasFlag, StoryFlags} from "./gameState.js";

export interface User_Choice {
    label: string;
    action: () => void;
}

export interface ZoneActions {
    command: string;
    description: string;
    execute: () => Promise<void>;
    oneTime?: boolean;
}

export interface Zone {
    id: string;
    name: string;
    description: string;
    getActions: () => ZoneActions[];
}

export interface Chapter {
    name: string;
    zone: string;
}

const Chapter1: Chapter = {
    name: "chapter 0",
    zone: "snowy forest"
}
/*
the const containing all the zone that i'm using in the game
 */
export const ZONES = {
    SNOWY_FOREST: {
        id: "SNOWY_FOREST",
        name: "SNOWY FOREST",
        description: "The freezing wind howl through the pines. The truck sits engine "
            + "fuming on the side of the road",
        getActions: (): ZoneActions[] => {
            const actions: ZoneActions[] = [];
            if (!hasFlag(StoryFlags.OUT_OF_TRUCK_INIT)) {
                actions.push({
                    command: "check truck's trunk",
                    description: "check the truck trunk's to see if there is anything useful in there",
                    execute: checkTruckTrunk,
                    oneTime: true
                });
            }
            if (hasFlag(StoryFlags.CHECKED_TRUCK_TRUNK)) {
                actions.push({
                    command: "add crowbar",
                    description: "test feature, add a crowbar to the player inventory",
                    execute: addCrowBarToThePlayerInventory,
                    oneTime: true
                });
            }
            return actions;
        }
    },
    TRUCK_CABIN: {
        id: "TRUCK_CABIN",
        name: "truck cabin",
        description: "You are sitting on the driver's seat, the truck came to a sudden stop and there is smoke" +
            " coming out of the engine",
        getActions: (): ZoneActions[] => {
            const actions: ZoneActions[] = [];
            actions.push({
                command: "get out of the truck",
                description: "simply get out of the truck",
                execute: getOutOfTheDamnTruck,
            })
            if (!hasFlag(StoryFlags.OPENED_GLOVE_BOX)) {
                actions.push({
                    command: "open glove box",
                    description: "open the glove box to see what's inside",
                    execute: lookInGloveBoxInTruckCabin
                });
            } else {
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
} satisfies Record<string, Zone>