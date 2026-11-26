import { printToTerminal } from "../../ui/dom.ts";
/**
 * TODO remove this function when everything is implemented
 */
export async function nuhuh(): Promise<void> {
  await printToTerminal("not yet done, sorry", "alert");
}
/**
 * basically like if keller hid here between run but idk
 * if i want him to have done multiples run or just one?
 * TODO decide if remove this or not
 */
export async function inspectMarks(): Promise<void> {
  await printToTerminal(
    "Beside the cabinet door, scratched into the paint: groups of tally " +
      "marks. Five, crossed. Five, crossed. Dozens of groups.",
    "system",
  );
  await printToTerminal(
    "The handwriting changes halfway down. Steadier at the top. " +
      "Shaking at the bottom.",
    "log",
  );
  await printToTerminal(
    "The last group has one extra mark. The sixth stroke trails " +
      "off the door like it was drawn falling.",
    "log",
  );
}
