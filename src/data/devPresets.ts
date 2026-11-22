import type { GameState } from "../core/gameState.js";
/*
this const is to skip part of the game for the reviewer
 */
export const presetBeforeDiscoveringBody: GameState = {
  app: "DEAD_SIGNAL",
  version: 1,
  currentZone: "WATCH_POST_OUTSIDE",
  powerLevel: 100,
  pendingQGMessages: ["GOT_TOWER_FIRST_TIME"],
  currentFrequency: "112.400",
  discoveredSignals: ["112.400", "000.000"],
  storyFlags: [
    "READ_MANUAL",
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
      count: 1,
    },
    {
      itemId: "duct_tape",
      count: 1,
    },
    {
      itemId: "flare",
      count: 2,
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
    },
    {
      itemId: "robot_memory_module",
      count: 1,
    },
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
    "pickup duct tape",
  ],
  relayA01BreakerPanel: {
    int1: false,
    int2: false,
    int3: false,
    wire1: false,
  },
} satisfies GameState;
/*
export const presetTestDrawingPanel: GameState = {

};
*/
export const presetOutsideFirstRelay: GameState = {
  app: "DEAD_SIGNAL",
  version: 1,
  currentZone: "RELAY_A01_OUTSIDE",
  powerLevel: 100,
  pendingQGMessages: [],
  currentFrequency: "112.400",
  discoveredSignals: ["000.000", "112.400", "940.700"],
  storyFlags: [
    "OPENED_GLOVE_BOX",
    "READ_MANUAL",
    "TOOK_WINTER_GLOVE",
    "OPENED_TRUCK_TRUNK_INIT",
    "OPENED_HOOD_TRUCK_INIT",
    "INSPECTED_DIRECTION_SIGN",
    "OPENED_TOOLBOX_INIT",
    "SEARCHED_GUARD_SHACK",
    "GOT_QG_MESSAGE_GOT_TO_TOWER",
    "DISCOVERED_KELLER_BODY",
    "TOLD_QG_ABOUT_NOTE",
    "TOLD_QG_ABOUT_BODY",
    "SEARCHED_KELLER_BODY",
  ],
  playerInventory: [
    {
      itemId: "flare",
      count: 2,
    },
    {
      itemId: "winter_gloves",
      count: 1,
    },
    {
      itemId: "crowbar",
      count: 1,
    },
    {
      itemId: "adjustable_wrench",
      count: 1,
    },
    {
      itemId: "duct_tape",
      count: 1,
    },
    {
      itemId: "keller_keycard",
      count: 1,
    },
    {
      itemId: "keller_credential",
      count: 1,
    },
  ],
  inactiveCommands: [
    "read emergency manual",
    "take flares",
    "take gloves",
    "open the truck's trunk",
    "look into the truck's trunk",
    "take crowbar",
    "pickup ajustable wrench",
    "pickup duct tape",
    "Salvage memory module",
    "Note Found",
    "Dead Body",
    "search body",
    "take Keller's keycard",
    "take Keller's credential",
    "take pen",
  ],
  relayA01BreakerPanel: {
    int1: false,
    int2: false,
    int3: false,
    wire1: false,
  },
} satisfies GameState;
export const presetAfterMemoryModule: GameState = {
  app: "DEAD_SIGNAL",
  version: 1,
  currentZone: "WATCH_POST",
  powerLevel: 100,
  pendingQGMessages: [],
  currentFrequency: "112.400",
  discoveredSignals: ["112.400", "000.000", "940.700"],
  storyFlags: [
    "READ_MANUAL",
    "OPENED_GLOVE_BOX",
    "TOOK_WINTER_GLOVE",
    "OPENED_HOOD_TRUCK_INIT",
    "OPENED_TRUCK_TRUNK_INIT",
    "WALKED_TO_TOWER",
    "TOOK_FLARE_FROM_GLOVE_BOX",
    "INSPECTED_DIRECTION_SIGN",
    "OPENED_TOOLBOX_INIT",
    "DISCOVERED_KELLER_BODY",
    "TOLD_QG_ABOUT_NOTE",
    "TOLD_QG_ABOUT_BODY",
    "SEARCHED_KELLER_BODY",
    "INSERTED_MEMORY_MODULE",
  ],
  playerInventory: [
    {
      itemId: "truck_insurance_papers",
      count: 1,
    },
    {
      itemId: "duct_tape",
      count: 1,
    },
    {
      itemId: "flare",
      count: 2,
    },
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
    },
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
    "pickup duct tape",
    "Note Found",
    "Dead Body",
  ],
  relayA01BreakerPanel: {
    int1: false,
    int2: false,
    int3: false,
    wire1: false,
  },
} satisfies GameState;
