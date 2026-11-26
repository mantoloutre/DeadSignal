import * as actionsFunc from "../actions/subRelayB02Actions.js";
export const RELAY_B02_OUTSIDE_ACTIONS = {
    INSPECT_MARKS: {
        command: "inspect mark",
        description: "inspect the marks", //TODO finish description
        execute: async () => { }, //todo do this
        oneTime: true,
    },
    OPEN_FUSE_LOCKER: {
        //todo make it require the keycard from keller
        command: "open fuse locker",
        description: "open the fuse locker",
        execute: actionsFunc.nuhuh,
    },
};
