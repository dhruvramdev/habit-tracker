import produce from "immer";
import {UPDATE_USER} from "../actions/constants";

const intialState = {
    user: undefined,
    loggedIn: false
};

const authReducer = produce((draft, action) => {
    switch (action.type) {
        case UPDATE_USER:
            draft.user = action.payload;
            draft.loggedIn = true;
    }
}, intialState);

export default authReducer;
