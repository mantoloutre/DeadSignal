//export const BREAKER_PANEL
type BreakerState = {
  int1: boolean;
  int2: boolean;
  int3: boolean;
  wire1: boolean;
};
export const BREAKER_PANEL: string[] = [
  "┌──────────────────────────────────────────────┐",
  "│ BREAKER ARRAY — RELAY A-01                   │",
  "├──────────────────────────────────────────────┤",
  "│  INT_1 ○───(X)───► CALIBRATOR   [ IDLE ]     │",
  "│                                              │",
  "│  INT_2 ○──────────► AMPLIFIER   [ IDLE ]     │",
  "│                                              │",
  "│  INT_3 ○──────────►    │                     │",
  "│                        ▼                     │",
  "│                   ┌────────┐                 │",
  "│                   │  DISH  │   [ OFF ]       │",
  "│                   └────────┘                 │",
  "│                                              │",
  "│  BUS STATUS: CARRIER PATH INCOMPLETE         │",
  "└──────────────────────────────────────────────┘",
];
export function getBreakerPanel(
  int1: boolean,
  int2: boolean,
  int3: boolean,
  wire1: boolean,
): string[] {
  if (int1 && !int2 && !int3 && !wire1) {
    return [
      "┌──────────────────────────────────────────────┐",
      "│ BREAKER ARRAY — RELAY A-01                   │",
      "├──────────────────────────────────────────────┤",
      "│  INT_1 ○──     ──► CALIBRATOR   [ ACTIVE ]   │",
      "│                                              │",
      "│  INT_2 ○──────────► AMPLIFIER   [ IDLE ]     │",
      "│                                              │",
      "│  INT_3 ○──────────►    │                     │",
      "│                        ▼                     │",
      "│                   ┌────────┐                 │",
      "│                   │  DISH  │   [ OFF ]       │",
      "│                   └────────┘                 │",
      "│                                              │",
      "│  BUS STATUS: CARRIER PATH INCOMPLETE         │",
      "└──────────────────────────────────────────────┘",
    ];
  } else if (!int1 && int2 && !int3 && !wire1) {
    return [
      "┌──────────────────────────────────────────────┐",
      "│ BREAKER ARRAY — RELAY A-01                   │",
      "├──────────────────────────────────────────────┤",
      "│  INT_1 ○───(X)───► CALIBRATOR   [ IDLE ]     │",
      "│                                              │",
      "│  INT_2 ○──────────► AMPLIFIER   [ ACTIVE ]   │",
      "│                                              │",
      "│  INT_3 ○──────────►    │                     │",
      "│                        ▼                     │",
      "│                   ┌────────┐                 │",
      "│                   │  DISH  │   [ OFF ]       │",
      "│                   └────────┘                 │",
      "│                                              │",
      "│  BUS STATUS: CARRIER PATH INCOMPLETE         │",
      "└──────────────────────────────────────────────┘",
    ];
  } else {
    return [
      "┌──────────────────────────────────────────────┐",
      "│ BREAKER ARRAY — RELAY A-01                   │",
      "├──────────────────────────────────────────────┤",
      "│  INT_1 ○───(X)───► CALIBRATOR   [ IDLE ]     │",
      "│                                              │",
      "│  INT_2 ○──────────► AMPLIFIER   [ IDLE ]     │",
      "│                                              │",
      "│  INT_3 ○──────────►    │                     │",
      "│                        ▼                     │",
      "│                   ┌────────┐                 │",
      "│                   │  DISH  │   [ OFF ]       │",
      "│                   └────────┘                 │",
      "│                                              │",
      "│  BUS STATUS: CARRIER PATH INCOMPLETE         │",
      "└──────────────────────────────────────────────┘",
    ];
  }
}
const TOP: string = "┌──────────────────────────────────────────────┐";
const SEP: string = "├──────────────────────────────────────────────┤";
const BTM: string = "└──────────────────────────────────────────────┘";
export function getBreakerPanelV2(stuff: BreakerState): void {
  const i1: string = stuff.int1 ? "●" : "○";
  const i2: string = stuff.int2 ? "●" : "○";
  const i3: string = stuff.int3 ? "●" : "○";
}
