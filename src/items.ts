export type ItemType = "tool" | "consumable" | "key";
interface Item {
    id: string;
    name: string;
    type: ItemType;
    description: string;
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
        description: "émit a blinding red light and intense heat for a short amount of time."
    },
    encryption_key: {
        id: "encryption_key",
        name: "military encryption key",
        type: "tool",
        description: "a USB key found on the technician."
    }
}