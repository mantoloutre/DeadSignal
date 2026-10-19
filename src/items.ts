export type ItemType = "tool" | "consumable" | "key";

export interface Item {
    id: string;
    name: string;
    type: ItemType;
    description: string;
}

export interface itemConsumable {

}

export const ITEMS: Record<string, Item> = {
    crowbar: {
        id: "crowbar",
        name: "Crowbar",
        type: "tool",
        description: "A simple fine looking and sturdy red crowbar."
    },
    flare: {
        id: "flare",
        name: "Flare",
        type: "consumable",
        description: "emit a blinding red light and intense heat for a short amount of time."
    },
    encryption_key: {
        id: "encryption_key",
        name: "military encryption key",
        type: "tool",
        description: "a USB key found on the technician."
    },
    winter_gloves: {
        id: "winterGlove",
        name: "Winter Gloves",
        type: "tool",
        description: "a warm pair of gloves, be careful to not burn them."
    },
    truck_insurance_papers: {
        id: "trucInsurancePapers",
        name: "The truck insurance Paper",
        type: "tool",
        description: "i mean... its the truck's insurance papers.."
    },
    duct_tape: {
        id: "ductTape",
        name: "roll of duct tape",
        type: "consumable",
        description: "a roll of heavy duty duct tape"
    },
    ajustable_wrench: {
        id: "ajustableWrench",
        name: "ajustable wrench",
        type: "tool",
        description: "an ajustable wrench"
    }
}