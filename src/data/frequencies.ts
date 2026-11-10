export interface RadioFrequency {
  frequency: string;
}

export type RadioFrequencyName = keyof typeof FREQUENCY_REGISTRY;
/**
 * the registry containing all the frequencies
 */
export const FREQUENCY_REGISTRY = {
  QG_FREQUENCY: {
    frequency: "112.400",
  },
  THE_RESONATOR: {
    frequency: "940.700",
  },
  RELAY_A01_SYNC: {
    frequency: "104.525",
  },
  CREW_BLACKBOX: {
    frequency: "148.500",
  },
  MIL_OVERRIDE: {
    frequency: "225.075",
  },
  KILL_SWITCH_PULSE: {
    frequency: "111.111",
  },
  RADIO_RECEIVE_ONLY: {
    frequency: "000.000",
  },
} as const satisfies Record<string, RadioFrequency>;
