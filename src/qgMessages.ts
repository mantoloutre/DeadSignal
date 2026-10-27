export type QGMessageKey = keyof typeof QG_MESSAGES;
export const QG_MESSAGES = {
    TRUCK_STOPPED_START: "Technician 4-Echo, your tactical truck has halted. " +
        "If you cannot restart it, proceed on foot and go reverse Keller's kill switch.",
    QG_MESSAGE_GOT_TOWER_FIRST_TIME: "Technician 4-Echo, have you arrived at the tower yet? It has been an hour " +
        "since you have been sent, if not, get moving and send us a report",
    QG_MESSAGE_TOLD_DEAD_BODY: ""//TODO
} as const;
