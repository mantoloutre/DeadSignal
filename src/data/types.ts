/*
the type for the zones ( it have to be done manually or else it causes a circular references )
 */
/*
export type ZoneId =
  | "TRUCK_CABIN"
  | "OUTSIDE_TRUCK"
  | "SNOWY_FOREST"
  | "GATE_CHECKPOINT"
  | "WATCH_POST_OUTSIDE"
  | "WATCH_POST"
  | "GATE_CHECKPOINT_SHACK";
 */

//| "EXCAVATION_CAMP"
/*
    | "RELAY_ALPHA_EXTERIOR"
    | "RELAY_ALPHA_BUNKER"
    | "SHATTERED_RIDGE"
    | "RELAY_BRAVO_STATION"
    | "SUB_BUNKER_AIRLOCK"
    | "CORE_CONTROL_ROOM"

*/
export interface ZoneAction {
  command: string;
  description: string;
  execute: () => Promise<void>;
  oneTime?: boolean;
}

export interface Zone {
  readonly name: string;
  readonly description: string;
  readonly getActions: () => ZoneAction[];
}
export type fromType = "system" | "alert" | "QG" | "log" | "action" | "YOU";
