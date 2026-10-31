import * as actionsFunc from "../actions/watchPostActions.js";
export const SAY_STUFF_TO_QG = {
    PRESS_WHEN_PLAYER_DONE: {
        command: "Press When done",
        description: "press this when your are done saying stuff",
        execute: actionsFunc.confirmingDoneTalkingToQG,
        oneTime: true,
    },
    YES_BODY: {
        command: "Dead Body",
        description: "Tell QG about the dead body",
        execute: actionsFunc.tellQGAboutDeadBody,
        oneTime: true,
    },
    NO_BODY: {
        command: "No Body",
        description: "Don't tell QG about the dead body",
        execute: actionsFunc.tellQGNoBodyFound,
        oneTime: true,
    },
    YES_NOTE: {
        command: "Note Found",
        description: "Tell QG about the note Keller left",
        execute: actionsFunc.tellQGAboutNoteLeft,
        oneTime: true,
    },
    NO_NOTE: {
        command: "No Note Found",
        description: "Don't tell QG about the note Keller left",
        execute: actionsFunc.DontTellQGAboutNoteLeft,
        oneTime: true,
    },
};
export const WATCH_POST = {
    GO_BACK_OUTSIDE_WATCH_POST: {
        command: "go back outside",
        description: "go back outside the watch post",
        execute: actionsFunc.walkBackOutside,
    },
    SEARCH_KELLER_BODY: {
        command: "search body",
        description: "search Keller's body",
        execute: actionsFunc.searchKellerBody,
        oneTime: true,
    },
    TAKE_KELLER_CREDENTIAL: {
        command: "take Keller's credential",
        description: "take the little usb key that serves as credential",
        execute: actionsFunc.takeKellerCredential,
        oneTime: true,
    },
    TAKE_PEN_FROM_KELLER: {
        command: "take pen",
        description: "take the pen from his pocket",
        execute: actionsFunc.takePenFromKeller,
        oneTime: true,
    },
};
export const WATCH_POST_OUTSIDE = {
    GO_INSIDE_WATCH_POST: {
        command: "go inside the watch post",
        description: "walk inside the watch post",
        execute: actionsFunc.goInsideTheWatchPost,
    },
};
