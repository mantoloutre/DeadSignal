export type ItemType = "tool" | "consumable" | "key";
export type ItemId = keyof typeof ITEMS;
export interface Item {
    readonly id: string;
    readonly name: string;
    readonly type: ItemType; //TODO make autocompletion
    readonly description: string;
}

export interface itemConsumable {

}

export const ITEMS = {
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
        type: "consumable",
        description: "i mean... its the truck's insurance papers.."
    },
    duct_tape: {
        id: "ductTape",
        name: "roll of duct tape",
        type: "consumable",
        description: "a roll of heavy duty duct tape"
    },
    adjustable_wrench: {
        id: "adjustableWrench",
        name: "adjustable wrench",
        type: "tool",
        description: "an adjustable wrench"
    },
    insulated_wirecutter: {
        id: "insulatedWirecutter",
        name: "insulated Wirecutter",
        type: "tool",
        description: "a pair of insulated wire cutter. protects from electricity when using with breaker box"
    }
}as const;