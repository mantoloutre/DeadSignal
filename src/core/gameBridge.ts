import type { ZoneId } from "./world.js";
/*
this was needed to break a circular reference that was causing me trouble
 */
export const gameBridge = {
  loadZone: async (_zone: ZoneId): Promise<void> => {},
  renderZoneActions: (_zone: ZoneId): void => {},
  addVisitedZone: (_zone: ZoneId): void => {},
  hasVisitedZone: (_zone: ZoneId): boolean => {
    return false;
  },
};
