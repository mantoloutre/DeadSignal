import type { ZoneId } from "./world.js";
/*
this was needed to break a circular reference that was causing me trouble
 */
export const gameBridge = {
  loadZone: async (zone: ZoneId): Promise<void> => {},
  renderZoneActions: (zone: ZoneId): void => {},
};
