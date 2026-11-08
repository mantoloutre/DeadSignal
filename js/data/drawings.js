//export const BREAKER_PANEL
export const BREAKER_PANEL = [
    "┌──────────────────────────────────────────────┐",
    "│ BREAKER ARRAY — RELAY A-01                   │",
    "├──────────────────────────────────────────────┤",
    "│  INT_1 ○───(X)───► CALIBRATOR   [ IDLE ]     │",
    "│                                              │",
    "│  INT_2 ○───┐                                 │",
    "│            ├──────►AMPLIFIER   [ IDLE ]      │",
    "│  INT_3 ○───┘           │                     │",
    "│                        ▼                     │",
    "│                   ┌────────┐                 │",
    "│                   │  DISH  │   [ OFF ]       │",
    "│                   └────────┘                 │",
    "│                                              │",
    "│  BUS STATUS: CARRIER PATH INCOMPLETE         │",
    "└──────────────────────────────────────────────┘",
];
const LENGTH = 46;
const TOP = `┌${"─".repeat(LENGTH)}┐`;
const SEP = `├${"─".repeat(LENGTH)}┤`;
const BTM = `└${"─".repeat(LENGTH)}┘`;
function makeRow(text) {
    return `│${text.padEnd(LENGTH)}│`;
}
function statRow(lbl, status) {
    const pad = " ".repeat(LENGTH - lbl.length - status.length);
    return `│${lbl}${pad}${status}│`;
}
let theState = false;
/**
 * function to define if the drawing panel is open or no
 * @param openOrNot
 */
export function setIsOpenDrawingPanel(openOrNot) {
    theState = openOrNot;
}
/**
 * function to know if the drawing panel is open or no
 */
export function isDrawingPanelOpenOrNot() {
    return theState;
}
/**
 * I think this is a functioning drawing function...?
 * ( technically it is data )
 * @param stuff every state
 */
export function getBreakerPanelV2(stuff) {
    const i1 = stuff.int1 ? "●" : "○";
    const i2 = stuff.int2 ? "●" : "○";
    const i3 = stuff.int3 ? "●" : "○";
    const cut = stuff.wire1 ? "────" : "(x)─";
    const calibratorStatus = !stuff.int1
        ? "IDLE"
        : !stuff.wire1
            ? "NO SIG"
            : "ACTIVE";
    const amplifierStatus = stuff.int2 && stuff.int3
        ? "OVERLOAD"
        : stuff.int2 || stuff.int3
            ? "ACTIVE"
            : "IDLE";
    const dishStatus = calibratorStatus === "ACTIVE" && amplifierStatus === "ACTIVE"
        ? "TRACKING"
        : "OFF";
    const busStatus = dishStatus === "TRACKING"
        ? "CARRIER PATH COMPLETE"
        : "CARRIER PATH INCOMPLETE";
    return [
        TOP,
        makeRow("  BREAKER ARRAY - RELAY A-01"),
        SEP,
        statRow(`  INT_1 ${i1}───${cut}──► CALIBRATOR`, `[ ${calibratorStatus} ]`),
        makeRow(""),
        makeRow(`  INT_2 ${i2}───┐`),
        statRow(`            ├────► AMPLIFIER`, `[ ${amplifierStatus} ]`),
        makeRow(`  INT_3 ${i3}───┘         │`),
        makeRow("                      ▼"),
        statRow(`                  ┌────────┐`, ""),
        statRow(`                  │  DISH  │`, `[ ${dishStatus} ]`),
        makeRow("                  └────────┘"),
        makeRow(""),
        makeRow(`  BUS STATUS: ${busStatus}`),
        BTM,
    ];
}
