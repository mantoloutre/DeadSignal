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
const LENGTH: number = 46;
const TOP: string = `┌${"─".repeat(LENGTH)}┐`;
const SEP: string = `├${"─".repeat(LENGTH)}┤`;
const BTM: string = `└${"─".repeat(LENGTH)}┘`;
function makeRow(text: string): string {
  return `│${text.padEnd(LENGTH)}│`;
}
function statRow(lbl: string, status: string): string {
  const pad: string = " ".repeat(LENGTH - lbl.length - status.length);
  return `│${lbl}${pad}${status}│`;
}
export function getBreakerPanelV2(stuff: BreakerState): void {
  const i1: string = stuff.int1 ? "●" : "○";
  const i2: string = stuff.int2 ? "●" : "○";
  const i3: string = stuff.int3 ? "●" : "○";
  const cut: string = stuff.wire1 ? "────" : "(x)─";
  const calibratorStatus: "ACTIVE" | "IDLE" | "NO SIG" = !stuff.int1
    ? "IDLE"
    : !stuff.wire1
      ? "NO SIG"
      : "ACTIVE";
}
