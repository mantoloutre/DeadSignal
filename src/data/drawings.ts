//export const BREAKER_PANEL
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
      "│  INT_1 ○───(X)───► CALIBRATOR   [ ACTIVE ]   │",
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
