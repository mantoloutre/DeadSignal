/*
the type for the zones ( it have to be done manually or else it causes a circular references )
 */
export type ZoneId =
  | "TRUCK_CABIN"
  | "OUTSIDE_TRUCK"
  | "SNOWY_FOREST"
  | "GATE_CHECKPOINT"
  | "WATCH_POST_OUTSIDE"
  | "WATCH_POST";
//| "EXCAVATION_CAMP"
/*
    | "RELAY_ALPHA_EXTERIOR"
    | "RELAY_ALPHA_BUNKER"
    | "SHATTERED_RIDGE"
    | "RELAY_BRAVO_STATION"
    | "SUB_BUNKER_AIRLOCK"
    | "CORE_CONTROL_ROOM"

*/
export type RadioFrequencyName =
  | "QG_FREQUENCY"
  | "PROMETHEUS_BEACON"
  | "RELAY_A01_SYNC"
  | "CREW_BLACKBOX"
  | "MIL_OVERRIDE"
  | "KILL_SWITCH_PULSE";
