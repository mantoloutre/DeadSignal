import {
  die,
  flashButton,
  getEl,
  printDeathMessage,
  printToTerminal,
} from "../../ui/dom.ts";
import { closeRadioInterface, tuningEvent } from "../../ui/radioInterface.ts"; //TODO watch out for possible circular reference
import { addFlag, currentState, hasFlag } from "../gameState.ts";
import { FREQUENCY_REGISTRY, getFormattedBuffer } from "../radioFrequency.ts";
import type { ZoneId } from "../world.ts";

export async function handleResonatorActions(zone: ZoneId): Promise<void> {
  const tuning: HTMLButtonElement = getEl("btn-tune");
  tuning.removeEventListener("click", tuningEvent);
  tuning.addEventListener("click", tuningInEncounter);
  if (hasFlag("HAD_FIRST_ENCOUNTER")) {
    tuning.removeEventListener("click", tuningInEncounter);
    tuning.addEventListener("click", tuningEvent);
  }
}

async function choseToContactTheQg(): Promise<void> {
  await printToTerminal("you try to contact the QG...", "action");
  await printToTerminal(
    "Nothing gets trough, its jammed by broadband EMI on 940.700 MHz",
    "alert",
  );
  await die();
  await printDeathMessage(
    "You hear static, even with heavy distortion, you hear a firm voice." +
      "'Stay on this channel, we are on our way', it says",
  );
  await printDeathMessage(
    "Then, the voice repeats it, same pause, same breath...",
  );
  await printDeathMessage(
    "The voice says: 'You did well, going this far'." +
      "Its really warm, friendly.. and its making your skin crawl.",
  );
  await printDeathMessage(
    "After a long pause it end up saying: 'Just relax, it will all be over soon.'.",
  );
  await printDeathMessage(
    "Your ears pop violently. Warm bloods fill both canals, " +
      "and the voice never stop comforting you, " +
      "not even as it takes you.",
  );
  await printDeathMessage(
    "Frost bleeds outward accross your visor as the inside of the watchpost " +
      "fades to black.",
  );
  //TODO (wip) failed to ping and u gone now.
}

/**
 * function that handle then the player tune the radio during the first encounter
 */
async function tuningInEncounter(): Promise<void> {
  const buffer: string = getFormattedBuffer();
  if (buffer.length === 7 && buffer !== "---.---") {
    currentState.currentFrequency = buffer;
    getEl("frequency").textContent = buffer;
    closeRadioInterface();
    switch (currentState.currentFrequency) {
      case FREQUENCY_REGISTRY.THE_RESONATOR.frequency:
        await choseToAngerResonatorIGuess();
        break;
      case FREQUENCY_REGISTRY.QG_FREQUENCY.frequency:
        await choseToContactTheQg();
        break;
      case FREQUENCY_REGISTRY.RADIO_RECEIVE_ONLY.frequency:
        await printToTerminal(
          "You decide set your radio so you can only receive transmission and it" +
            " doesn't emit anything anymore.",
          "action",
        );
        addFlag("HAD_FIRST_ENCOUNTER");
        //TODO noice
        break;
      default:
        await printToTerminal(
          `You decide to set your radio to the 
        following frequency: ${currentState.currentFrequency}`,
          "action",
        );
        await printToTerminal(
          "whatever is happening" + "doesn't seem to be stopping",
          "system",
        );
      //TODO sadness
    }
  } else {
    flashButton(getEl("btn-tune"));
  }
}

async function choseToAngerResonatorIGuess(): Promise<void> {
  await printToTerminal(
    "The Frequency was already tuned into this frequency, and you decide to " +
      "press the tune button again",
    "action",
  );
  await die();
  await printDeathMessage(
    "a deafening screech tears through the speaker of your radio instantly shattering the small screen.",
  );
  await printDeathMessage(
    "Your ears pop violently. Warm blood fills both canals before you can even pull your hands up.",
  );
  await printDeathMessage(
    "Then, the shockwave hammers your chest like a dropped weight. " +
      "Your sternum caves inward with a dull, wet snap. Just like Keller's",
  );
  await printDeathMessage(
    "Frost bleeds outward across your visor as the inside of the watchpost fades to black",
  );
}
export async function coverYourEars(): Promise<void> {
  //TODO add the text & action ?
  await printToTerminal(
    "You decide to quickly go sit down in the corner and cover your ears.",
    "action",
  );
}
export async function goOutside(): Promise<void> {
  await printToTerminal("You run outside the watchpost", "action");
  //TODO do the text
  //my guy wanted to run outside
}
