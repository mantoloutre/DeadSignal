/*
this was needed to break a circular reference that was causing me trouble
 */
export const gameBridge = {
    loadZone: async (_zone) => { },
    renderZoneActions: (_zone) => { },
};
