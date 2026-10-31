import type { ZoneId } from "./world.js";

export const gameBridge = {
  loadZone: async (zone: ZoneId): Promise<void> => {},
  renderZoneActions: (zone: ZoneId): void => {},
};
