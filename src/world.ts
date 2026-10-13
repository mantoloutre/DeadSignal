import {StoryFlags} from "./gameState";

export interface User_Choice {
    label: string;
    action: () => void;
}
export interface ZoneActions {
    command: string;
    description: string;
    execute: () => void;
}
export interface ZoneDef {
    id: string;
    name: string;
    description: string;
    actions: ZoneActions[];
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
export const ZONES: Record<string, ZoneDef> = {
    SNOWY_FOREST: {
        id: "SNOWY_FOREST",
        name: "SNOWY FOREST",
        description: "The freezing wind howl through the pines. The truck sits engine "
        + "fuming on the side of the road",
        actions: [
            {
                command: "check truck's trunk",
                description: "check the truck trunk's to see if there is anything useful in there",
                execute():
            }
        ]
    }
}*/