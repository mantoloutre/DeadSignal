export const presetBeforeDiscoveringBody = {
    app: "DEAD_SIGNAL",
    version: 1,
    currentZone: "WATCH_POST_OUTSIDE",
    powerLevel: 100,
    pendingQGMessages: ["QG_MESSAGE_GOT_TOWER_FIRST_TIME"],
    currentFrequency: "112.400",
    discoveredSignals: ["112.400"],
    storyFlags: ["READ_MANUAL",
        "OPENED_GLOVE_BOX",
        "TOOK_WINTER_GLOVE",
        "OPENED_HOOD_TRUCK_INIT",
        "OPENED_TRUCK_TRUNK_INIT",
        "WALKED_TO_TOWER",
        "TOOK_FLARE_FROM_GLOVE_BOX",
        "INSPECTED_DIRECTION_SIGN",
        "OPENED_TOOLBOX_INIT",
    ],
    playerInventory: [
        //consumable
        {
            itemId: "truck_insurance_papers",
            count: 1
        },
        {
            itemId: "duct_tape",
            count: 1
        },
        {
            itemId: "flare",
            count: 2
        },
        //tool
        {
            itemId: "crowbar",
            count: 1,
        },
        {
            itemId: "adjustable_wrench",
            count: 1,
        },
        {
            itemId: "winter_gloves",
            count: 1,
        },
        {
            itemId: "insulated_wirecutter",
            count: 1,
        }
    ],
    inactiveCommands: [
        "take gloves",
        "take flares",
        "read emergency manual",
        "take truck insurance papers",
        "open the truck's trunk",
        "take crowbar",
        "look into the truck's trunk",
        "pickup ajustable wrench",
        "pickup duct tape"
    ]
};
