import produce from "immer";
import {NO_DATA_STREAK, UPDATE_STREAK} from "../actions/constants";

const intialState = {
    streak: undefined,
    fetched: false
};

const streakReducer = produce((draft, action) => {
    console.log(action);
    switch (action.type) {
        case UPDATE_STREAK:
            draft.streak = action.payload;
            draft.fetched = true;
            break;
        case NO_DATA_STREAK:
            draft.fetched = true;
    }
}, intialState);

export default streakReducer;
